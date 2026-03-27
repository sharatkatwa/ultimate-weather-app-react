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
const HourlyForcastCard = ({ time, temp, code }) => {
const date = new Date(time);

const hour = date.getHours();
const formatted = hour % 12 || 12; // convert to 12-hour
const ampm = hour >= 12 ? "PM" : "AM";
const getEmoji = weatherCodeMap[code]?.emoji || '🌥️'
  return (
    <div className="glass-box rounded-[16px] flex flex-col items-center w-18 py-4 flex-shrink-0">
      <p className="text-sm font-bold text-gray-600">{formatted}{ampm}</p>
      <p>{getEmoji}</p>
      <p className="font-syne">{Math.trunc(Number(temp))}&deg;</p>
    </div>
  );
};

export default HourlyForcastCard;
