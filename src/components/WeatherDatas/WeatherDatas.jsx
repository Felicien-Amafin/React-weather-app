import speClasses from './WeatherDatas.module.css';
import '../../index.css';

export default function WeatherDatas({weather}) {
    const data = {
        city: weather.name,
        temp: Math.floor(weather.main.temp),
        humidity: weather.main.humidity,
        wind_speed: weather.wind.speed,
        feels_like: Math.floor(weather.main.feels_like)
    }

    return <div className={`${speClasses.weatherDatas} flexColCenter`}>
        <div className={speClasses.cityTemp}>
            <h2>{data.city}</h2>
            <p>{data.temp}{`°C`}</p>
        </div>
        <ul className={`${speClasses.tempPrecisions} flexRow`}>
            <li><div>Humidity: {data.humidity}%</div></li>
            <li><div>Feels like: {data.feels_like}{`°C`}</div></li>
            <li><div>Wind speed: {data.wind_speed}km/h</div></li>
        </ul>
    </div>
}