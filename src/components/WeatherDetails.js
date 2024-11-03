import React from "react";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { FiDroplet } from "react-icons/fi";
import { MdAir } from "react-icons/md";
import { ImMeter } from "react-icons/im";
import WeatherIcon from "./WeatherIcon";
import { convertWindSpeed, getDayOrNightIcon } from "@/utils/helpers";
import TempratureBox from "./TempratureBox";
import { format, parseISO } from "date-fns";

export default function WeatherDetails(props) {
    const {
        main,
        wind,
        weather,
        dt_txt
    } = props.data;
    { console.log(props.data) }
    return (
        <>
            {props.showDay && <div className="flex justify-center items-center h-full"> <h2 className="flex gap-1 text-2xl  items-end ">
                <p>{format(parseISO(dt_txt ?? ""), "EEEE")}</p>
                <p className="text-lg">
                    ({format(parseISO(dt_txt ?? ""), "dd.MM.yyyy")})
                </p>
            </h2>
            </div>
            }
            {props.showDay && <TempratureBox data={props.data} />}
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
                value={`${main.humidity}%`}
            />
            <SingleWeatherDetail
                icon={<MdAir />}
                information="Wind Speed"
                value={convertWindSpeed(wind.speed)}
            />
            <SingleWeatherDetail
                icon={<ImMeter />}
                information="Air Pressure"
                value={`${main.pressure} hPa`}
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
