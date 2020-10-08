class Forecast {
    constructor(){
        // key to the make requests (API Key)
        this.key = 'kbH9DLBxYGkiaH7A1eMYqCsKVN4d1WhL';
        this.weatherURI = 'https://dataservice.accuweather.com/currentconditions/v1/';
        this.city = 'https://dataservice.accuweather.com/locations/v1/cities/search'
    }
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;    
        const response = await fetch(this.city + query);
        const data = await response.json();    
        return data[0];
    }
    async getWeather(id){ // id is the city key
        const query = `${id}?apikey=${this.key}`;    
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();    
        return data[0];
    }
    async updateCity(city){
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);
        return { cityDets, weather };
        //object shorthand notation (property and value name are the same)
    }
}

// the first request is to get the key of the location
//  then we pass that key to get the weather information on the location