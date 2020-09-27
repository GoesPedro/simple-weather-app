// this is the key to the make requests (API Key)
const key = 'kbH9DLBxYGkiaH7A1eMYqCsKVN4d1WhL';

const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

};

const getWeather = async (id) => { // id is the city key

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

};


// the first request is to get the key of the location
//  then we pass that key to get the weather information on the location