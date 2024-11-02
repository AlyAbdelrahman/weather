'use client';
import Navbar from "@/components/Navbar";
import { useQuery } from '@tanstack/react-query';

const CITY = 'London'; 
const API_KEY = '2ef96e0b7d26442142c3db8c38843fce'
// Fetch function to get weather data
const fetchWeather = async () => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&&cnt=56`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: 'weatherData',
    queryFn: fetchWeather,
  });

  if (isLoading) 
    return (
    <div className="flex items-center min-h-screen justify-center">
      <p className="animate-bounce">Loading...</p>
    </div>
  );
  if (error) return <div>Error: {error.message}</div>;
console.log(data)
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
     <Navbar/>
   </div>
  );
} 
