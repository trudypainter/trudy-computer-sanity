"use client";

interface VimeoEmbedProps {
  value: {
    url: string;
    caption?: string;
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

  if (!videoId) {
    return <div>Invalid Vimeo URL</div>;
  }

  return (
    <div className="my-4">
      <div className="relative pb-[56.25%] h-0">
        <iframe
          src={`https://player.vimeo.com/video/${videoId}`}
          className="absolute top-0 left-0 w-full h-full"
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
