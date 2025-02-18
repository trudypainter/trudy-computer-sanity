"use client";

import { useBoidsParameters } from "./BoidsContext";
import { useEffect, useState } from "react";

export const CustomFooter = () => {
  const { parameters } = useBoidsParameters();
  const [shouldUseDarkText, setShouldUseDarkText] = useState(true);

  // Function to determine if we should use dark text based on background color
  const updateTextColor = (params: any) => {
    if (!params) return;

    // Parse the RGB values from the background color
    const rgb = params.BACKGROUND_COLOR_1.match(/\d+/g);
    if (!rgb) return;

    // Calculate relative luminance
    const luminance =
      (0.299 * Number(rgb[0]) +
        0.587 * Number(rgb[1]) +
        0.114 * Number(rgb[2])) /
      255;

    // Use dark text if background is light (luminance > 0.5)
    setShouldUseDarkText(luminance > 0.5);
  };

  // Update text colors whenever parameters change
  useEffect(() => {
    if (parameters) {
      updateTextColor(parameters);
    }
  }, [parameters]);

  return (
    <div
      className={`container mx-auto px-4 py-8
        ${shouldUseDarkText ? "text-gray-600" : "text-gray-200"}
        transition-colors
      `}
    >
      <div className="flex text-sm md:text-base justify-between">
        <span className="">© 2025 Trudy Painter</span>
        <span className="">Source code</span>
      </div>
      <div className="mt-4 text-sm md:w-1/3 w-full">
        Thanks for scrolling... If you made it this far, we probably have some
        shared interests. Send me an email{" "}
        <a href="mailto:hello@trudy.computer" className="underline">
          hello@trudy.computer
        </a>
        . Or check out my{" "}
        <a
          href="https://www.are.na/trudy-painter/channels"
          className="underline"
        >
          Are.na
        </a>
        .
      </div>
    </div>
  );
};
