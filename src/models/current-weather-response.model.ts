export interface CurrentWeatherResponse {
    coord: {
        lon: string,
        lat: string
    },
    weather: [
        {
            id: string,
            main: string,
            description: string,
            icon: string
        }
    ],
    base : string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level : number,
        grnd_level: number
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number,
        gust: number
    },
    rain: {
        firstHour: number
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: bigint,
        sunset: bigint
    },
    timezone: number,
    id: bigint,
    name: string,
    cod: number
}