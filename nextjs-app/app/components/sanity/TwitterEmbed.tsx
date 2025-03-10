"use client";

import { TwitterTweetEmbed } from "react-twitter-embed";
import { useEffect, useState } from "react";

interface TwitterEmbedProps {
  value: {
    url: string;
  };
}

export default function TwitterEmbed({ value }: TwitterEmbedProps) {
  const exp = /\/status\/(\d+)($|[?/])/;
  const [, id] = exp.exec(value.url) || [];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!id) {
    return <div className="text-gray-500">Invalid Tweet URL</div>;
  }

  return (
    <div className="not-prose my-8 w-full max-w-none">
      <div className="flex justify-center">
        <div className={`w-full ${isMobile ? "max-w-[95%]" : "max-w-xl"}`}>
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
