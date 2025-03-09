"use client";

import { useEffect, useRef, useState } from "react";

interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
}

export default function BoidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const boidsRef = useRef<Boid[]>([]);
  const animationFrameRef = useRef<number>(0);

  // Initialize boids
  useEffect(() => {
    const initBoids = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const boids: Boid[] = [];
      const numBoids = 45; // Increased number of boids

      for (let i = 0; i < numBoids; i++) {
        boids.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3, // Slower initial velocity
          vy: (Math.random() - 0.5) * 0.3,
          size: 8 + Math.random() * 14, // Slightly larger size range
          rotation: Math.random() * Math.PI * 2,
        });
      }

      boidsRef.current = boids;
    };

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      initBoids();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw boids
      boidsRef.current.forEach((boid) => {
        // Apply subtle attraction to mouse position
        const dx = mousePosition.x - boid.x;
        const dy = mousePosition.y - boid.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 5) {
          // Avoid jittering when very close
          const attractionStrength = 0.0003; // Even more subtle attraction
          boid.vx += (dx / distance) * attractionStrength;
          boid.vy += (dy / distance) * attractionStrength;
        }

        // Apply some random movement
        boid.vx += (Math.random() - 0.5) * 0.018; // Slightly reduced randomness
        boid.vy += (Math.random() - 0.5) * 0.018;

        // Limit velocity
        const maxSpeed = 0.6; // Slower max speed for more gentle movement
        const speed = Math.sqrt(boid.vx * boid.vx + boid.vy * boid.vy);
        if (speed > maxSpeed) {
          boid.vx = (boid.vx / speed) * maxSpeed;
          boid.vy = (boid.vy / speed) * maxSpeed;
        }

        // Update position
        boid.x += boid.vx;
        boid.y += boid.vy;

        // Update rotation to face direction of movement
        boid.rotation = Math.atan2(boid.vy, boid.vx);

        // Wrap around edges
        if (boid.x < 0) boid.x = canvas.width;
        if (boid.x > canvas.width) boid.x = 0;
        if (boid.y < 0) boid.y = canvas.height;
        if (boid.y > canvas.height) boid.y = 0;

        // Draw rounded triangle
        ctx.save();
        ctx.translate(boid.x, boid.y);
        ctx.rotate(boid.rotation);

        // Set fill color slightly darker than bg-gray-500
        ctx.fillStyle = "rgba(55, 65, 81, 0.35)"; // Darker than gray-500 with transparency

        // Draw nicer rounded triangle
        const size = boid.size;
        ctx.beginPath();

        // Front point
        ctx.moveTo(size, 0);

        // Right side with rounded corner
        ctx.lineTo(size * 0.3, size * 0.5);
        ctx.quadraticCurveTo(-size * 0.2, size * 0.7, -size * 0.7, size * 0.3);

        // Back with rounded corner
        ctx.quadraticCurveTo(-size * 0.9, 0, -size * 0.7, -size * 0.3);

        // Left side with rounded corner
        ctx.quadraticCurveTo(-size * 0.2, -size * 0.7, size * 0.3, -size * 0.5);

        // Close the path
        ctx.closePath();
        ctx.fill();

        // Add a subtle gradient/highlight
        const gradient = ctx.createRadialGradient(
          size * 0.3,
          -size * 0.2,
          0,
          size * 0.3,
          -size * 0.2,
          size * 1.2
        );
        gradient.addColorStop(0, "rgba(107, 114, 128, 0.3)"); // Lighter highlight
        gradient.addColorStop(1, "rgba(55, 65, 81, 0)"); // Fade to transparent

        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.restore();
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
