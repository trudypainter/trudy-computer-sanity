"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Pen, Check, X, RefreshCw } from "lucide-react";
import { useBoidsParameters } from "./BoidsContext";

interface BioBit {
  _id: string;
  title: string;
  content: string;
  order: number;
  tags: { name: string; slug: string }[];
  location: { name: string; slug: string; coordinates: number[] };
  links: any[];
}

interface ShuffleButtonProps {
  value: string;
  onChange: (value: string) => void;
  onShuffle: () => void;
}

const ShuffleButton = ({ value, onChange, onShuffle }: ShuffleButtonProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update tempValue when value prop changes
  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleSubmit = () => {
    onChange(tempValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handlePenClick = () => {
    inputRef.current?.focus();
  };

  const handleShuffle = () => {
    onShuffle();
    setIsEditing(false);
  };

  return (
    <div className="inline-flex h-6">
      <input
        ref={inputRef}
        type="text"
        value={tempValue}
        onChange={(e) => {
          setTempValue(e.target.value);
          setIsEditing(true);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-20 px-2 text-xs font-mono bg-gray-300 text-gray-800 rounded-l focus:outline-none ${
          isFocused ? "ring-1 ring-gray-800" : ""
        }`}
      />
      <div
        className={`flex rounded ${isFocused ? "ring-1 ring-gray-800" : ""}`}
      >
        <button
          onClick={isEditing ? handleSubmit : handlePenClick}
          className="px-2 bg-gray-300 hover:bg-gray-400 transition-colors flex items-center justify-center"
        >
          {isEditing ? (
            <Check size={12} className="text-gray-800 rounded-l-none" />
          ) : (
            <Pen size={12} className="text-gray-800 rounded-l-none" />
          )}
        </button>
        <button
          onClick={handleShuffle}
          className="px-2 bg-gray-300 hover:bg-gray-400 rounded-r transition-colors flex items-center justify-center"
          title="Shuffle to random value"
        >
          <RefreshCw size={12} className="text-gray-800" />
        </button>
      </div>
    </div>
  );
};

const behaviorOptions = [
  "crazy",
  "chill",
  "obsessive",
  "frozen",
  "goofy",
  "hyperfast",
];
const backgroundOptions = [
  "night sky",
  "grass",
  "valentines",
  "diva",
  "ocean",
  "fiery",
  "monochrome",
];

export const BioBits = ({ data }: { data: BioBit[] }) => {
  const [showMadlibs, setShowMadlibs] = useState(false);
  const [currentBehavior, setCurrentBehavior] = useState(behaviorOptions[0]);
  const [currentBackground, setCurrentBackground] = useState(
    backgroundOptions[0]
  );
  const { updateParameters, parameters } = useBoidsParameters();
  const [shouldUseDarkText, setShouldUseDarkText] = useState(true);

  const shuffleOption = (options: string[], current: string) => {
    // Get a random value that's different from the current one
    let newValue;
    do {
      newValue = options[Math.floor(Math.random() * options.length)];
    } while (newValue === current && options.length > 1);
    return newValue;
  };

  // Function to determine if we should use dark text based on background color
  const updateTextColor = (params: any) => {
    if (!params) return;

    // Parse the RGB values from the background color
    const rgb = params.BACKGROUND_COLOR_1.match(/\d+/g);
    if (!rgb) return;

    // Calculate relative luminance using the formula
    // Relative luminance = (0.299 * R + 0.587 * G + 0.114 * B) / 255
    const luminance =
      (0.299 * Number(rgb[0]) +
        0.587 * Number(rgb[1]) +
        0.114 * Number(rgb[2])) /
      255;

    console.log(
      "🎨 Background luminance:",
      luminance,
      "Using dark text:",
      luminance > 0.5
    );

    // Use dark text if background is light (luminance > 0.5)
    setShouldUseDarkText(luminance > 0.5);
  };

  // Update text colors whenever parameters change
  useEffect(() => {
    if (parameters) {
      updateTextColor(parameters);
    }
  }, [parameters]);

  const updateBoidsParameters = async () => {
    try {
      console.log("🎲 Updating boids with:", {
        behavior: currentBehavior,
        background: currentBackground,
      });

      const prompt = `Given a boids simulation where the boids act ${currentBehavior} against a ${currentBackground} background, suggest appropriate numerical parameters for the simulation. Consider the behavior and background carefully when adjusting these values, especially the colors to match the background theme. The parameters should be returned as a JSON object with these fields:

      {
        // Population
        "BOID_COUNT": 50,
        
        // Vision and Awareness
        "VISUAL_RANGE": 75,
        "PERIPHERAL_VISION": 270,
        
        // Movement Behavior
        "CENTERING_FACTOR": 0.003,
        "MATCHING_FACTOR": 0.03,
        "SEPARATION_FACTOR": 0.03,
        "MOUSE_ATTRACTION": 0.0015,
        "MOUSE_INFLUENCE_RADIUS": 200,
        "MIN_SPEED": 1,
        "MAX_SPEED": 2,
        "TURN_SPEED": 0.3,
        "JITTER": 0.1,
        
        // Boundaries
        "EDGE_MARGIN": 50,
        "EDGE_BOUNCE_FACTOR": 0.5,
        
        // Appearance
        "BOID_SIZE": 2.5,
        "BOID_TRAIL_LENGTH": 2,
        "BOID_OPACITY": 0.5,
        "TRAIL_OPACITY": 0.2,
        "BOID_COLOR": "rgb(147, 197, 253)",
        "TRAIL_COLOR": "rgb(191, 219, 254)",
        
        // Background
        "BACKGROUND_COLOR_1": "rgb(30, 58, 138)",
        "BACKGROUND_COLOR_2": "rgb(30, 58, 138)",
        "BACKGROUND_GRADIENT_ANGLE": 45,
        "BACKGROUND_OPACITY": 0.05,
        
        // Behavioral Traits
        "SOCIABILITY": 0.5,
        "INDEPENDENCE": 0.5,
        "PLAYFULNESS": 0.5,
        "ENERGY_LEVEL": 0.5
      }

      Adjust ALL values based on the description to create the desired visual effect. For example:
      - If the background is "night sky", use deep blues and stars-like colors
      - If the background is "sunset", use warm gradients and glowing colors
      - If the behavior is "energetic", increase ENERGY_LEVEL and JITTER
      - Match the boid colors to complement the background theme
      
      Return only the JSON object with appropriate values for all parameters.`;

      console.log("🤖 Sending prompt to Gemini...");
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      console.log("📡 Received response from Gemini:", data);

      if (data.response) {
        try {
          // Clean the response by removing markdown code block syntax and comments
          const cleanJson = data.response
            .replace(/```json\n|\n```/g, "") // Remove markdown
            .replace(/\/\/ .*$/gm, "") // Remove single-line comments
            .replace(/^\s*[\r\n]/gm, "") // Remove empty lines
            .trim();
          console.log("🧹 Cleaned JSON string:", cleanJson);
          const parameters = JSON.parse(cleanJson);
          console.log("✨ Parsed parameters:", parameters);
          updateParameters(parameters);
          updateTextColor(parameters);
        } catch (e) {
          console.error("❌ Failed to parse Gemini response:", e);
          console.error("Failed JSON:", data.response);
        }
      }
    } catch (error) {
      console.error("❌ Error updating boids parameters:", error);
    }
  };

  // Update boids when madlib values change
  useEffect(() => {
    if (showMadlibs) {
      updateBoidsParameters();
    }
  }, [currentBehavior, currentBackground]);

  // Dynamic text color classes based on background luminance
  const textColorClass = shouldUseDarkText ? "text-gray-800" : "text-gray-200";
  const titleColorClass = shouldUseDarkText ? "text-gray-600" : "text-gray-300";

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="w-full md:w-1/3 space-y-8">
      {/* Bio bits section with dynamic text color */}
      <div className={`space-y-8 ${textColorClass}`}>
        {data.map((bit: BioBit) => (
          <section key={bit._id} className="space-y-1">
            <h2 className={`font-mono text-xs ${titleColorClass}`}>
              {bit.title.toUpperCase()}
            </h2>
            <div className="text-sm">{bit.content}</div>
          </section>
        ))}
      </div>

      {/* Generate section with consistent dark text on light background */}
      <div className="space-y-0">
        <button
          onClick={() => setShowMadlibs(!showMadlibs)}
          className={`text-xs font-mono text-gray-600 px-3 py-1.5 rounded bg-gray-200 hover:text-gray-900 transition-colors flex items-center gap-2 ${
            showMadlibs ? "rounded-b-none" : ""
          }`}
        >
          {showMadlibs ? (
            <X size={14} className="text-gray-600" />
          ) : (
            <Sparkles size={14} className="text-gray-600" />
          )}
          {showMadlibs ? "Close" : "Generate new background"}
        </button>

        {showMadlibs && (
          <p className="text-sm leading-relaxed bg-gray-200 text-gray-600 rounded-b-lg rounded-r-lg p-3 space-y-2">
            <span className="block">
              the boids act{" "}
              <ShuffleButton
                value={currentBehavior}
                onChange={setCurrentBehavior}
                onShuffle={() =>
                  setCurrentBehavior(
                    shuffleOption(behaviorOptions, currentBehavior)
                  )
                }
              />
            </span>
            <span className="block">
              against a{" "}
              <ShuffleButton
                value={currentBackground}
                onChange={setCurrentBackground}
                onShuffle={() =>
                  setCurrentBackground(
                    shuffleOption(backgroundOptions, currentBackground)
                  )
                }
              />{" "}
              background
            </span>
          </p>
        )}
      </div>
    </div>
  );
};
