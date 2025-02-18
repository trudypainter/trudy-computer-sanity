"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface BoidsParameters {
  // Population
  BOID_COUNT: number;

  // Vision and Awareness
  VISUAL_RANGE: number;
  PERIPHERAL_VISION: number; // How wide they can see (in degrees)

  // Movement Behavior
  CENTERING_FACTOR: number;
  MATCHING_FACTOR: number;
  SEPARATION_FACTOR: number;
  MOUSE_ATTRACTION: number;
  MOUSE_INFLUENCE_RADIUS: number;
  MIN_SPEED: number;
  MAX_SPEED: number;
  TURN_SPEED: number; // How quickly they can change direction
  JITTER: number; // Random movement factor

  // Boundaries
  EDGE_MARGIN: number;
  EDGE_BOUNCE_FACTOR: number; // How strongly they bounce off edges

  // Appearance
  BOID_SIZE: number;
  BOID_TRAIL_LENGTH: number;
  BOID_OPACITY: number;
  TRAIL_OPACITY: number;
  BOID_COLOR: string;
  TRAIL_COLOR: string;

  // Background
  BACKGROUND_COLOR_1: string;
  BACKGROUND_COLOR_2: string;
  BACKGROUND_GRADIENT_ANGLE: number; // in degrees
  BACKGROUND_OPACITY: number;

  // Behavioral Traits
  SOCIABILITY: number; // Tendency to group
  INDEPENDENCE: number; // Tendency to maintain own direction
  PLAYFULNESS: number; // Random behavior frequency
  ENERGY_LEVEL: number; // Overall movement intensity
}

interface BoidsContextType {
  parameters: BoidsParameters;
  updateParameters: (newParams: Partial<BoidsParameters>) => void;
}

const defaultParameters: BoidsParameters = {
  // Population
  BOID_COUNT: 50,

  // Vision and Awareness
  VISUAL_RANGE: 75,
  PERIPHERAL_VISION: 270,

  // Movement Behavior
  CENTERING_FACTOR: 0.003,
  MATCHING_FACTOR: 0.03,
  SEPARATION_FACTOR: 0.03,
  MOUSE_ATTRACTION: 0.0015,
  MOUSE_INFLUENCE_RADIUS: 200,
  MIN_SPEED: 1,
  MAX_SPEED: 2,
  TURN_SPEED: 0.3,
  JITTER: 0.1,

  // Boundaries
  EDGE_MARGIN: 50,
  EDGE_BOUNCE_FACTOR: 0.5,

  // Appearance
  BOID_SIZE: 2.5,
  BOID_TRAIL_LENGTH: 2,
  BOID_OPACITY: 0.5,
  TRAIL_OPACITY: 0.2,
  BOID_COLOR: "rgb(147, 197, 253)",
  TRAIL_COLOR: "rgb(191, 219, 254)",

  // Background
  BACKGROUND_COLOR_1: "rgb(30, 58, 138)",
  BACKGROUND_COLOR_2: "rgb(30, 58, 138)",
  BACKGROUND_GRADIENT_ANGLE: 45,
  BACKGROUND_OPACITY: 0.05,

  // Behavioral Traits
  SOCIABILITY: 0.5,
  INDEPENDENCE: 0.5,
  PLAYFULNESS: 0.5,
  ENERGY_LEVEL: 0.5,
};

const BoidsContext = createContext<BoidsContextType | undefined>(undefined);

export function BoidsProvider({ children }: { children: ReactNode }) {
  const [parameters, setParameters] =
    useState<BoidsParameters>(defaultParameters);

  const updateParameters = (newParams: Partial<BoidsParameters>) => {
    console.log("🔄 Updating boid parameters:", newParams);
    setParameters((prev) => {
      // Ensure all required parameters are present
      const updated = {
        ...defaultParameters, // Start with defaults
        ...prev, // Apply current parameters
        ...newParams, // Apply new parameters
      };
      console.log("📊 New boid parameters:", updated);
      return updated;
    });
  };

  return (
    <BoidsContext.Provider value={{ parameters, updateParameters }}>
      {children}
    </BoidsContext.Provider>
  );
}

export function useBoidsParameters() {
  const context = useContext(BoidsContext);
  if (context === undefined) {
    throw new Error("useBoidsParameters must be used within a BoidsProvider");
  }
  return context;
}
