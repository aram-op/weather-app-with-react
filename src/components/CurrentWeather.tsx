import {CurrentWeatherResponse} from '../models/current-weather-response.model';
import {useEffect, useState} from 'react';
import {fetchCurrentWeather} from '../services/weather.service';
import {Unit} from '../models/unit.model';
import {getFormattedDate} from '../utils/date-formatter';
import '../styles/current-weather.css';

function CurrentWeather({unit, onError}: { unit: Unit, onError: (error: Error) => void }) {
    const units = {
        metric: {
            temp: '°C',
            wind: 'm/s'
        },
        imperial: {
            temp: '°F',
            wind: 'mph'
        }
    }
    const [data, setData] = useState<CurrentWeatherResponse>();

    useEffect(() => {
        const getCurrentWeather = async () => {
            fetchCurrentWeather(unit)
                .then(setData)
                .catch(onError)
            ;
        }
        getCurrentWeather();
    }, []);


    if (!data) return <></>;

    return (
        <div className="current-weather-container">
            <img
                className="current-weather-icon"
                src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                alt="Current weather type icon"
            />
            <h2 className="city-name">{data?.name}</h2>
            <p className="date">{getFormattedDate(data!.dt)}</p>
            <p className="weather-description">{data?.weather[0].description}</p>

            <h1 className="current-temperature">{Math.round(data!.main.temp)}</h1>

            <p className="measurement-unit">{units[unit].temp}</p>
            <p className="humidity">Humidity: {Math.round(data!.main.humidity)}%</p>
            <p className="wind">Wind: {Math.round(data!.wind.speed)} {units[unit].wind}</p>
        </div>
    );
}

export default CurrentWeather;
