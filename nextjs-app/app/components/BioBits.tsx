"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Pen, Check, X, RefreshCw } from "lucide-react";
import CustomPortableText from "./sanity/PortableText";
import { PortableTextBlock } from "next-sanity";

interface BioBit {
  _id: string;
  title: string;
  content: PortableTextBlock[];
  order: number;
  tags: { name: string; slug: string }[];
  location: { name: string; slug: string; coordinates: number[] };
  links: any[];
}

export const BioBits = ({ data }: { data: BioBit[] }) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="w-full md:w-1/3 space-y-8">
      {/* Bio bits section */}
      <div className="space-y-8 text-gray-200">
        {data.map((bit: BioBit) => (
          <section key={bit._id} className="space-y-1">
            <h2 className="font-mono text-sm text-white/60">
              {bit.title.toUpperCase()}
            </h2>
            <div className="text-base text-white">
              <CustomPortableText
                value={bit.content}
                className="prose-a:underline text-white prose-a:text-white"
              />
            </div>
          </section>
        ))}
      </div>
      <div>
        <a
          href="/about"
          className="mt-8 font-mono tracking-tight text-sm rounded bg-gray-100 bg-opacity-80 text-gray-800 px-3 py-2 hover:bg-gray-100 transition-colors"
        >
          + MORE
        </a>
      </div>
    </div>
  );
};
