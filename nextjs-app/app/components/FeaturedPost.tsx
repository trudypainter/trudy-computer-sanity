"use client";

import ObjectCoverSanityImage from "@/app/components/sanity/ObjectCoverSanityImage";

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
    <article className="bg-gray-100 rounded-lg overflow-hidden hover:bg-gray-200 transition-colors h-full">
      <a href={`/posts/${slug}`} className="h-full">
        <div className="p-4 flex flex-col h-full">
          <div className="w-full aspect-[16/9] relative rounded-lg overflow-hidden">
            <ObjectCoverSanityImage
              value={{
                asset: coverImage.asset,
                alt: coverImage.alt,
              }}
            />
          </div>
          <div className="mt-4 flex-1 flex flex-col">
            <p className="text-base font-base text-gray-800 mb-0">{title}</p>
            {excerpt && (
              <p className="mt-0 text-sm text-gray-600 line-clamp-2">
                {excerpt}
              </p>
            )}
          </div>
        </div>
      </a>
    </article>
  );
};
