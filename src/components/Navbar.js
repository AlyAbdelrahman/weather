"use client";

import React, { useState } from "react";
import { MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { loadingCityAtom, placeAtom } from "@/app/atom";
import { useAtom, atom } from "jotai";
import Searchbox from "./Searchbox";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

export default function Navbar({ location }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [place, setPlace] = useAtom(placeAtom);
  const [_, setLoadingCity] = useAtom(loadingCityAtom);

  async function handleInputChange(value) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`
        );
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json(); 
        console.log('ress', data);
        const suggestions = data.list.map((item) => item.name);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        setSuggestions([]);
        setShowSuggestions(false);
        setError("Failed to fetch suggestions.");
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }
  

  function handleSuggestionClick(value) {
    setCity(value);
    setShowSuggestions(false);
  }

  function handleSubmitSearch(e) {
    setLoadingCity(true);
    e.preventDefault();
    if (suggestions.length === 0) {
      setError("Location not found");
      setLoadingCity(false);
    } else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 500);
    }
  }

  

  return (
    <>
      <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
        <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
          <p className="flex items-center justify-center gap-2">
            <h2 className="text-gray-500 text-3xl">Weather</h2>
            <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
          </p>
          <section className="flex gap-2 items-center">
           
            <MdOutlineLocationOn className="text-3xl" />
            <p className="text-slate-900/80 text-sm"> {location} </p>
            <div className="relative hidden md:flex">
              <Searchbox
                value={city}
                onSubmit={handleSubmitSearch}
                onChange={(e) => handleInputChange(e.target.value)}
              />
              <SuggestionBox
                showSuggestions={showSuggestions}
                suggestions={suggestions}
                handleSuggestionClick={handleSuggestionClick}
                error={error}
              />
            </div>
          </section>
        </div>
      </nav>
      <section className="flex max-w-7xl px-3 md:hidden">
        <div className="relative">
          <Searchbox
            value={city}
            onSubmit={handleSubmitSearch}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <SuggestionBox
            showSuggestions={showSuggestions}
            suggestions={suggestions}
            handleSuggestionClick={handleSuggestionClick}
            error={error}
          />
        </div>
      </section>
    </>
  );
}

function SuggestionBox({ showSuggestions, suggestions, handleSuggestionClick, error }) {
  return (
    <>
      {((showSuggestions && suggestions.length > 0) || error) && (
        <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1">{error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer p-1 rounded hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
