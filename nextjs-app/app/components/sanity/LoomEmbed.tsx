"use client";

import { useEffect } from "react";
import Script from "next/script";

type Props = {
  url: string;
  className?: string;
  width?: number;
  hasBorder?: boolean;
  showControls?: boolean;
};

export default function LoomEmbed({
  url,
  className = "",
  width,
  hasBorder,
  showControls,
}: Props) {
  // Extract video ID from Loom URL
  const getVideoId = (url: string) => {
    const match = url.match(/share\/([a-zA-Z0-9]+)/);
    return match ? match[1] : "";
  };

  const videoId = getVideoId(url);
  // Use the width setting if provided, otherwise default to 100%
  const widthStyle = width
    ? { width: `${width * 100}%`, margin: "0 auto" }
    : {};

  if (!videoId) {
    return <div>Invalid Loom URL</div>;
  }

  // Define the border class based on hasBorder flag
  const borderClass = hasBorder ? "border border-gray-200 p-1" : "";

  // Construct Loom URL with hide_controls parameter if needed
  // Loom uses hide_controls=true to hide controls, so we invert the showControls value
  const hideControls = !showControls;
  const loomUrl = `https://www.loom.com/embed/${videoId}${hideControls ? "?hide_controls=1" : ""}`;

  return (
    <div style={widthStyle}>
      <Script
        type="module"
        src="https://www.unpkg.com/@loomhq/loom-embed@1.2.2/dist/esm/index.js?module"
      />
      <div
        className={`relative aspect-video w-full overflow-hidden rounded-lg ${borderClass} ${className}`}
      >
        <iframe
          src={loomUrl}
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="absolute top-0 left-0 h-full w-full"
        />
      </div>
    </div>
  );
}
