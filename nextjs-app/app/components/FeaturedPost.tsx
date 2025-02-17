"use client";

import SanityImage from "./SanityImage";

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
};

export const FeaturedPost = ({ post }: { post: FeaturedPostType }) => {
  const { title, slug, excerpt, coverImage } = post;

  return (
    <article className="bg-gray-100 rounded-lg overflow-hidden hover:bg-gray-200 transition-colors">
      <a href={`/posts/${slug}`}>
        <div className="p-4">
          <div className="w-full">
            <SanityImage
              value={coverImage}
              aspectRatio="4/3"
              objectFit="cover"
              background="#f3f4f6"
              borderRadius="0.5rem"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-base font-medium text-gray-800">{title}</h3>
            {excerpt && (
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {excerpt}
              </p>
            )}
          </div>
        </div>
      </a>
    </article>
  );
};
