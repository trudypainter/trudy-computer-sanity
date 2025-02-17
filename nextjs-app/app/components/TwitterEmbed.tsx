"use client";

import { TwitterTweetEmbed } from "react-twitter-embed";

interface TwitterEmbedProps {
  value: {
    url: string;
  };
}

export default function TwitterEmbed({ value }: TwitterEmbedProps) {
  const exp = /\/status\/(\d+)($|[?/])/;
  const [, id] = exp.exec(value.url) || [];

  if (!id) {
    return <div className="text-gray-500">Invalid Tweet URL</div>;
  }

  return (
    <div className="not-prose my-8 w-full max-w-none">
      <div className="flex justify-center">
        <div className="w-full min-w-[550px] max-w-2xl">
          <TwitterTweetEmbed
            tweetId={id}
            options={{
              conversation: "none",
              "hide-thread": true,
              width: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
}
