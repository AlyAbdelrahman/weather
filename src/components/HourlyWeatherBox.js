import React from 'react'
import { format, fromUnixTime, parseISO } from "date-fns";
import WeatherIcon from './WeatherIcon';
import { convertKelvinToCelsius, getDayOrNightIcon } from '@/utils/helpers';

export default function HourlyWeatherBox(props) {
    return (
        <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
            {props.data?.list.map((d, i) => (
                <div
                    key={i}
                    className="flex flex-col justify-between gap-2 items-center text-xs font-semibold "
                >
                    <p className="whitespace-nowrap">
                        {format(parseISO(d.dt_txt), "h:mm a")}
                    </p>

                    {/* <WeatherIcon iconName={d.weather[0].icon} /> */}
                    <WeatherIcon
                        iconName={getDayOrNightIcon(
                            d.weather[0].icon,
                            d.dt_txt
                        )}
                    />
                    <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
                </div>
            ))}
        </div>
    )
}
