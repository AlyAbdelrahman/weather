import React from "react";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { FiDroplet } from "react-icons/fi";
import { MdAir } from "react-icons/md";
import { ImMeter } from "react-icons/im";
import WeatherIcon from "./WeatherIcon";
import { getDayOrNightIcon } from "@/utils/helpers";

export default function WeatherDetails(props) {
    const {
        main,
        wind,
        weather,
        dt_txt
    } = props.data;
    return (
        <>
            <div>
                <p className=" capitalize text-center">
                    {weather[0].description}{" "}
                </p>
                <WeatherIcon
                    iconName={getDayOrNightIcon(
                        weather[0].icon ?? "",
                        dt_txt ?? ""
                    )}
                />
            </div>
            <SingleWeatherDetail
                icon={<FiDroplet />}
                information="Humidity"
                value={main.humidity}
            />
            <SingleWeatherDetail
                icon={<MdAir />}
                information="Wind Speed"
                value={wind.speed}
            />
            <SingleWeatherDetail
                icon={<ImMeter />}
                information="Air Pressure"
                value={main.pressure}
            />

        </>
    );
}

function SingleWeatherDetail(props) {
    return (
        <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
            <p className="whitespace-nowrap">{props.information}</p>
            <div className="text-3xl">{props.icon}</div>
            <p>{props.value}</p>
        </div>
    );
}