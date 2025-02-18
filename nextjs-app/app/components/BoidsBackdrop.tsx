"use client";

import { useEffect, useRef } from "react";
import { useBoidsParameters } from "./BoidsContext";

interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
}

interface MousePosition {
  x: number;
  y: number;
}

export const BoidsBackdrop = () => {
  const { parameters } = useBoidsParameters();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boidsRef = useRef<Boid[]>([]);
  const animationFrameRef = useRef<number>();
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });
  const lastSizeRef = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();

  // Detect iOS
  const isIOS = useRef(
    typeof window !== "undefined" &&
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as any).MSStream
  );

  const initializeBoids = (width: number, height: number) => {
    console.log("🎯 Initializing boids with parameters:", parameters);
    const boids: Boid[] = [];
    for (let i = 0; i < parameters.BOID_COUNT; i++) {
      boids.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * parameters.ENERGY_LEVEL,
        vy: (Math.random() - 0.5) * parameters.ENERGY_LEVEL,
        rotation: Math.random() * 360,
      });
    }
    return boids;
  };

  const updateBoid = (
    boid: Boid,
    boids: Boid[],
    width: number,
    height: number,
    mousePos: MousePosition
  ) => {
    let centerX = 0,
      centerY = 0;
    let avgVx = 0,
      avgVy = 0;
    let separationX = 0,
      separationY = 0;
    let numNeighbors = 0;

    // Add random jitter
    boid.vx += (Math.random() - 0.5) * parameters.JITTER;
    boid.vy += (Math.random() - 0.5) * parameters.JITTER;

    const dx = mousePos.x - boid.x;
    const dy = mousePos.y - boid.y;
    const distToMouse = Math.sqrt(dx * dx + dy * dy);
    if (distToMouse < parameters.MOUSE_INFLUENCE_RADIUS) {
      const influence =
        (parameters.MOUSE_INFLUENCE_RADIUS - distToMouse) /
        parameters.MOUSE_INFLUENCE_RADIUS;
      boid.vx += dx * parameters.MOUSE_ATTRACTION * influence;
      boid.vy += dy * parameters.MOUSE_ATTRACTION * influence;
    }

    boids.forEach((otherBoid) => {
      if (otherBoid === boid) return;

      const dx = otherBoid.x - boid.x;
      const dy = otherBoid.y - boid.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Check if boid is within peripheral vision
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const relativeAngle = ((angle - boid.rotation + 180) % 360) - 180;
      if (
        distance < parameters.VISUAL_RANGE &&
        Math.abs(relativeAngle) < parameters.PERIPHERAL_VISION / 2
      ) {
        centerX += otherBoid.x;
        centerY += otherBoid.y;

        avgVx += otherBoid.vx;
        avgVy += otherBoid.vy;

        if (distance < parameters.VISUAL_RANGE / 2) {
          separationX -= dx;
          separationY -= dy;
        }

        numNeighbors++;
      }
    });

    if (numNeighbors > 0) {
      // Adjust centering based on sociability
      centerX = centerX / numNeighbors;
      centerY = centerY / numNeighbors;
      boid.vx +=
        (centerX - boid.x) *
        parameters.CENTERING_FACTOR *
        parameters.SOCIABILITY;
      boid.vy +=
        (centerY - boid.y) *
        parameters.CENTERING_FACTOR *
        parameters.SOCIABILITY;

      // Adjust velocity matching based on independence
      avgVx = avgVx / numNeighbors;
      avgVy = avgVy / numNeighbors;
      boid.vx +=
        (avgVx - boid.vx) *
        parameters.MATCHING_FACTOR *
        (1 - parameters.INDEPENDENCE);
      boid.vy +=
        (avgVy - boid.vy) *
        parameters.MATCHING_FACTOR *
        (1 - parameters.INDEPENDENCE);

      boid.vx += separationX * parameters.SEPARATION_FACTOR;
      boid.vy += separationY * parameters.SEPARATION_FACTOR;
    }

    // Edge behavior with bounce factor
    if (boid.x < parameters.EDGE_MARGIN)
      boid.vx += 0.2 * parameters.EDGE_BOUNCE_FACTOR;
    if (boid.x > width - parameters.EDGE_MARGIN)
      boid.vx -= 0.2 * parameters.EDGE_BOUNCE_FACTOR;
    if (boid.y < parameters.EDGE_MARGIN)
      boid.vy += 0.2 * parameters.EDGE_BOUNCE_FACTOR;
    if (boid.y > height - parameters.EDGE_MARGIN)
      boid.vy -= 0.2 * parameters.EDGE_BOUNCE_FACTOR;

    // Speed limits affected by energy level
    const speed = Math.sqrt(boid.vx * boid.vx + boid.vy * boid.vy);
    const maxSpeed = parameters.MAX_SPEED * parameters.ENERGY_LEVEL;
    const minSpeed = parameters.MIN_SPEED * parameters.ENERGY_LEVEL;

    if (speed > maxSpeed) {
      boid.vx = (boid.vx / speed) * maxSpeed;
      boid.vy = (boid.vy / speed) * maxSpeed;
    } else if (speed < minSpeed) {
      boid.vx = (boid.vx / speed) * minSpeed;
      boid.vy = (boid.vy / speed) * minSpeed;
    }

    // Update position
    boid.x += boid.vx;
    boid.y += boid.vy;

    // Update rotation with turn speed
    const targetRotation = Math.atan2(boid.vy, boid.vx) * (180 / Math.PI);
    let rotationDiff = targetRotation - boid.rotation;
    if (rotationDiff > 180) rotationDiff -= 360;
    if (rotationDiff < -180) rotationDiff += 360;

    boid.rotation += rotationDiff * parameters.TURN_SPEED;

    // Wrap around edges
    if (boid.x < 0) boid.x = width;
    if (boid.x > width) boid.x = 0;
    if (boid.y < 0) boid.y = height;
    if (boid.y > height) boid.y = 0;
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create gradient background
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width *
        Math.cos((parameters.BACKGROUND_GRADIENT_ANGLE * Math.PI) / 180),
      canvas.height *
        Math.sin((parameters.BACKGROUND_GRADIENT_ANGLE * Math.PI) / 180)
    );
    gradient.addColorStop(0, parameters.BACKGROUND_COLOR_1);
    gradient.addColorStop(1, parameters.BACKGROUND_COLOR_2);

    ctx.fillStyle = gradient;
    ctx.globalAlpha = parameters.BACKGROUND_OPACITY;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    boidsRef.current.forEach((boid) => {
      updateBoid(
        boid,
        boidsRef.current,
        canvas.width,
        canvas.height,
        mouseRef.current
      );

      ctx.save();
      ctx.translate(boid.x, boid.y);
      ctx.rotate((boid.rotation * Math.PI) / 180);

      // Draw boid
      ctx.beginPath();
      ctx.arc(0, 0, parameters.BOID_SIZE, 0, Math.PI * 2);
      ctx.globalAlpha = parameters.BOID_OPACITY;
      ctx.fillStyle = parameters.BOID_COLOR;
      ctx.fill();

      // Draw trail
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(
        -boid.vx * parameters.BOID_TRAIL_LENGTH,
        -boid.vy * parameters.BOID_TRAIL_LENGTH
      );
      ctx.globalAlpha = parameters.TRAIL_OPACITY;
      ctx.strokeStyle = parameters.TRAIL_COLOR;
      ctx.stroke();

      ctx.restore();
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Initialize canvas and event listeners only once on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      // For iOS, only update if the size change is significant (>50px)
      // This prevents URL bar show/hide from triggering updates
      if (isIOS.current) {
        const widthDiff = Math.abs(newWidth - lastSizeRef.current.width);
        const heightDiff = Math.abs(newHeight - lastSizeRef.current.height);

        if (widthDiff < 50 && heightDiff < 50) {
          return;
        }
      }

      canvas.width = newWidth;
      canvas.height = newHeight;
      lastSizeRef.current = { width: newWidth, height: newHeight };
      boidsRef.current = initializeBoids(newWidth, newHeight);
    };

    const handleResize = () => {
      // Clear any existing timeout
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      // Debounce resize events
      resizeTimeoutRef.current = setTimeout(() => {
        updateSize();
      }, 100); // 100ms debounce
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    // Initial setup
    updateSize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); // Empty dependency array - only run on mount

  // Handle parameter updates without reinitializing everything
  useEffect(() => {
    console.log("🔄 Boids parameters updated:", parameters);
    // No need to reinitialize everything - the animation loop will use the new parameters automatically
  }, [parameters]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};
