import { FeaturedPost } from "@/app/components/FeaturedPost";
import { sanityFetch } from "@/sanity/lib/live";

type FeaturedPostType = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  date: string;
  coverImage: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    hotspot?: any;
    crop?: any;
    alt?: string;
    _type: "image";
  };
  author: {
    firstName: string;
    lastName: string;
    picture: any;
  } | null;
};

type RowPost = {
  _key: string;
  post: FeaturedPostType;
  width: "full" | "2/3" | "1/2" | "1/3";
};

type Row = {
  _key: string;
  posts: RowPost[];
};

type LandingSection = {
  _id: string;
  title: string;
  description: string;
  order: number;
  rows: Row[];
};

const landingSectionsQuery = `
  *[_type == "landingSection"] | order(order asc) {
    _id,
    title,
    description,
    order,
    "rows": rows[] {
      _key,
      "posts": posts[] {
        _key,
        width,
        "post": post-> {
          _id,
          "title": coalesce(title, "Untitled"),
          "slug": slug.current,
          excerpt,
          coverImage,
          "date": coalesce(date, _updatedAt),
          "author": author->{firstName, lastName, picture}
        }
      }
    }
  }
`;

const widthToClass = {
  full: "w-full",
  "2/3": "w-full md:w-2/3",
  "1/2": "w-full md:w-1/2",
  "1/3": "w-full md:w-1/3",
};

const Section = ({ section }: { section: LandingSection }) => {
  return (
    <div className="mb-16">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <div className="sticky top-24 space-y-2">
            <h2 className="font-mono text-sm text-gray-500">
              {section.title.toUpperCase()}
            </h2>
            <p className="text-sm text-gray-600">{section.description}</p>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <div className="space-y-8">
            {section.rows.map((row) => (
              <div key={row._key} className="flex flex-wrap gap-8">
                {row.posts.map((post) => (
                  <div key={post._key} className={widthToClass[post.width]}>
                    <FeaturedPost post={post.post} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const LandingSections = async () => {
  const { data } = await sanityFetch({ query: landingSectionsQuery });

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <>
      {data.map((section: LandingSection) => (
        <Section key={section._id} section={section} />
      ))}
    </>
  );
};
