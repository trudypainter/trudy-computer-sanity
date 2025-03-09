"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function FindMe() {
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
    color: "black",
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

      <a
        style={{ ...linkStyle, top: "15%", left: "20%" }}
        target="blank"
        href="https://www.are.na/trudy-painter"
        onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
        onMouseOut={(e) => (e.target.style.textDecoration = "none")}
      >
        Are.na
      </a>

      <a
        style={{ ...linkStyle, bottom: "30%", left: "20%" }}
        target="blank"
        href="https://open.spotify.com/user/trudypaintet?si=ZlW6diDKSl61x9oKhit5BA"
        onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
        onMouseOut={(e) => (e.target.style.textDecoration = "none")}
      >
        Spotify
      </a>

      <a
        style={{ ...linkStyle, top: "15%", right: "20%" }}
        target="blank"
        href="https://github.com/trudypainter"
        onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
        onMouseOut={(e) => (e.target.style.textDecoration = "none")}
      >
        Github
      </a>

      <a
        style={{ ...linkStyle, top: "35%", right: "20%" }}
        target="blank"
        href="https://x.com/trudypainter"
        onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
        onMouseOut={(e) => (e.target.style.textDecoration = "none")}
      >
        X/Twitter
      </a>

      <a
        style={{ ...linkStyle, top: "30%", left: "15%" }}
        target="blank"
        href="https://vsco.co/bionicpinkytoe/gallery"
        onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
        onMouseOut={(e) => (e.target.style.textDecoration = "none")}
      >
        VSCO
      </a>

      <a
        style={{ ...linkStyle, bottom: "35%", right: "20%" }}
        target="blank"
        href="https://www.linkedin.com/in/trudy-painter/"
        onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
        onMouseOut={(e) => (e.target.style.textDecoration = "none")}
      >
        LinkedIn
      </a>

      {/* <a
        style={{ ...linkStyle, bottom: "15%", right: "20%" }}
        target="blank"
        href="TrudyPainter_Resume.pdf"
        onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
        onMouseOut={(e) => (e.target.style.textDecoration = "none")}
      >
        Resume
      </a> */}

      {/* <a
        style={{ ...linkStyle, bottom: "15%", right: "20%" }}
        target="_blank"
        href="https://docs.google.com/spreadsheets/d/1pBokIjBV7lxDYNxqqxfLrNb7h3h4GuhWSbrrTGd9Fho/edit#gid=0"
        onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
        onMouseOut={(e) => (e.target.style.textDecoration = "none")}
      >
        Full CV
      </a> */}

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
