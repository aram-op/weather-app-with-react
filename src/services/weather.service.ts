import {Unit} from '../models/unit.model';

export function generateEndpointUrl(endpointType: 'weather' | 'forecast', latitude: string, longitude: string, unit: Unit) {
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

    return `https://api.openweathermap.org/data/2.5/${endpointType}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
}

export async function fetchCurrentWeather(unit: Unit) {
    const url = generateEndpointUrl('weather', '40.178', '44.5152', unit);

    const response = await fetch(url);

    if (response.ok) {
        return await response.json();
    }

    throw new Error(`Response Status: ${response.status}`);
}

export async function fetchForecast(unit: Unit) {
    const url = generateEndpointUrl('forecast', '40.178', '44.5152', unit);

    const response = await fetch(url);

    if (response.ok) {
        return await response.json();
    }

    throw new Error(`Response Status: ${response.status}`);
}
