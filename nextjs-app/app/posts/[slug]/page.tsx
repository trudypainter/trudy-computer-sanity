import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { type PortableTextBlock } from "next-sanity";
import { Suspense } from "react";
import { format } from "date-fns";

import Avatar from "@/app/components/Avatar";
import CoverImage from "@/app/components/CoverImage";
import DisplayTag from "@/app/components/DisplayTag";
import { MorePosts } from "@/app/components/Posts";
import PortableText from "@/app/components/PortableText";
import { sanityFetch } from "@/sanity/lib/live";
import { postPagesSlugs, postQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import Header from "@/app/components/Header";

type Props = {
  params: Promise<{ slug: string }>;
};

type Tag = {
  name: string;
  slug: string;
};

type PostLink = {
  _key: string;
  displayText: string;
  href: string;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: postPagesSlugs,
    // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data;
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const { data: post } = await sanityFetch({
    query: postQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);

  return {
    authors:
      post?.author?.firstName && post?.author?.lastName
        ? [{ name: `${post.author.firstName} ${post.author.lastName}` }]
        : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function PostPage(props: Props) {
  const params = await props.params;
  const [{ data: post }] = await Promise.all([
    sanityFetch({ query: postQuery, params }),
  ]);

  if (!post?._id) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="container my-12 lg:my-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 bg-gray-50 rounded-lg p-8">
            {/* Left Column - Title and Description */}
            <div className="flex flex-col gap-6">
              <h2 className="text-4xl font-bold font-mono tracking-tight text-gray-900 sm:text-5xl">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-base text-gray-600">{post.excerpt}</p>
              )}
            </div>

            {/* Right Column - Metadata */}
            <div className="flex flex-col gap-2 text-sm">
              {/* Tags */}
              {/* {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-1">
                  <span className="font-mono text-gray-500 tracking-tighter w-fit">
                    Tags
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: Tag) => (
                      <span
                        key={tag.slug}
                        className="bg-gray-100 px-2 py-0.5 rounded-full"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )} */}

              {/* Year */}
              {post.date && (
                <DisplayTag
                  label="Year"
                  value={format(new Date(post.date), "yyyy")}
                />
              )}

              {/* Location */}
              {/* {post.location && (
                <DisplayTag label="Location" value={post.location.name} />
              )} */}

              {/* Links Section */}
              {/* {post.links && post.links.length > 0 && (
                <div className="flex flex-col gap-0 border-gray-200">
                  <span className="font-mono text-gray-500 tracking-tighter">
                    Links
                  </span>
                  <div className="flex flex-col gap-0">
                    {post.links.map((link: PostLink) => (
                      <div key={link._key} className="flex items-center gap-1">
                        <span className="text-gray-400">↳</span>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {link.displayText}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
            </div>
          </div>

          {/* Content Section */}
          <article>
            {/* <div className="mb-12">
              <CoverImage image={post.coverImage} priority />
            </div> */}
            {post.content?.length && (
              <PortableText
                className="prose max-w-none"
                value={post.content as PortableTextBlock[]}
              />
            )}
          </article>
        </div>
      </div>

      {/* More Posts Section
      <div className="border-t border-gray-100">
        <div className="container my-12 lg:my-24">
          <h2 className="text-2xl font-bold mb-8">More Posts</h2>
          <aside className="grid gap-6">
            <Suspense>{await MorePosts({ skip: post._id, limit: 2 })}</Suspense>
          </aside>
        </div> */}
      {/* </div> */}
    </>
  );
}
