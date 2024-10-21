import { useRef } from 'react';
import specificClasses from './SearchBubble.module.css';
import '../../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchBubble({onSearch}) {
    const inputRef = useRef();

    const handleSearch = (event)=> {
        event.preventDefault();

        const city = inputRef.current.value.toLowerCase();
        const API_KEY = import.meta.env.VITE_API_KEY;
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        city !== '' ? onSearch(URL) : null;
    }

    return <form 
            className={`flexRow ${specificClasses.search}`}
            onSubmit={()=> {handleSearch(event)}}
        >
        <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        <input 
            type="text" 
            ref={inputRef}
            placeholder='City name'
        />
    </form>
}