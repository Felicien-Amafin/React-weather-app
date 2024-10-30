import { useEffect, useState } from "react";
import { getWeather } from "../../utils/weather";
import speClasses from './Weather.module.css';
import SearchBubble from "../SearchBubble/SearchBubble";
import WeatherDatas from "../WeatherDatas/WeatherDatas";
import '../../index.css';


export default function Weather() {
    const [weatherData, setWeatherData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let content;
   
    const handleWeatherData = async (url)=> {
        setIsLoading(true);

        const data = await getWeather(url);
        data ? setWeatherData(data) : null;

        setIsLoading(false);
    }

    useEffect(()=> {
        function getLocalWeather() {
            const success = (position)=> {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const API_KEY = import.meta.env.VITE_API_KEY;
                const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        
                handleWeatherData(URL);
            }
            
            const error = (error)=> {
                alert(error.message);
            }
        
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error);
            } else {
                alert('Geolocation is not supported by your browser.Please enter a city name.');
            }
        }

        getLocalWeather();
    }, [])

    if(weatherData) {
        content = <WeatherDatas weather={weatherData}/>;
    }

    if(!weatherData) { content = <p className={speClasses.defaultMess}>Please enter a city name</p> }

    if(isLoading) { content = <p className={speClasses.defaultMess}>Loading weather, please wait...</p> }

    const backgrdImg = weatherData ? weatherData.weather[0].icon : 'defaultImg';

    return <main 
            className={speClasses.weather}
            style={{backgroundImage: `url("src/assets/${backgrdImg}.jpg")`}}
        >
        <div className={`${speClasses.overlay} flexColCenter`}>
            <h1>Daily weather</h1>
            <section className={`${speClasses.widget} flexColCenter`}>
                <SearchBubble
                    onSearch={handleWeatherData}
                />
                {content}
            </section>
        </div>
    </main>
}