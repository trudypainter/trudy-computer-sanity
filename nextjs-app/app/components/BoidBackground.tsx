"use client";

import { useEffect, useRef, useState } from "react";

interface Metaball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  targetX: number;
  targetY: number;
  speed: number; // Individual speed factor
  wanderAngle: number; // For autonomous wandering
  phaseOffset: number; // Individual phase offset for movement
}

export default function BoidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const metaballsRef = useRef<Metaball[]>([]);
  const animationFrameRef = useRef<number>(0);
  const initializedRef = useRef<boolean>(false);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize metaballs
  useEffect(() => {
    const initMetaballs = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Create offscreen canvas for performance
      const offscreenCanvas = document.createElement("canvas");
      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;
      offscreenCanvasRef.current = offscreenCanvas;

      // Only initialize metaballs if not already initialized
      if (initializedRef.current) return;

      const metaballs: Metaball[] = [];
      const numMetaballs = 25; // Increased number of metaballs for better coverage

      // Determine if we're on a mobile device or small screen
      const isMobile = window.innerWidth < 768;
      const isSmallScreen = window.innerWidth < 1024;

      // Adjust grid and sizes based on screen size
      const gridCols = isMobile ? 4 : 5;
      const gridRows = isMobile ? 4 : 5;
      const actualMetaballs = isMobile ? 16 : 25; // 4x4 grid for mobile

      // Calculate base radius based on screen size
      // Smaller radius on mobile devices
      const baseRadius = isMobile
        ? 40 + Math.min(window.innerWidth, window.innerHeight) * 0.05
        : isSmallScreen
          ? 60 + Math.min(window.innerWidth, window.innerHeight) * 0.06
          : 80 + Math.min(window.innerWidth, window.innerHeight) * 0.07;

      // Spread metaballs across the entire screen
      for (let i = 0; i < actualMetaballs; i++) {
        // Place metaballs in a grid-like pattern across the entire screen
        const col = i % gridCols;
        const row = Math.floor(i / gridCols);

        // Add some randomness to the grid positions
        const baseX = (col + 0.5) * (canvas.width / gridCols);
        const baseY = (row + 0.5) * (canvas.height / gridRows);
        const x =
          baseX + (Math.random() - 0.5) * ((canvas.width / gridCols) * 0.8);
        const y =
          baseY + (Math.random() - 0.5) * ((canvas.height / gridRows) * 0.8);

        // Randomize radius but keep it proportional to screen size
        const radiusVariation = isMobile ? 30 : 60;

        metaballs.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.2, // Slower initial velocity
          vy: (Math.random() - 0.5) * 0.2,
          radius: baseRadius + Math.random() * radiusVariation, // Responsive size
          targetX: x, // Initial target is the starting position
          targetY: y,
          speed: 0.2 + Math.random() * 0.3, // Individual speed factor
          wanderAngle: Math.random() * Math.PI * 2, // Random initial wander angle
          phaseOffset: Math.random() * Math.PI * 2, // Random phase offset
        });
      }

      metaballsRef.current = metaballs;
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

        // Store old dimensions for scaling
        const oldWidth = canvas.width;
        const oldHeight = canvas.height;

        // Set canvas to full window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Resize offscreen canvas if it exists
        if (offscreenCanvasRef.current) {
          offscreenCanvasRef.current.width = canvas.width;
          offscreenCanvasRef.current.height = canvas.height;
        }

        // If metaballs are already initialized, adjust their positions proportionally
        if (initializedRef.current && metaballsRef.current.length > 0) {
          const widthRatio = canvas.width / oldWidth;
          const heightRatio = canvas.height / oldHeight;

          // Use the smaller ratio for radius scaling to maintain proportions
          const sizeRatio = Math.min(widthRatio, heightRatio);

          metaballsRef.current.forEach((metaball) => {
            // Scale positions proportionally to new canvas size
            metaball.x *= widthRatio;
            metaball.y *= heightRatio;
            metaball.targetX *= widthRatio;
            metaball.targetY *= heightRatio;

            // Scale radius proportionally
            metaball.radius *= sizeRatio;
          });
        } else {
          // First time initialization
          initMetaballs();
        }
      }, 250); // 250ms debounce
    };

    // Set initial canvas size and initialize metaballs
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initMetaballs();
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

      // Update metaballs to be repelled by mouse
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Adjust repulsion radius based on screen size
      const isMobile = window.innerWidth < 768;
      const repulsionRadius = isMobile ? 200 : 300;

      // Repel metaballs from mouse position
      metaballsRef.current.forEach((metaball) => {
        const distanceFromMouse = Math.sqrt(
          Math.pow(metaball.x - e.clientX, 2) +
            Math.pow(metaball.y - e.clientY, 2)
        );

        // Only repel if mouse is close enough
        if (distanceFromMouse < repulsionRadius) {
          // Stronger repulsion when closer
          const repulsionStrength =
            0.8 * (1 - distanceFromMouse / repulsionRadius);

          // Calculate angle away from mouse
          const angleFromMouse = Math.atan2(
            metaball.y - e.clientY,
            metaball.x - e.clientX
          );

          // Apply repulsion force
          metaball.vx += Math.cos(angleFromMouse) * repulsionStrength;
          metaball.vy += Math.sin(angleFromMouse) * repulsionStrength;
        }
      });
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
    const offscreenCanvas = offscreenCanvasRef.current;
    if (!canvas || !offscreenCanvas) return;

    const ctx = canvas.getContext("2d");
    const offCtx = offscreenCanvas.getContext("2d");
    if (!ctx || !offCtx) return;

    const animate = () => {
      // Clear both canvases
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      offCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

      // Setup offscreen canvas for threshold drawing
      offCtx.fillStyle = "black";
      offCtx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
      offCtx.globalCompositeOperation = "lighter";

      // Get current time for autonomous movement
      const currentTime = performance.now() * 0.001;

      // Determine if we're on a mobile device
      const isMobile = window.innerWidth < 768;

      // Update and draw metaballs
      metaballsRef.current.forEach((metaball, index) => {
        // Get the initial grid position (the home region)
        const gridCols = isMobile ? 4 : 5;
        const gridRows = isMobile ? 4 : 5;
        const col = index % gridCols;
        const row = Math.floor(index / gridCols);

        // Calculate home position based on current canvas dimensions
        const homeX = (col + 0.5) * (canvas.width / gridCols);
        const homeY = (row + 0.5) * (canvas.height / gridRows);
        const homeRadius =
          Math.min(canvas.width, canvas.height) /
          (gridCols * (isMobile ? 1.2 : 1.5));

        // Autonomous wandering behavior
        // Update wander angle with Perlin-like noise
        // Slower movement on mobile for better performance
        const wanderSpeed = isMobile ? 0.3 : 0.5;
        metaball.wanderAngle +=
          Math.sin(currentTime * wanderSpeed + metaball.phaseOffset) * 0.1;

        // Calculate wander force - adjusted for mobile
        const wanderForceX =
          Math.cos(metaball.wanderAngle) * 0.03 * metaball.speed;
        const wanderForceY =
          Math.sin(metaball.wanderAngle) * 0.03 * metaball.speed;

        // Apply wander force
        metaball.vx += wanderForceX;
        metaball.vy += wanderForceY;

        // Calculate distance from home region center
        const distFromHome = Math.sqrt(
          Math.pow(metaball.x - homeX, 2) + Math.pow(metaball.y - homeY, 2)
        );

        // Apply soft boundary force to keep within home region
        if (distFromHome > homeRadius * 0.8) {
          // Calculate angle back to home
          const angleToHome = Math.atan2(
            homeY - metaball.y,
            homeX - metaball.x
          );

          // Stronger return force when further from home
          const returnStrength = 0.01 * Math.pow(distFromHome / homeRadius, 2);

          // Apply return force
          metaball.vx += Math.cos(angleToHome) * returnStrength;
          metaball.vy += Math.sin(angleToHome) * returnStrength;
        }

        // Add very subtle randomness
        metaball.vx += (Math.random() - 0.5) * 0.01;
        metaball.vy += (Math.random() - 0.5) * 0.01;

        // Dampen velocity
        metaball.vx *= 0.97;
        metaball.vy *= 0.97;

        // Update position
        metaball.x += metaball.vx;
        metaball.y += metaball.vy;

        // Draw metaballs to offscreen canvas with gradients for the metaball effect
        const gradient = offCtx.createRadialGradient(
          metaball.x,
          metaball.y,
          0,
          metaball.x,
          metaball.y,
          metaball.radius
        );

        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.5)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        offCtx.fillStyle = gradient;
        offCtx.beginPath();
        offCtx.arc(metaball.x, metaball.y, metaball.radius, 0, Math.PI * 2);
        offCtx.fill();
      });

      // Apply threshold filter by getting image data
      const imageData = offCtx.getImageData(
        0,
        0,
        offscreenCanvas.width,
        offscreenCanvas.height
      );
      const data = imageData.data;

      // Create the final image with metaball color
      ctx.fillStyle = "rgb(55, 65, 81)"; // gray-600
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create a colored metaball effect
      const finalImageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      const finalData = finalImageData.data;

      for (let i = 0; i < data.length; i += 4) {
        // Calculate brightness from offscreen canvas
        const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;

        // Apply threshold and coloring to main canvas with more subtle effect
        if (brightness > 50) {
          // Lower threshold for more coverage
          // Inside the metaball - a lighter gray
          finalData[i] = 75; // R - slightly lighter
          finalData[i + 1] = 85; // G - gray
          finalData[i + 2] = 99; // B - 500
          finalData[i + 3] = 230; // Slightly transparent for subtle effect
        } else if (brightness > 10) {
          // Lower outer threshold too
          // Outer edge of metaball - darker
          const alpha = brightness / 10;
          finalData[i] = 55; // R - darker
          finalData[i + 1] = 65; // G - gray
          finalData[i + 2] = 81; // B - 600
          finalData[i + 3] = Math.min(200, 80 + alpha * 120); // More transparent edges
        }
        // Everything else remains the background color
      }

      // Put the modified data back
      ctx.putImageData(finalImageData, 0, 0);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
