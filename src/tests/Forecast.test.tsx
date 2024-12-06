import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import Forecast from '../components/Forecast';
import {fetchForecast} from '../services/weather.service';
import {ForecastListItem} from '../models/forecast-list-item.model';

jest.mock('../services/weather.service');

const mockForecastData: ForecastListItem[] = [];
let mockTimestamp = 1733472000;
let mockMinTemp = 18;
let mockMaxTemp = 25;

for (let i = 0; i < 40; i++) {
    mockForecastData.push(
        {
            dt: mockTimestamp,
            main: {
                feels_like: 0,
                temp_min: mockMinTemp,
                temp_max: mockMaxTemp,
                pressure: 1015,
                sea_level: 1015,
                grnd_level: 933,
                humidity: 69,
                temp_kf: -1.11
            },
            weather: [
                {
                    id: 500,
                    main: 'Rain',
                    description: 'light rain',
                    icon: '10d'
                }
            ],
            clouds: {
                all: 100
            },
            wind: {
                speed: 0.62,
                deg: 349,
                gust: 1.18
            },
            visibility: 10000,
            pop: 0.32,
            rain: {
                h3: 0.26
            },
            sys: {
                pod: 'd'
            },
            dt_text: '2022-08-30 15:00:00'
        },
    );
    mockTimestamp += 10800;
    mockMinTemp++;
    mockMaxTemp++;
}


describe('Forecast component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should displays the weather forecast', async () => {
        (fetchForecast as jest.Mock).mockResolvedValue({list: mockForecastData});

        render(<Forecast unit="metric" onError={jest.fn()}/>);

        await screen.findByText('Sat');

        expect(screen.getByText('Sat')).toBeInTheDocument();
        expect(screen.getByText('Sun')).toBeInTheDocument();
        expect(screen.getByText('Mon')).toBeInTheDocument();
        expect(screen.getByText('Tue')).toBeInTheDocument();
        expect(screen.getByText('23')).toBeInTheDocument();
        expect(screen.getByText('36')).toBeInTheDocument();
    });

    it('should call onError if error occurred while getting forecast data', async () => {
        const mockError = new Error('Failed to fetch forecast data');
        (fetchForecast as jest.Mock).mockRejectedValue(mockError);

        const onError = jest.fn();
        render(<Forecast unit="metric" onError={onError}/>);

        await waitFor(() => expect(onError).toHaveBeenCalledWith(mockError));
    });

    it('should match the snapshot', async () => {
        (fetchForecast as jest.Mock).mockResolvedValue({ list: mockForecastData });

        const { container } = render(<Forecast unit="metric" onError={jest.fn()} />);
        await screen.findByText('Sun');

        expect(container).toMatchSnapshot();
    });
});
