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

export const projectArchiveQuery = defineQuery(`
  *[_type == "post"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "coverImage": {
      "asset": coalesce(coverImage.asset, {"_ref": "", "_type": "reference"}),
      "hotspot": coverImage.hotspot,
      "crop": coverImage.crop,
      "alt": coverImage.alt,
      "_type": "image"
    },
    "date": coalesce(date, _updatedAt),
    "location": projectLocation,
    "year": projectYear,
    "projectTags": projectTags[]->{ _id, name, slug }
  }
`);

// Helper function to get unique values from an array of posts
export function getUniqueValues(posts: any[], field: string) {
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
    return Array.from(tagsMap.values());
  }

  // For other fields (location, year), keep existing behavior
  const values = new Set<string>();
  posts.forEach((post) => {
    if (post[field]) {
      values.add(post[field]);
    }
  });

  return Array.from(values).sort((a, b) => {
    // Special sorting for years to be in reverse order (newest first)
    if (field === "year") {
      return parseInt(b) - parseInt(a);
    }
    // For strings, use localeCompare
    return String(a).localeCompare(String(b));
  });
}

export const headerBioBitsQuery = defineQuery(`
  *[_type == "headerBioBits"] | order(order asc) {
    _id,
    title,
    content,
    order
  }
`);
