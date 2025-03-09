"use client";

import Script from "next/script";

type Props = {
  url: string;
  className?: string;
};

export default function InstagramEmbed({ url, className = "" }: Props) {
  return (
    <>
      <Script src="https://www.instagram.com/embed.js" />
      <div className={`instagram-embed my-4 flex justify-center ${className}`}>
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{
            background: "#FFF",
            border: 0,
            borderRadius: "3px",
            boxShadow:
              "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
            margin: "1px",
            maxWidth: "200px",
            minWidth: "100px",
            padding: 0,
            width: "calc(100% - 2px)",
          }}
        >
          <div style={{ padding: "16px" }}>
            <a
              href={url}
              style={{
                background: "#FFFFFF",
                lineHeight: 0,
                padding: "0 0",
                textAlign: "center",
                textDecoration: "none",
                width: "100%",
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Loading Instagram content...
            </a>
          </div>
        </blockquote>
      </div>
    </>
  );
}
