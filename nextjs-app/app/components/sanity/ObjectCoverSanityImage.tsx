"use client";

import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

interface ImageProps {
  value: {
    alt?: string;
    asset: {
      _ref: string;
    };
  };
}

export default function ObjectCoverSanityImage({ value }: ImageProps) {
  const imageUrl = urlForImage(value)?.url();

  if (!imageUrl) {
    return null;
  }

  return (
    <div className="absolute inset-0">
      <Image
        src={imageUrl}
        alt={value.alt || ""}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
