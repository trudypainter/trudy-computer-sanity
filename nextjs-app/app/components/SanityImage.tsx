"use client";

import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "@/sanity/lib/client";

interface SanityImageProps {
  value: {
    asset: {
      _ref: string;
    };
    alt?: string;
    caption?: string;
  };
  aspectRatio?: "video" | "square" | "4/3" | "3/4" | "16/9" | "9/16";
  objectFit?: "cover" | "contain";
  background?: string;
  borderRadius?: string;
}

export default function SanityImage({
  value,
  aspectRatio = "video",
  objectFit = "cover",
  background = "transparent",
  borderRadius = "none",
}: SanityImageProps) {
  const imageProps = useNextSanityImage(client, value);

  if (!imageProps) return null;

  const aspectRatioClasses = {
    video: "aspect-video",
    square: "aspect-square",
    "4/3": "aspect-[4/3]",
    "3/4": "aspect-[3/4]",
    "16/9": "aspect-[16/9]",
    "9/16": "aspect-[9/16]",
  };

  return (
    <figure className="my-0">
      <div
        className={`relative ${aspectRatioClasses[aspectRatio]} overflow-hidden`}
        style={{ backgroundColor: background, borderRadius }}
      >
        <Image
          {...imageProps}
          alt={value.alt || "Blog post image"}
          className={`w-full h-full object-${objectFit}`}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={false}
        />
      </div>
      {value.caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 italic">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}
