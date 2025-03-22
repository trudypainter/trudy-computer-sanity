"use client";

import { useEffect, useRef, useState } from "react";

interface Dot {
  x: number;
  y: number;
  baseSize: number; // Original size of the dot
  size: number; // Current size (will change based on mouse position)
}

export default function DotsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const dotsRef = useRef<Dot[]>([]);
  const animationFrameRef = useRef<number>(0);
  const initializedRef = useRef<boolean>(false);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize dots
  useEffect(() => {
    const initDots = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Only initialize dots if not already initialized
      if (initializedRef.current) return;

      const dots: Dot[] = [];

      // Determine if we're on a mobile device or small screen
      const isMobile = window.innerWidth < 768;

      // Adjust grid spacing based on screen size
      const spacing = isMobile ? 40 : 60;

      // Create a grid of dots across the entire canvas
      for (let x = spacing; x < canvas.width; x += spacing) {
        for (let y = spacing; y < canvas.height; y += spacing) {
          // Base size is proportional to spacing but with some randomness
          const baseSize = spacing * 0.4 + Math.random() * spacing * 0.1;

          dots.push({
            x,
            y,
            baseSize,
            size: baseSize, // Initial size is the base size
          });
        }
      }

      dotsRef.current = dots;
      initializedRef.current = true;
    };

    const handleResize = () => {
      // Clear any existing timeout to debounce resize events
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      // Debounce resize to prevent excessive recalculations
      resizeTimeoutRef.current = setTimeout(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas to full window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Reset initialization flag to recreate dots on new dimensions
        initializedRef.current = false;
        initDots();
      }, 250); // 250ms debounce
    };

    // Set initial canvas size and initialize dots
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    }

    // Add resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameRef.current);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Initial mouse position in center if not moved yet
    if (mousePosition.x === 0 && mousePosition.y === 0) {
      const canvas = canvasRef.current;
      if (canvas) {
        setMousePosition({ x: canvas.width / 2, y: canvas.height / 2 });
      }
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mousePosition]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fill background with #ff0000
      ctx.fillStyle = "#000080";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set dot color to #ff1000
      ctx.fillStyle = "#000080";

      // Define the influence radius where mouse affects dots
      const influenceRadius = Math.min(canvas.width, canvas.height) * 0.2;

      // Update and draw dots
      dotsRef.current.forEach((dot) => {
        // Calculate distance from mouse
        const dx = dot.x - mousePosition.x;
        const dy = dot.y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate size based on distance to mouse
        // Closer to mouse = smaller dots
        if (distance < influenceRadius) {
          // Scale from 0.3 (close to mouse) to 1.0 (at influence radius)
          const scaleFactor = 0.3 + 0.7 * (distance / influenceRadius);
          dot.size = dot.baseSize * scaleFactor;
        } else {
          // Return to base size if outside influence radius
          dot.size = dot.baseSize;
        }

        // Draw the dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
