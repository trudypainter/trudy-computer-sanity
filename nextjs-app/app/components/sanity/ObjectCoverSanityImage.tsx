"use client";

import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { LoaderCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface ImageProps {
  value: {
    alt?: string;
    asset: {
      _ref: string;
      metadata?: {
        lqip?: string;
      };
    };
  };
}

export default function ObjectCoverSanityImage({ value }: ImageProps) {
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

  return (
    <div className="absolute inset-0">
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
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        onLoadingComplete={() => {
          setIsLoading(false);
          setShowLoader(false);
        }}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
      />
    </div>
  );
}
