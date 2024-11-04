'use client';
import Navbar from "@/components/Navbar";
import { useQuery } from '@tanstack/react-query';
import HourlyWeatherBox from "@/components/HourlyWeatherBox";
import TempratureBox from "@/components/TempratureBox";
import Date from "@/components/Date";
import Loader from "@/components/Loader";
import { fetchWeather } from "@/utils/apiServices";
import WeatherDetails from "@/components/WeatherDetails";
import { getFilteredUniqueDates } from "@/utils/helpers";
import { useAtom } from "jotai";
import { displaySearchAtom, loadingCityAtom, placeAtom } from "./atom";
import { useEffect, useState } from "react";

// Define  initial list of cities
const initialCities = ["London", "New York", "Tokyo", "Paris"];

export default function Home() {
  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity] = useAtom(loadingCityAtom);
  const [weatherData, setWeatherData] = useState([]);
  const [shouldDisplaySearch, setIsDisplaySearch] = useAtom(displaySearchAtom);
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: 'weatherData',
    queryFn: () => fetchWeather(place),
  });

  const firstData = data?.list[0];

  // State to track which city's forecast is visible
  const [activeForecastIndex, setActiveForecastIndex] = useState(null);

  // Fetch weather data for initial cities
  useEffect(() => {
    const fetchMultipleCitiesWeather = async () => {
      try {
        const responses = await Promise.all(
          initialCities.map((city) => fetchWeather(city))
        );
        setWeatherData(responses);
      } catch (error) {
        console.error('Error fetching multiple cities weather:', error);
      }
    };

    fetchMultipleCitiesWeather();
  }, []);

  // Refetch when `place` changes
  useEffect(() => {
    refetch();
  }, [place, refetch]);

  if (isLoading || loadingCity) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  const handleForecastToggle = (index) => {
    setActiveForecastIndex(activeForecastIndex === index ? null : index); // Toggle forecast visibility
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* Today data */}
        <section className="space-y-4">
          <div className="space-y-2">
            <Date data={firstData} />

            {!shouldDisplaySearch && weatherData.length > 0 && weatherData.map((cityWeather, index) => (
              <div key={cityWeather.id}>
                <div 
                  onClick={() => handleForecastToggle(index)} 
                  className={`w-full bg-white border-2 rounded-xl flex py-6 px-4 md:py-10 md:px-6 shadow-sm gap-4 md:gap-10 items-center transition-all duration-300 
                    ${activeForecastIndex === index ? 'border-blue-600 bg-blue-50' : 'border-transparent hover:border-gray-400'} cursor-pointer`}
                >
                  <div>
                    <h1 className="text-lg md:text-xl">{initialCities[index]}</h1>
                  </div>
                  <TempratureBox data={cityWeather.list[0]} />
                  <HourlyWeatherBox data={cityWeather} />
                  <div className="flex w-full justify-around">
                    <WeatherDetails data={cityWeather.list[0]} />
                  </div>
                </div>

                <div className={`overflow-hidden transition-max-height duration-300 ease-in-out ${activeForecastIndex === index ? 'max-h-200' : 'max-h-0'}`}>
                  {activeForecastIndex === index && ( // Conditional rendering for the forecast
                    <div className="mt-4"> {/* Added margin-top for spacing */}
                      <h2 className="flex gap-1 text-xl md:text-2xl items-end">
                        <p>
                          Forecast (7 days)
                        </p>
                      </h2>
                      {/* Weather details */}
                      {getFilteredUniqueDates(data).map((dayData, idx) => (
                        idx > 0 && idx < 8 && (
                          <div key={idx} className="w-full bg-white border rounded-xl flex py-6 md:py-10 shadow-sm gap-4 md:gap-10 px-4 md:px-6 items-center mb-4"> {/* Added margin-bottom for spacing */}
                            <div className="flex w-full justify-around items-center">
                              <WeatherDetails data={dayData} showDay />
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {shouldDisplaySearch && (
              <>
                <div><h6>{data.city.name}</h6></div>
                <div className='w-full bg-white border-2 rounded-xl flex py-6 px-4 md:py-10 md:px-6 shadow-sm gap-4 md:gap-10 items-center'>
                  <TempratureBox data={firstData} />
                  <HourlyWeatherBox data={data} />
                </div>
                <div className="w-full bg-white border-2 rounded-xl flex py-6 px-4 md:py-10 md:px-6 shadow-sm gap-4 md:gap-10 items-center">
                  <div className="flex w-full justify-around">
                    <WeatherDetails data={firstData} />
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
