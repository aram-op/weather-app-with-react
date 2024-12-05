import {ForecastListItem} from '../models/forecast-list-item.model';
import {fetchForecast} from '../services/weather.service';
import {useEffect, useState} from 'react';
import {FormattedForecast} from '../models/formatted-forecast.model';
import {Unit} from '../models/unit.model';
import '../styles/forecast.css';

function Forecast({unit, onError}: { unit: Unit, onError: (error: Error) => void }) {
    const [forecastList, setForecastList] = useState<FormattedForecast[]>([]);

    useEffect(() => {
        const getForecast = async () => {
            fetchForecast(unit)
                .then((forecast) => {
                    setForecastList(formatForecastData(forecast.list));
                })
                .catch(onError)
            ;
        }
        getForecast();
    }, []);

    const forecastItems = forecastList.map((item: any) => {
        return (
            <div className="forecast-item" key={item.day}>
                <p className="forecast-day">{item.day}</p>
                <img className="forecast-icon" src={`https://openweathermap.org/img/wn/${item.iconId}d@2x.png`}/>
                <div className="temp-container">
                    <span className="max-temp">{item.max}</span>
                    <span className="min-temp">{item.min}</span>
                </div>
            </div>
        );
    });

    return (
        <div className="forecast-container">
            {forecastItems}
        </div>
    );
}

function formatForecastData(list: ForecastListItem[]) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const forecastData = [];

    for (let i = 0; i < 4; i++) {
        const listIndex = 4 + 8 * i;
        const iconIds: number[] = [];
        let maxTemp = Math.round(list[listIndex].main.temp_max);
        let minTemp = Math.round(list[listIndex].main.temp_max);

        /**
         * The api returns forecast list for 40 hours.
         * The first 4 hours are from current day, thus the first 4 items in the list are skipped.
         * The last 4 hours are from the fifth day. They are skipped, because it represents only half of the day.
         */
        for (let j = listIndex + 1; j < listIndex + 8; j++) {
            const maxTempForHour = Math.round(list[j].main.temp_max);
            const minTempForHour = Math.round(list[j].main.temp_min);

            if (maxTempForHour > maxTemp) {
                maxTemp = maxTempForHour;
            }
            if (minTempForHour < minTemp) {
                minTemp = minTempForHour;
            }
            //IconId will be only the numeric part of the icon code.
            iconIds.push(parseInt(list[j].weather[0].icon.slice(0, 2)));
        }

        if (minTemp === -0) minTemp = 0;
        if (maxTemp === -0) maxTemp = 0;

        const day = days[new Date(list[listIndex].dt * 1000).getDay()];

        //Getting the worst case scenario icon id from the list.
        const iconId = Math.max(...iconIds) < 10 ? '0' + Math.max(...iconIds) : Math.max(...iconIds).toString();

        forecastData.push({min: minTemp, max: maxTemp, iconId: iconId, day: day});
    }
    return forecastData;
}

export default Forecast;