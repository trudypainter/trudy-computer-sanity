"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function FindMe() {
  // =============================================
  // LINK CONFIGURATION - Easy to edit
  // =============================================
  const links = [
    {
      name: "Are.na",
      url: "https://www.are.na/trudy-painter",
      position: { top: "15%", left: "20%" },
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/user/trudypaintet?si=ZlW6diDKSl61x9oKhit5BA",
      position: { bottom: "30%", left: "20%" },
    },
    {
      name: "Github",
      url: "https://github.com/trudypainter",
      position: { top: "15%", right: "20%" },
    },
    {
      name: "HF",
      url: "https://huggingface.co/Trudy",
      position: { top: "40%", right: "20%" },
    },
    {
      name: "X/Twitter",
      url: "https://x.com/trudypainter",
      position: { top: "25%", right: "20%" },
    },
    {
      name: "VSCO",
      url: "https://vsco.co/bionicpinkytoe/gallery",
      position: { top: "30%", left: "15%" },
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/trudy-painter/",
      position: { bottom: "35%", right: "20%" },
    },
    // Commented out links still included in configuration for easy re-enabling
    {
      name: "Resume",
      url: "TrudyPainter_Resume.pdf",
      position: { bottom: "15%", right: "20%" },
      disabled: true,
    },
    {
      name: "Full CV",
      url: "https://docs.google.com/spreadsheets/d/1pBokIjBV7lxDYNxqqxfLrNb7h3h4GuhWSbrrTGd9Fho/edit#gid=0",
      position: { bottom: "15%", right: "20%" },
      disabled: true,
    },
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 500);
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const linkStyle = {
    color: "#4b5563", // gray-600 in Tailwind
    textDecoration: "none",
    cursor: "pointer",
    position: "absolute",
  };

  const labelStyle = {
    position: "absolute",
    padding: "0 8px",
    backgroundColor: "white",
    fontFamily: "monospace",
    fontSize: "12px",
    color: "#6b7280",
    textTransform: "uppercase",
  };

  return (
    <div
      style={{
        position: "relative",
        marginTop: "2rem",
        width: "100%",
        maxWidth: "300px",
        aspectRatio: "1/1",
        margin: "0 auto",
        padding: "1rem 2rem",
      }}
    >
      {/* SVG of a four quadrant graph with arrows on the axis */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        viewBox="0 0 250 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="125"
          y1="0"
          x2="125"
          y2="250"
          stroke="darkgray"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="125"
          x2="250"
          y2="125"
          stroke="darkgray"
          strokeWidth="1"
        />
      </svg>

      {/* Render all links that aren't disabled */}
      {links
        .filter((link) => !link.disabled)
        .map((link, index) => (
          <a
            key={index}
            style={{ ...linkStyle, ...link.position }}
            target="blank"
            href={link.url}
            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
          >
            {link.name}
          </a>
        ))}

      {/* Quadrant labels */}
      <div
        style={{
          ...labelStyle,
          left: isMobile ? "-5%" : "-20%",
          top: "47%",
          transition: "left 0.3s ease",
        }}
      >
        Personal
      </div>
      <div
        style={{
          ...labelStyle,
          right: isMobile ? "-9%" : "-25%",
          top: "47%",
          transition: "right 0.3s ease",
        }}
      >
        Professional
      </div>
      <div
        style={{
          ...labelStyle,
          position: "absolute",
          width: "calc(100% - 4rem)",
          left: "2rem",
          textAlign: "center",
          top: "-8%",
        }}
      >
        Essential
      </div>
      <div
        style={{
          ...labelStyle,
          position: "absolute",
          width: "calc(100% - 4rem)",
          left: "2rem",
          textAlign: "center",
          bottom: "-8%",
        }}
      >
        Peripheral
      </div>
    </div>
  );
}
