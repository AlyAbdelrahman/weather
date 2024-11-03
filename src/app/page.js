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
import { loadingCityAtom, placeAtom } from "./atom";
import { useEffect } from "react";



export default function Home() {
  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity] = useAtom(loadingCityAtom);
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: 'weatherData',
    queryFn: () => fetchWeather(place),
  });
  const firstData = data?.list[0];
  useEffect(() => {
    refetch();
  }, [place, refetch]);

  if (isLoading) return <Loader />
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* today data */}
        <section className="space-y-4">
          <div className="space-y-2">
            <Date data={firstData} />
            <div className='w-full bg-white border rounded-xl flex py-10 shadow-sm gap-10 px-6 items-center' >
              {/* temprature */}
              <TempratureBox data={firstData} />
              {/* time and weather icon */}
              <HourlyWeatherBox data={data} />
            </div>
            <div className="w-full bg-white border rounded-xl flex py-10 shadow-sm gap-10 px-6 items-center">
              <div className="flex w-full justify-around">
                <WeatherDetails data={firstData} />
              </div>
            </div>


            <h2 className="flex gap-1 text-2xl items-end">
              <p>
                Forcast (7 days)
              </p>
            </h2>
              {getFilteredUniqueDates(data).map((dayData, index) => (
                index > 0 && index < 8 && (
                  <div className="w-full bg-white border rounded-xl flex py-10 shadow-sm gap-10 px-6 items-center">
                    <div className="flex w-full justify-around items-center">
                      <WeatherDetails key={index} data={dayData} showDay/>
                    </div>
                  </div>
                )
              ))}
            </div>
        </section>
      </main>
    </div>
  );
} 
