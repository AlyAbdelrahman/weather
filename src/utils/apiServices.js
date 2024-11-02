export const fetchWeather = async (CITY) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WEATHER_APP_DOMAIN}?q=${CITY}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&&cnt=56`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };