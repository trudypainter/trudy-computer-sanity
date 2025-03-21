"use client";

interface YouTubeEmbedProps {
  value: {
    url: string;
    caption?: string;
    width?: number;
    hasBorder?: boolean;
    showControls?: boolean;
  };
}

export default function YouTubeEmbed({ value }: YouTubeEmbedProps) {
  // Extract video ID from YouTube URL
  const getYouTubeId = (url: string) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const videoId = getYouTubeId(value.url);
  // Use the width setting if provided, otherwise default to 100%
  const widthStyle = value.width
    ? { width: `${value.width * 100}%`, margin: "0 auto" }
    : {};

  if (!videoId) {
    return <div>Invalid YouTube URL</div>;
  }

  // Define the border class based on hasBorder flag
  const borderClass = value.hasBorder
    ? "border border-gray-200 p-1 rounded-lg"
    : "";

  // Construct YouTube URL with controls parameter if showControls is true
  // Default to hide controls (controls=0) if showControls is false or undefined
  const controls = value.showControls ? "1" : "0";
  const youtubeUrl = `https://www.youtube.com/embed/${videoId}?controls=${controls}`;

  return (
    <div className="my-4" style={widthStyle}>
      <div className={`relative pb-[56.25%] h-0 ${borderClass}`}>
        <iframe
          src={youtubeUrl}
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
