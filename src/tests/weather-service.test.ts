import { fetchCurrentWeather, fetchForecast, generateEndpointUrl } from '../services/weather.service';
import { Unit } from '../models/unit.model';

global.fetch = jest.fn();

describe('Weather Service', () => {
    beforeEach(() => {
        process.env.REACT_APP_OPENWEATHER_API_KEY = 'mockApiKey';
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('.fetchCurrentWeather()',() => {
        it('should fetch the current weather data', async () => {
            const mockResponse = {
                weather: [{ description: 'Clear sky' }],
                main: { temp: 25 },
                wind: { speed: 5 },
                name: 'Yerevan',
            };

            const mockJson = jest.fn().mockResolvedValue(mockResponse);
            (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: mockJson });

            const result = await fetchCurrentWeather('metric');

            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(
                'https://api.openweathermap.org/data/2.5/weather?lat=40.178&lon=44.5152&appid=mockApiKey&units=metric'
            );
            expect(result).toEqual(mockResponse);
        });

        it('should throw an error if the api returns status not ok', async () => {
            (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 404 });

            await expect(fetchCurrentWeather('metric')).rejects.toThrow('Response Status: 404');
        });
    });

    describe('.fetchForecast()', () => {
        it('should fetch the forecast data', async () => {
            const mockResponse = {
                list: [
                    { main: { temp: 20 }, weather: [{ description: 'Clear sky' }] },
                    { main: { temp: 22 }, weather: [{ description: 'Partly cloudy' }] },
                ],
            };

            const mockJson = jest.fn().mockResolvedValue(mockResponse);
            (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: mockJson });

            const result = await fetchForecast('imperial');

            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(
                'https://api.openweathermap.org/data/2.5/forecast?lat=40.178&lon=44.5152&appid=mockApiKey&units=imperial'
            );
            expect(result).toEqual(mockResponse);
        });

        it('should throw an error if the api returns status not ok', async () => {
            (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });

            await expect(fetchForecast('imperial')).rejects.toThrow('Response Status: 500');
        });
    });

    describe('.generateEndpointUrl()', () => {
        it('should generate correct url for weather endpoint', () => {
            const url = generateEndpointUrl('weather', '40.178', '44.5152', 'metric');
            expect(url).toBe(
                'https://api.openweathermap.org/data/2.5/weather?lat=40.178&lon=44.5152&appid=mockApiKey&units=metric'
            );
        });

        it('should generate correct url for forecast endpoint', () => {
            const url = generateEndpointUrl('forecast', '40.178', '44.5152', 'imperial');
            expect(url).toBe(
                'https://api.openweathermap.org/data/2.5/forecast?lat=40.178&lon=44.5152&appid=mockApiKey&units=imperial'
            );
        });
    });
});
