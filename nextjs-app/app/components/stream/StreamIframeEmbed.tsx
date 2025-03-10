"use client";

import { useState, useEffect, useCallback } from "react";

interface Props {
  url: string;
  className?: string;
  isCollapsed?: boolean;
  zoom?: number;
  aspectRatio?: "desktop" | "mobile";
}

export default function IframeEmbed({
  url,
  className = "",
  isCollapsed: initialCollapsed = false,
  zoom: initialZoom = 0.7,
  aspectRatio = "desktop",
}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [responsiveZoom, setResponsiveZoom] = useState(initialZoom);

  // Calculate responsive zoom for landscape iframes
  const calculateResponsiveZoom = useCallback(() => {
    // Only adjust zoom for landscape/desktop orientation
    if (aspectRatio === "mobile") {
      setResponsiveZoom(initialZoom);
      return;
    }

    // Get container width (accounting for padding and margins)
    const containerWidth = window.innerWidth - 32; // Subtracting common padding
    const defaultWidth = 920; // Your default content width
    const minZoom = 0.4; // Minimum zoom level

    if (containerWidth < defaultWidth) {
      // Calculate new zoom level based on available width
      const newZoom = Math.max(
        minZoom,
        (containerWidth / defaultWidth) * initialZoom
      );
      setResponsiveZoom(newZoom);
    } else {
      setResponsiveZoom(initialZoom);
    }
  }, [aspectRatio, initialZoom]);

  // Set up resize listener
  useEffect(() => {
    calculateResponsiveZoom();

    const handleResize = () => {
      calculateResponsiveZoom();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateResponsiveZoom]);

  // Add zoom parameter to URL if it doesn't affect the website's functionality
  const getZoomedUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      // Only add zoom parameter for certain domains that support it
      if (urlObj.hostname.includes("google.com/maps")) {
        urlObj.searchParams.set("zoom", responsiveZoom.toString());
        return urlObj.toString();
      }
      return url;
    } catch {
      return url;
    }
  };

  // Calculate container dimensions based on aspect ratio
  const containerStyle =
    aspectRatio === "mobile"
      ? {
          width: "375px", // Standard mobile width
          maxWidth: "100%",
          aspectRatio: "9/16",
          margin: "0 auto",
        }
      : {
          width: "100%",
          aspectRatio: "16/9",
        };

  // Calculate iframe dimensions and scale using responsive zoom
  const iframeWrapperStyle = {
    width: `${100 / responsiveZoom}%`,
    height: `${100 / responsiveZoom}%`,
    transform: `scale(${responsiveZoom})`,
    transformOrigin: "0 0",
  };

  return (
    <div className={`my-8 ${className}`}>
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {/* Browser-like top bar */}
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
          {/* Left side: URL with link icon */}
          <div className="flex items-center gap-2 min-w-0 flex-shrink">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 flex-shrink-0 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-700 truncate transition-colors min-w-0"
            >
              {url}
            </a>
          </div>

          {/* Right side: Action buttons */}
          <div className="flex items-center gap-3 flex-shrink-0 ml-4">
            {/* Open in new tab button */}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Open in new tab"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>

            {/* Minimize/collapse button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Toggle iframe visibility"
            >
              {isCollapsed ? "◉" : "○"}
            </button>
          </div>
        </div>

        {/* Iframe container with animation */}
        <div
          className={`transition-all duration-300 ease-in-out origin-top ${
            isCollapsed ? "h-0" : "h-auto"
          }`}
        >
          <div
            className={`relative overflow-hidden transition-opacity duration-300 ${
              isCollapsed ? "opacity-0" : "opacity-100"
            }`}
            style={{ ...containerStyle, colorScheme: "light" }}
          >
            <div
              className="absolute top-0 left-0 [color-scheme:light]"
              style={iframeWrapperStyle}
            >
              <iframe
                src={!isCollapsed ? getZoomedUrl(url) : "about:blank"}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setIframeLoaded(true)}
                style={{ colorScheme: "light" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
