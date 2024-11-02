import { convertKelvinToCelsius } from '@/utils/helpers'
import React from 'react'

export default function TempratureBox(props) {
    const { data } = props;
    return (
        <div className="flex flex-col px-4 py-4  rounded-xl">
            <span className="text-5xl">
                {convertKelvinToCelsius(data?.main.temp ?? 0)}°
            </span>
            <p className="text-xs space-x-1 whitespace-nowrap">
                <span> Feels like</span>
                <span>{convertKelvinToCelsius(data?.main.feels_like ?? 0)}°</span>
            </p>
            <p className="text-xs space-x-2">
                <span>{convertKelvinToCelsius(data?.main.temp_min ?? 0)}↓°</span>
                <span>{convertKelvinToCelsius(data?.main.temp_max ?? 0)}↑°</span>
            </p>
        </div>
    )
}
