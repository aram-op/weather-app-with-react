import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import CurrentWeather from '../components/CurrentWeather';
import {fetchCurrentWeather} from '../services/weather.service';
import {CurrentWeatherResponse} from '../models/current-weather-response.model';

jest.mock('../services/weather.service');

const mockWeatherData: CurrentWeatherResponse = {
    name: 'Yerevan',
    weather: [{icon: '01d', description: 'Clear Sky', main: '', id: ''}],
    dt: 1638316800,
    main: {
        temp: 15,
        humidity: 80,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        pressure: 0,
        sea_level: 0,
        grnd_level: 0
    },
    wind: {
        speed: 5,
        deg: 0,
        gust: 0
    },
    coord: {
        lon: '',
        lat: ''
    },
    cod: 0,
    clouds: {
        all: 0
    },
    base: '',
    visibility: 0,
    sys: {
        type: 0,
        id: 0,
        country: '',
        sunrise: BigInt(0),
        sunset: BigInt(0)
    },
    id: BigInt(0),
    rain: {
        firstHour: 0
    },
    timezone: 0
};

describe('CurrentWeather component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the weather info', async () => {
        (fetchCurrentWeather as jest.Mock).mockResolvedValue(mockWeatherData);

        render(<CurrentWeather unit="metric" onError={jest.fn()}/>);

        await screen.findByText('Yerevan');

        expect(screen.getByText('Yerevan')).toBeInTheDocument();
        expect(screen.getByText('Clear Sky')).toBeInTheDocument();
        expect(screen.getByText('15')).toBeInTheDocument();
        expect(screen.getByText('Humidity: 80%')).toBeInTheDocument();
        expect(screen.getByText('Wind: 5 m/s')).toBeInTheDocument();
    });

    it('should change between metric and imperial units', async () => {
        (fetchCurrentWeather as jest.Mock).mockResolvedValue(mockWeatherData);

        const {rerender} = render(<CurrentWeather unit="metric" onError={jest.fn()}/>);
        await screen.findByText('Yerevan');
        expect(screen.getByText('°C')).toBeInTheDocument();
        expect(screen.getByText('Wind: 5 m/s')).toBeInTheDocument();

        rerender(<CurrentWeather unit="imperial" onError={jest.fn()}/>);
        await screen.findByText('Yerevan');
        expect(screen.getByText('°F')).toBeInTheDocument();
        expect(screen.getByText('Wind: 5 mph')).toBeInTheDocument();
    });

    it('should call onError if an error occurred in the service', async () => {
        const mockError = new Error('Response Status: 500');
        (fetchCurrentWeather as jest.Mock).mockRejectedValue(mockError);

        const onError = jest.fn();
        render(<CurrentWeather unit="metric" onError={onError}/>);

        await waitFor(() => expect(onError).toHaveBeenCalledWith(mockError));
    });

    it('should match the snapshot', async () => {
        (fetchCurrentWeather as jest.Mock).mockResolvedValue(mockWeatherData);

        const {container} = render(<CurrentWeather unit="metric" onError={jest.fn()}/>);

        expect(container).toMatchSnapshot();
    });
});
