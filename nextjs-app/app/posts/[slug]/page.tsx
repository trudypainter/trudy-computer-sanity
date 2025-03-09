import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { type PortableTextBlock } from "next-sanity";
import { Suspense } from "react";
import { format } from "date-fns";

import Avatar from "@/app/components/Avatar";
import CoverImage from "@/app/components/sanity/CoverImage";
import DisplayTag from "@/app/components/DisplayTag";
import { MorePosts } from "@/app/components/Posts";
import PortableText from "@/app/components/sanity/PortableText";
import { sanityFetch } from "@/sanity/lib/live";
import { postPagesSlugs, postQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

type ProjectTag = {
  _id: string;
  name: string;
  slug: string;
};

type PostLink = {
  displayText: string;
  href: string;
};

// Define a more specific post type that includes the fields we need
interface Post {
  _id: string;
  title: string;
  excerpt?: string;
  coverImage: any;
  content?: PortableTextBlock[];
  projectLocation?: string;
  projectYear?: string;
  projectTags?: ProjectTag[] | null;
  links?: PostLink[] | null;
  author?: {
    firstName: string;
    lastName: string;
    picture: any;
  };
}

type Props = {
  params: Promise<{ slug: string }>;
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

  // Helper function to check if an array has items
  const hasItems = <T,>(arr: T[] | null | undefined): arr is T[] => {
    return Array.isArray(arr) && arr.length > 0;
  };

  // Extract tags and links with proper type checking
  const projectTags = post.projectTags as ProjectTag[] | null | undefined;
  const links = post.links as PostLink[] | null | undefined;

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 mt-24 mb-12 lg:mt-48 lg:mb-24 max-w-content">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            {/* Left Column - Title and Description */}
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold font-mono tracking-tight text-gray-900 sm:text-2xl">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-base text-gray-600">{post.excerpt}</p>
              )}
            </div>

            {/* Right Column - Metadata */}
            <div className="flex flex-col gap-2 text-sm">
              {/* Project Location */}
              {post.projectLocation && (
                <DisplayTag label="Location" value={post.projectLocation} />
              )}

              {/* Year */}
              {post.projectYear && (
                <DisplayTag label="Year" value={post.projectYear} />
              )}

              {/* Tags */}
              {hasItems(projectTags) && (
                <div className="flex items-start gap-2">
                  <span className="font-mono text-gray-500 tracking-tighter whitespace-nowrap">
                    Tags
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {projectTags.map((tag: ProjectTag) => (
                      <DisplayTag key={tag._id} label="" value={tag.name} />
                    ))}
                  </div>
                </div>
              )}

              {/* Links Section */}
              {hasItems(links) && (
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-gray-500 tracking-tighter">
                    Links
                  </span>
                  <div className="flex flex-col gap-1">
                    {links.map((link: PostLink, index: number) => (
                      <div key={index} className="flex items-center gap-1">
                        <span className="text-gray-400">↳</span>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 underline decoration-1 hover:decoration-2"
                        >
                          {link.displayText}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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

      <Footer />
    </>
  );
}
