"use client";

interface YouTubeEmbedProps {
  value: {
    url: string;
    caption?: string;
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

  if (!videoId) {
    return <div>Invalid YouTube URL</div>;
  }

  return (
    <div className="my-4">
      <div className="relative pb-[56.25%] h-0">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
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
