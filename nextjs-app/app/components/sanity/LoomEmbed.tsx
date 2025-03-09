"use client";

import { useEffect } from "react";
import Script from "next/script";

type Props = {
  url: string;
  className?: string;
};

export default function LoomEmbed({ url, className = "" }: Props) {
  // Extract video ID from Loom URL
  const getVideoId = (url: string) => {
    const match = url.match(/share\/([a-zA-Z0-9]+)/);
    return match ? match[1] : "";
  };

  const videoId = getVideoId(url);

  if (!videoId) {
    return <div>Invalid Loom URL</div>;
  }

  return (
    <>
      <Script
        type="module"
        src="https://www.unpkg.com/@loomhq/loom-embed@1.2.2/dist/esm/index.js?module"
      />
      <div
        className={`relative aspect-video w-full overflow-hidden rounded-lg ${className}`}
      >
        <iframe
          src={`https://www.loom.com/embed/${videoId}`}
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="absolute top-0 left-0 h-full w-full"
        />
      </div>
    </>
  );
}
