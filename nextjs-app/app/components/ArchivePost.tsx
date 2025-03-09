"use client";

import Link from "next/link";
import ObjectCoverSanityImage from "@/app/components/sanity/ObjectCoverSanityImage";

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

const ProjectTag = ({ text }: { text: string }) => (
  <span className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-600">
    {text}
  </span>
);

export const ArchivePost = ({ post }: { post: ArchivePostType }) => {
  const { title, slug, coverImage, location, year, projectTags, excerpt } =
    post;

  return (
    <Link href={`/posts/${slug}`}>
      <article className="bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors">
        <div className="flex flex-row gap-3 p-4">
          <div className="w-32 h-24 relative rounded-lg overflow-hidden">
            <ObjectCoverSanityImage
              value={{
                asset: coverImage.asset,
                alt: coverImage.alt ?? undefined,
              }}
            />
          </div>
          <div className="flex-1 flex flex-col justify-between gap-2">
            <div className="space-y-0">
              <h3 className="text-base text-gray-800">{title}</h3>
              {excerpt && (
                <p className="text-sm text-gray-600 line-clamp-2">{excerpt}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {location && <ProjectTag text={location} />}
              {year && <ProjectTag text={year} />}
              {projectTags &&
                projectTags.map((tag) => (
                  <ProjectTag key={tag._id} text={tag.name} />
                ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
