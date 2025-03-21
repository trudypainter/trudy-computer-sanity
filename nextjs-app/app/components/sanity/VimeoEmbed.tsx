"use client";

interface VimeoEmbedProps {
  value: {
    url: string;
    caption?: string;
    width?: number;
    hasBorder?: boolean;
    showControls?: boolean;
  };
}

export default function VimeoEmbed({ value }: VimeoEmbedProps) {
  // Extract video ID from Vimeo URL
  const getVimeoId = (url: string) => {
    const regExp = /(?:vimeo.com\/)(\d+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const videoId = getVimeoId(value.url);
  // Use the width setting if provided, otherwise default to 100%
  const widthStyle = value.width
    ? { width: `${value.width * 100}%`, margin: "0 auto" }
    : {};

  if (!videoId) {
    return <div>Invalid Vimeo URL</div>;
  }

  // Define the border class based on hasBorder flag
  const borderClass = value.hasBorder
    ? "border border-gray-200 p-1 rounded-lg"
    : "";

  // Construct Vimeo URL with controls parameter
  // Default to hide controls if showControls is false or undefined
  const controls = value.showControls ? "1" : "0";
  const vimeoUrl = `https://player.vimeo.com/video/${videoId}?controls=${controls}`;

  return (
    <div className="my-4" style={widthStyle}>
      <div className={`relative pb-[56.25%] h-0 ${borderClass}`}>
        <iframe
          src={vimeoUrl}
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
      {value.caption && (
        <p className="text-sm text-gray-600 mt-2 text-center">
          {value.caption}
        </p>
      )}
    </div>
  );
}
