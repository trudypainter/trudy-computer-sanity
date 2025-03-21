import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`;

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`;

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`;

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`);

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`);

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`);

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    content[]{
      ...,
      _type == "vimeoEmbed" => {
        ...,
        url,
        caption
      },
      _type == "youtubeEmbed" => {
        ...,
        url,
        caption
      },
      _type == "video" => {
        ...,
        asset,
        caption
      },
      markDefs[]{
        ...,
        ${linkReference}
      }
    },
    ${postFields}
    projectLocation,
    projectYear,
    "projectTags": projectTags[]->{ _id, name, slug },
    "links": links[] {
      displayText,
      href
    }
  }
`);

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);

export const aboutPageQuery = defineQuery(`
  *[_type == "about"][0]{
    profileImage {
      asset,
      alt,
    },
    photographerName,
    photographerUrl,
    fullBio,
    bioSections[] {
      title,
      content
    }
  }
`);

// The simplest possible query to get all posts - no conditions, no projections
export const allPostsCountQuery = defineQuery(`
  *[_type == "post"] {
    _id,
    _type,
    title,
    "isDraft": _id in path("drafts.**"),
    _updatedAt
  }
`);

// This query will show ALL post documents, regardless of their state or fields
export const allDocumentsQuery = defineQuery(`
  *[_type == "post"] {
    _id,
    title,
    _createdAt,
    _updatedAt,
    "hasCoverImage": defined(coverImage),
    "hasSlug": defined(slug.current),
    "hasDate": defined(date),
    "isPublished": !(_id in path("drafts.**")),
    "inDrafts": _id in path("drafts.**")
  }
`);

// Modified project archive query to provide more information
export const projectArchiveQuery = defineQuery(`
  *[_type == "post"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    "hasSlug": defined(slug.current),
    excerpt,
    "coverImage": {
      "asset": coalesce(coverImage.asset, {"_ref": "", "_type": "reference"}),
      "hotspot": coverImage.hotspot,
      "crop": coverImage.crop,
      "alt": coverImage.alt,
      "_type": "image"
    },
    "hasCoverImage": defined(coverImage),
    "date": coalesce(date, _updatedAt),
    "hasDate": defined(date),
    "location": projectLocation,
    "year": projectYear,
    "projectTags": projectTags[]->{ _id, name, slug },
    "isPublished": !(_id in path("drafts.**")),
    "inDrafts": _id in path("drafts.**"),
    _createdAt,
    _updatedAt
  }
`);

// Helper function to get unique values from an array of posts
export function getUniqueValues(posts: any[], field: string) {
  console.log(
    `Getting unique values for field: ${field} from ${posts.length} posts`
  );

  if (field === "projectTags") {
    // For tags, collect all unique tags across all posts
    const tagsMap = new Map();
    posts.forEach((post) => {
      if (post.projectTags) {
        post.projectTags.forEach(
          (tag: { _id: string; name: string; slug: string }) => {
            tagsMap.set(tag._id, tag);
          }
        );
      }
    });
    console.log(`Found ${tagsMap.size} unique tags`);
    return Array.from(tagsMap.values());
  }

  // For other fields (location, year), keep existing behavior
  const values = new Set<string>();
  posts.forEach((post) => {
    if (post[field]) {
      values.add(post[field]);
    }
  });

  const result = Array.from(values).sort((a, b) => {
    // Special sorting for years to be in reverse order (newest first)
    if (field === "year") {
      return parseInt(b) - parseInt(a);
    }
    // For strings, use localeCompare
    return String(a).localeCompare(String(b));
  });

  console.log(
    `Found ${result.length} unique values for ${field}: ${result.join(", ")}`
  );
  return result;
}

export const headerBioBitsQuery = defineQuery(`
  *[_type == "headerBioBits"] | order(order asc) {
    _id,
    title,
    content,
    order
  }
`);
