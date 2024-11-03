export function getDayOfWeekFromTimestamp(timestamp) {
    // Convert the timestamp from seconds to milliseconds
    const date = new Date(timestamp * 1000);

    // Create an options object for formatting
    const options = { weekday: 'long' };

    // Format the date to get the full name of the day
    return new Intl.DateTimeFormat('en-US', options).format(date);
}


export function getFormattedDateFromTimestamp(timestamp) {
    // Convert the timestamp from seconds to milliseconds
    const date = new Date(timestamp * 1000);

    // Extract the month, day, and year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    // Return the formatted date
    return `${month}.${day}.${year}`;
}

export function convertKelvinToCelsius(tempInKelvin) {
    const tempInCelsius = tempInKelvin - 273.15;
    return Math.floor(tempInCelsius);
}


export function getDayOrNightIcon(iconName, dateTimeString) {
    const hours = new Date(dateTimeString).getHours();

    const isDayTime = hours >= 6 && hours < 18;

    return isDayTime ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n");
}

export function convertWindSpeed(speedInMetersPerSecond) {
    const speedInKilometersPerHour = speedInMetersPerSecond * 3.6;
    return `${speedInKilometersPerHour.toFixed(0)}km/h`;
}

export function getFilteredUniqueDates(data) {
    const unFilteredUniqueDates = [...new Set(
        data?.list.map(
            (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
        )
    )];
    return unFilteredUniqueDates.map((date) => {
        return data?.list.find((entry) => {
            const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
            const entryTime = new Date(entry.dt * 1000).getHours();
            return entryDate === date && entryTime >= 6;
        });
    });
}