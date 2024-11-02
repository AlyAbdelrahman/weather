'use client';
import Navbar from "@/components/Navbar";
import { useQuery } from '@tanstack/react-query';
import HourlyWeatherBox from "@/components/HourlyWeatherBox";
import TempratureBox from "@/components/TempratureBox";
import Date from "@/components/Date";
import Loader from "@/components/Loader";
import { fetchWeather } from "@/utils/apiServices";



export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: 'weatherData',
    queryFn: () => fetchWeather('london'),
  });
  const firstData = data?.list[0];

  if (isLoading) return <Loader/>
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
          </div>
        </section>
      </main>
    </div>
  );
} 
