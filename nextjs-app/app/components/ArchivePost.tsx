"use client";

import Link from "next/link";
import SanityImage from "./SanityImage";

type ArchivePostType = {
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
    alt: string | null;
    _type: "image";
  };
  location: string | null;
  year: string | null;
  projectTags: Array<{
    _id: string;
    name: string;
    slug: string;
  }> | null;
};

export const ArchivePost = ({ post }: { post: ArchivePostType }) => {
  const { title, slug, coverImage, location, year, projectTags, excerpt } =
    post;

  return (
    <Link href={`/posts/${slug}`}>
      <article className="bg-gray-100 rounded-lg overflow-hidden hover:bg-gray-200 transition-colors">
        <div className="flex flex-row gap-4 p-4">
          <div className="w-48">
            <SanityImage
              value={{
                asset: post.coverImage.asset,
                alt: post.coverImage.alt ?? undefined,
              }}
              aspectRatio="4/3"
              objectFit="cover"
              background="#f3f4f6"
              borderRadius="0.5rem"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between gap-2">
            <div className="space-y-2">
              <h3 className="text-base font-medium text-gray-800">{title}</h3>
              {excerpt && (
                <p className="text-sm text-gray-600 line-clamp-2">{excerpt}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {location && (
                <span className="text-xs px-3 py-1 rounded-full bg-gray-200 text-gray-600">
                  {location}
                </span>
              )}
              {year && (
                <span className="text-xs px-3 py-1 rounded-full bg-gray-200 text-gray-600">
                  {year}
                </span>
              )}
              {projectTags &&
                projectTags.map((tag) => (
                  <span
                    key={tag._id}
                    className="text-xs px-3 py-1 rounded-full bg-gray-200 text-gray-600"
                  >
                    {tag.name}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
