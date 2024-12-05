import React, {useState} from 'react';
import './App.css';
import Forecast from './components/Forecast';
import ChangeUnitButton from './components/ChangeUnitButton';
import CurrentWeather from './components/CurrentWeather';
import {Unit} from './models/unit.model';
import ErrorMessage from './components/ErrorMessage';

function App() {
    const [unit, setUnit] = useState<Unit>('metric');
    const [error, setError] = useState<any>(null);

    function handleUnitChange() {
        if (unit === 'metric') {
            setUnit('imperial');
        } else {
            setUnit('metric');
        }
    }

    function handleError(error: Error) {
        console.error(error);
        setError(error);
    }

    if (error) return (
        <ErrorMessage message="Error fetching weather data :("/>
    );

    return (
        <div className="container">
            <ChangeUnitButton onButtonClicked={handleUnitChange}/>
            <CurrentWeather unit={unit} key={`current weather ${unit}`} onError={handleError}/>
            <Forecast unit={unit} key={`forecast ${unit}`} onError={handleError}/>
        </div>
    );
}

export default App;
