"use client";
import { useEffect, useState } from "react";

const fetchWeatherAndAstronomy = async () => {
  const apiKey = "30cdc141d452409d92a5d032c7799521";
  const lat = "40.7128";
  const lon = "-74.0060";
  const part = "minutely,hourly";
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}&units=imperial`,
    {
      mode: "cors",
      headers: {
        Origin: "https://www.trudy.computer",
      },
    }
  );
  const data = await response.json();

  console.log(data);
  return {
    sunrise: data.current.sunrise,
    sunset: data.current.sunset,
    weather: data.current.weather[0].main,
    description: data.current.weather[0].description,
    data: data,
  };
};

export default function WeatherHub() {
  const [background, setBackground] = useState("");
  const [description, setDescription] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateBackground = async () => {
      const { sunrise, sunset, weather, description, data } =
        await fetchWeatherAndAstronomy();
      const now = new Date().getTime() / 1000; // current time in seconds
      const dayProgress = (now - sunrise) / (sunset - sunrise);
      const temp = data.current.temp; // current temperature in Fahrenheit
      let color1, color2;

      // Adjust colors based on weather
      switch (weather) {
        case "Clear":
          color1 = "yellow";
          color2 = "lightblue";
          break;
        case "Rain":
        case "Drizzle":
          color1 = "gray";
          color2 = "darkblue";
          break;
        case "Thunderstorm":
          color1 = "darkgray";
          color2 = "black";
          break;
        case "Snow":
          color1 = "lightblue";
          color2 = "white";
          break;
        case "Clouds":
          color1 = "lightgray";
          color2 = "darkgray";
          break;
        case "Fog":
        case "Mist":
        case "Haze":
          color1 = "lightblue";
          color2 = "gray";
          break;
        default:
          color1 = "orange";
          color2 = "purple";
      }

      // Modify gradient intensity based on temperature
      const tempFactor = Math.max(0, Math.min(100, ((temp - 32) / 68) * 100)); // Scale from 0% to 100% for temperatures 32°F to 100°F

      // Smooth linear gradient background
      const gradient = `linear-gradient(${color1} 50%, ${color2} 100%)`;
      setBackground(gradient);

      // Set the description to include the weather and the day progress and temperature
      setDescription(`${description} and ${data.current.temp}°F`);
    };

    updateBackground();

    const interval = setInterval(() => {
      const nowTime = new Date(); // Create a new Date object
      const formattedTime = nowTime.toLocaleString("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-full w-full rounded relative overflow-hidden"
      style={{ background }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "8px",
          right: "8px",
          fontFamily: "monospace",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(8px)",
          padding: "0.5rem 1rem",
          borderRadius: "0.25rem",
          width: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: "0.75rem",
            letterSpacing: "-0.05em",
            fontFamily: "monospace",
            color: "#6B7280",
          }}
        >
          Gradient generated from NYC weather: {currentTime} with {description}
        </div>
      </div>
    </div>
  );
}
