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