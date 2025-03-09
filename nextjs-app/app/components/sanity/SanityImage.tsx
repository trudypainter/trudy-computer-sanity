"use client";

import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

interface ImageProps {
  value: {
    alt?: string;
    caption?: string;
    width?: "full" | "large" | "medium" | "small";
    asset: {
      _ref: string;
    };
  };
}

const widthMap = {
  full: "w-full",
  large: "w-3/4",
  medium: "w-1/2",
  small: "w-1/3",
};

export default function SanityImage({ value }: ImageProps) {
  const imageUrl = urlForImage(value)?.url();

  if (!imageUrl) {
    return null;
  }

  const widthClass = value.width ? widthMap[value.width] : "w-full";

  return (
    <figure className="my-4 flex flex-col items-center">
      <div className={`${widthClass} relative`}>
        <Image
          src={imageUrl}
          alt={value.alt || ""}
          width={1920}
          height={1080}
          className="h-auto w-full object-contain"
          sizes={`
            (max-width: 768px) 100vw,
            ${
              value.width === "small"
                ? "33vw"
                : value.width === "medium"
                  ? "50vw"
                  : value.width === "large"
                    ? "75vw"
                    : "100vw"
            }
          `}
        />
      </div>
      {value.caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-600">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}
