import { useEffect, useState } from "react";
import speClasses from './Weather.module.css';
import SearchBubble from "../SearchBubble/SearchBubble";
import WeatherDatas from "../WeatherDatas/WeatherDatas";
import '../../index.css';

export default function Weather() {
    const [data, setData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let content;

    const getWeather = async (url)=> {
        try {
            setIsLoading(true);

            const response = await fetch(url);

            if(response.status !== 200) {
                setData(false);
                alert(`Can't find weather for this city's name.`)
            } else {
               const data = await response.json();
               setData(data); 
            }
            
            setIsLoading(false);
        } catch (error) {
            alert(error)
        }
    }

    useEffect(()=> {
        function getLocalWeather() {
            function success(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const API_KEY = import.meta.env.VITE_API_KEY;
                const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`;

                getWeather(URL);
            }
        
            function error(error) {
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

    if(data) {
        content = <WeatherDatas weather={data}/>;
    }

    if(!data) { content = <p className={speClasses.defaultMess}>Please enter a city name</p> }

    if(isLoading) { content = <p className={speClasses.defaultMess}>Loading weather, please wait...</p> }

    const backgrdImg = data ? data.weather[0].icon : 'defaultImg';

    return <main 
            className={speClasses.weather}
            style={{backgroundImage: `url("src/assets/${backgrdImg}.jpg")`}}
        >
        <div className={`${speClasses.overlay} flexColCenter`}>
            <h1>Daily weather</h1>
            <section className={`${speClasses.widget} flexColCenter`}>
                <SearchBubble
                    onSearch={getWeather}
                />
                {content}
            </section>
        </div>
    </main>
}