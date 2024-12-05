import {ForecastListItem} from './forecast-list-item.model';

export interface ForecastResponse {
    cod: number,
    message: number,
    cnt: number,
    list: ForecastListItem[],
    city: {
        id: bigint,
        name: string,
        coord: {
            lat: number,
            lon: number
        },
        country: string,
        population: number,
        timezone: number,
        sunrise: bigint,
        sunset: bigint
    }
}