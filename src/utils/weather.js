export const getWeather = async (url)=> {
    try {
        const response = await fetch(url);
        
        if(!response.ok) {
            throw new Error();
        }
        
        const data = await response.json();

        return data;

    } catch (error) {
        const mess = error.message || 'Failed to load weather';
        alert(mess);
    }
}