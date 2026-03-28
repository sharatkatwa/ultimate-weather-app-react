import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
// ICONS
import { FaRegBell } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";
import HourlyForcastCard from "./components/HourlyForcastCard";
import DailyForcastBar from "./components/DailyForcastBar";

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

const App = () => {
  const [weather, setWeather] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [coordinates, setCoordinates] = useState({
    latitude: 15.34522,
    longitude: 76.15478,
  });
  const [city, setCity] = useState("koppal");
  const inputRef = useRef(null);
  // const now = new Date();

  // Hourly data
  // const currentIndex = weather ? weather.hourly.time.findIndex((t) => new Date(t) >= now) : "";
  // const nextHours = weather?weather.hourly.time.slice(currentIndex, currentIndex + 8):'';
  // const nextTemps = weather?weather.hourly.temperature_2m.slice(currentIndex, currentIndex + 8):'';
  // const nextCodes = weather?weather.hourly.weather_code.slice(currentIndex, currentIndex + 8):'';
  const getHourlyData = () => {
    if (!weather) return [];
    const now = new Date();

    const currentIndex = weather.hourly.time.findIndex((t) => new Date(t) >= now);

    return weather.hourly.time.slice(currentIndex, currentIndex + 8).map((time, i) => ({
      time,
      temp: weather.hourly.temperature_2m[currentIndex + i],
      code: weather.hourly.weather_code[currentIndex + i],
    }));
  };

  const getDailyData = () => {
    if (!weather) return [];

    return weather.daily.time.map((date, i) => ({
      date,
      max: weather.daily.temperature_2m_max[i],
      min: weather.daily.temperature_2m_min[i],
      code: weather.daily.weather_code[i],
    }));
  };

  // console.log("weather", weather);
  // console.log("airQuality", airQuality);

  const getLocation = async () => {
    console.log(city);
    try {
      const LocationData = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`,
      );
      // console.log("locationDATA: ", LocationData.data.results[0]);
      setCoordinates({
        latitude: LocationData.data.results[0].latitude,
        longitude: LocationData.data.results[0].longitude,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getWeather = async () => {
    try {
      const weatherData = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m,visibility&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`,
      );
      const airQualityData = await axios.get(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&hourly=pm2_5,pm10,us_aqi`,
      );
      // console.log("WeatherDATA: ", weatherData.data);
      // console.log("airQuality DATA: ", airQuality);
      setWeather(structuredClone(weatherData.data));
      setAirQuality(structuredClone(airQualityData.data));
    } catch (err) {
      console.log(err);
    } finally {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (city) getLocation();
  }, [city]);

  useEffect(() => {
    if (coordinates) getWeather();
  }, [coordinates]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newCity = inputRef.current.value.trim();
    if (newCity) {
      setCity(newCity);
      // getLocation(city)
    }
  };

  return (
    <div className="min-h-screen text-[#e8edf5 relative overflow-x-hidden bg-[#060b14] ">
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient"></div>
      <div className="fixed inset-0 pointer-events-none z-0 bg-noise"></div>
      <nav className="flex items-center justify-between w-full h-15 transparent text-gray-400 px-[2vw]">
        <h3 className="logo font-syne font-extrabold title-gradient">Weather</h3>
        <div className="flex gap-5">
          <FaRegBell />
          <CgProfile />
        </div>
      </nav>
      <div className=" min-h-full w-full px-10 text-white flex flex-col items-center">
        <section className="font-dmsans flex flex-col items-center gap-5 w-full max-w-xl">
          <div className="search-container glass-box flex items-center gap-3 rounded-[16px] p-3 w-full">
            <HiMiniMagnifyingGlass className="text-3xl text-gray-600" />
            <form onSubmit={handleSubmit}>
              <input type="text" ref={inputRef} placeholder="Search city, region..." className="w-full outline-none" />
            </form>
          </div>

          {/* MAIN CARD */}
          <div className="currentWeather glass-box rounded-[18px] w-full relative">
            <div className="absolute top-0 right-10 w-60 h-60 pointer-events-none bg-card-gradient" />
            <div className="absolute sm:top-15 right-5 sm:text-7xl text-[12vw] top-25">
              {weather ? weatherCodeMap[weather.current.weather_code]?.emoji : "⏳"}
            </div>
            <div className="top-part mx-10 my-5 border-b border-[rgba(255,255,255,0.08)] flex flex-col items-start gap-4 p-5">
              <div className="city-bar flex">
                <div className="city-container flex items-center">
                  <IoLocationOutline className="text-[#4af0c4]" />
                  <span>
                    <span className="text-gray-300">{city ? city : "Koppal"}</span>
                    <span className="text-gray-600">
                      {" "}
                      ·{" "}
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </span>
                </div>
              </div>
              <div className="section-sec">
                <div className="temperature">
                  <h1 className="font-syne text-7xl temp-gradient flex items-start -mt-2 mb-2 leading-none font-extrabold">
                    {weather ? Math.trunc(Number(weather.current?.temperature_2m)) : "⌛"}{" "}
                    <span className="text-xl font-dmsans text-gray-400 font-light  leading-none mt-5">&deg;C</span>
                  </h1>
                  <p className="text-l text-gray-500">
                    {weather ? weatherCodeMap[weather.current.weather_code]?.label : "⌛"}
                  </p>
                </div>
              </div>
              <span className="capsule border border-[rgba(74,240,196,.35)] text-[#4af0c4] text-xs rounded-full px-[10px] py-[4px] bg-[rgba(74,240,196,.15)]">
                AQI {airQuality ? airQuality.hourly.us_aqi[0] : "⌛"} · Moderate
              </span>
              <p className="text-sm  italic text-gray-500">
                Feels like <span>{weather ? Math.trunc(Number(weather.current?.apparent_temperature)) : "⌛"}&deg;C · High humidity expected post noon</span>
              </p>
            </div>
            <div className="bottom-part flex justify-center gap-[4vmax] leading-none my-10">
              <div className="flex flex-col items-center gap-2">
                💧
                <span className="font-syne text-xl font-bold text-blue-400 leading-none">
                  {weather ? Number(weather.current.relative_humidity_2m) : "⌛"}%
                </span>{" "}
                <span className="uppercase text-xs text-gray-500 leading-none">Humidity </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                🌬️
                <span className="font-syne text-xl font-bold text-green-400 leading-none">
                  {weather ? Math.ceil(Number(weather.current.wind_speed_10m)) : "⌛"} km/h
                </span>{" "}
                <span className="uppercase text-xs text-gray-500 leading-none">WIND </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                👁️
                <span className="font-syne text-xl font-bold text-orange-400 leading-none">
                  {weather ? Math.trunc(Number(weather.current.visibility) / 1000) : "⌛"} km
                </span>{" "}
                <span className="uppercase text-xs text-gray-500 leading-none">Visibility</span>
              </div>
            </div>
          </div>

          {/* HOURLY CARDS */}
          <div className="hourly-forcast w-full">
            <h1 className="uppercase text-gray-600 text-xs font-bold my-2">Hourly Forcast</h1>
            <div className="flex gap-2 overflow-x-auto scroll-smooth no-scrollbar w-full">
              {getHourlyData().map((hour, index) => (
                <div key={index} className="flex-shrink-0">
                  <HourlyForcastCard time={hour.time} temp={hour.temp} code={hour.code} />
                </div>
              ))}
            </div>
          </div>

          {/* DAILY CARDS */}
          <div className="daily-forcast w-full">
            <h1 className="uppercase text-gray-600 text-xs font-bold my-2">7-Day forcast</h1>
            <div className="flex flex-col p-3 gap-2 glass-box w-full rounded-[18px] ">
              {getDailyData().map((day, index) => (
                <DailyForcastBar key={index} date={day.date} index={index} max={day.max} min={day.min} code={day.code} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
