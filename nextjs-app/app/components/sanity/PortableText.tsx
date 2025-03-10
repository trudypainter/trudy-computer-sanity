"use client";

/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";
import { client } from "@/sanity/lib/client";

import ResolvedLink from "@/app/components/sanity/ResolvedLink";
import TwitterEmbed from "@/app/components/sanity/TwitterEmbed";
import VimeoEmbed from "@/app/components/sanity/VimeoEmbed";
import YouTubeEmbed from "@/app/components/sanity/YouTubeEmbed";
import LoomEmbed from "@/app/components/sanity/LoomEmbed";
import InstagramEmbed from "@/app/components/sanity/InstagramEmbed";
import IframeEmbed from "@/app/components/sanity/IframeEmbed";
import SanityImage from "@/app/components/sanity/SanityImage";
import Callout from "@/app/components/sanity/Callout";

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    block: {
      h1: ({ children, value }) => (
        // Add an anchor to the h1
        <h1 className="group relative">
          {children}
          <a
            href={`#${value?._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </a>
        </h1>
      ),
      h2: ({ children, value }) => {
        // Add an anchor to the h2
        return (
          <h2 className="group relative">
            {children}
            <a
              href={`#${value?._key}`}
              className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </a>
          </h2>
        );
      },
    },
    marks: {
      link: ({ children, value: link }) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>;
      },
    },
    types: {
      image: ({ value }) => <SanityImage value={value} />,
      twitterEmbed: ({ value }) => <TwitterEmbed value={value} />,
      vimeoEmbed: ({ value }) => <VimeoEmbed value={value} />,
      youtubeEmbed: ({ value }) => <YouTubeEmbed value={value} />,
      loomEmbed: ({ value }) => <LoomEmbed url={value.url} />,
      instagramEmbed: ({ value }) => <InstagramEmbed url={value.url} />,
      iframeEmbed: ({ value }) => (
        <IframeEmbed
          url={value.url}
          isCollapsed={value.isCollapsed}
          zoom={value.zoom}
          aspectRatio={value.aspectRatio}
        />
      ),
      callout: ({ value }) => <Callout value={value} />,
      divider: () => <hr className="my-8 border-0 border-b border-gray-200" />,
      video: ({ value }) => {
        const videoUrl = client.config().projectId
          ? `https://cdn.sanity.io/files/${client.config().projectId}/${client.config().dataset}/${value.asset._ref
              .replace("file-", "")
              .replace("-mp4", ".mp4")
              .replace("-mov", ".mov")
              .replace("-webm", ".webm")}`
          : "";

        return (
          <div className="my-4">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-lg"
              src={videoUrl}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        );
      },
    },
  };

  return (
    <div
      className={[
        "prose prose-a:font-normal prose-a:underline prose-a:decoration-1 hover:prose-a:decoration-2",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <PortableText components={components} value={value} />
    </div>
  );
}
