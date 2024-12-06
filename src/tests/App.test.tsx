import React from 'react';
import {Unit} from '../models/unit.model';
import {fireEvent, render, screen} from '@testing-library/react';
import App from '../App';

jest.mock('../components/Forecast', () => () => <div>Forecast</div>);
jest.mock('../components/ChangeUnitButton', () => ({onUnitChange}: { onUnitChange: () => void }) => (
    <button onClick={onUnitChange}>Change Unit</button>
));
jest.mock('../components/CurrentWeather', () => ({unit, onError}: { unit: Unit, onError: () => void }) => (
    <>
        <div>Current Weather, unit = {unit}</div>
        <button onClick={onError}>Trigger error</button>
    </>
));
jest.mock('../components/ErrorMessage', () => ({message}: { message: string }) => <h2>{message}</h2>);


describe('App component', () => {
    it('should render and contain the UnitChangeButton, CurrentWeather and Forecast components', () => {
        render(<App/>);

        expect(screen.getByText('Change Unit')).toBeInTheDocument();
        expect(screen.getByText('Forecast')).toBeInTheDocument();
        expect(screen.getByText('Current Weather, unit = metric')).toBeInTheDocument();
    });

    it('should change the unit when the button is clicked', () => {
        render(<App/>);

        expect(screen.getByText('Current Weather, unit = metric')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Change Unit'));

        expect(screen.getByText('Current Weather, unit = imperial')).toBeInTheDocument();
    });

    it('should render the error message component when there is an error', () => {
        render(<App/>);

        fireEvent.click(screen.getByText('Trigger error'));

        expect(screen.getByText('Error fetching weather data :(')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const {asFragment} = render(<App/>);

        expect(asFragment()).toMatchSnapshot();
    });
});
