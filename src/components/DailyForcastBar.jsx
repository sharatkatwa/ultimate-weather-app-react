import React from "react";
const weatherCodeMap = {
  0: { label: "Clear sky", emoji: "☀️" },

  1: { label: "Mainly clear", emoji: "🌤️" },
  2: { label: "Partly cloudy", emoji: "⛅" },
  3: { label: "Overcast", emoji: "☁️" },

  45: { label: "Fog", emoji: "🌫️" },
  48: { label: "Rime fog", emoji: "🌫️" },

  51: { label: "Light drizzle", emoji: "🌦️" },
  53: { label: "Moderate drizzle", emoji: "🌦️" },
  55: { label: "Heavy drizzle", emoji: "🌧️" },

  56: { label: "Freezing drizzle", emoji: "🌧️" },
  57: { label: "Freezing drizzle", emoji: "🌧️" },

  61: { label: "Light rain", emoji: "🌦️" },
  63: { label: "Moderate rain", emoji: "🌧️" },
  65: { label: "Heavy rain", emoji: "🌧️" },

  66: { label: "Freezing rain", emoji: "🌧️" },
  67: { label: "Freezing rain", emoji: "🌧️" },

  71: { label: "Light snow", emoji: "🌨️" },
  73: { label: "Moderate snow", emoji: "❄️" },
  75: { label: "Heavy snow", emoji: "❄️" },

  77: { label: "Snow grains", emoji: "🌨️" },

  80: { label: "Light showers", emoji: "🌦️" },
  81: { label: "Moderate showers", emoji: "🌧️" },
  82: { label: "Heavy showers", emoji: "⛈️" },

  85: { label: "Snow showers", emoji: "🌨️" },
  86: { label: "Snow showers", emoji: "❄️" },

  95: { label: "Thunderstorm", emoji: "⛈️" },
  96: { label: "Thunderstorm", emoji: "⛈️" },
  99: { label: "Thunderstorm", emoji: "⛈️" },
};

const DailyForcastBar = ({ code, date, max, min,index }) => {

  const getDay = (date, index) => {
    if (index === 0) return "Today";

    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };
  
  const getEmoji = weatherCodeMap[code]?.emoji || "🌥️";
  const getLabel = weatherCodeMap[code]?.label || "Partly Cloudy";
  return (
    <div className="daily flex justify-between bg-[rgba(255,255,255,0.08)] rounded-[16px] p-5">
      <div>
        <span>{getDay(date,index)}{getEmoji} </span>
        <span className="text-xs text-gray-600 capitalize font-bold">{getLabel}</span>
      </div>
      <div className="minmax-temp">
        <span className="font-syne font-bold">{Math.trunc(Number(max))}&deg;</span>
        <span className="font-bold text-gray-500"> {Math.trunc(Number(min))}&deg;</span>
      </div>
    </div>
  );
};

export default DailyForcastBar;
