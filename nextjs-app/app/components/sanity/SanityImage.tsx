"use client";

import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { LoaderCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface ImageProps {
  value: {
    alt?: string;
    caption?: string;
    width?: "full" | "large" | "medium" | "small";
    asset: {
      _ref: string;
      metadata?: {
        lqip?: string;
      };
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
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const imageUrl = urlForImage(value)?.url();
  const blurDataURL = value.asset?.metadata?.lqip;

  useEffect(() => {
    if (isLoading && !blurDataURL) {
      const timer = setTimeout(() => {
        setShowLoader(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isLoading, blurDataURL]);

  if (!imageUrl) {
    return null;
  }

  const widthClass = value.width ? widthMap[value.width] : "w-full";

  return (
    <figure className="my-4 flex flex-col items-center">
      <div className={`${widthClass} relative`}>
        {showLoader && isLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              zIndex: 10,
            }}
          >
            <LoaderCircle className="h-8 w-8 animate-spin text-gray-600" />
          </div>
        )}
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
          onLoadingComplete={() => {
            setIsLoading(false);
            setShowLoader(false);
          }}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
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
