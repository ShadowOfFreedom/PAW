export class App {
    searchButton : HTMLButtonElement;
    input : HTMLInputElement;
    weatherContinaer: HTMLElement;
    cities: string[];

    opwApiKey = '90e690d94a139948c288790d6ea6aab7';

    constructor() {
        this.searchButton = <HTMLButtonElement>document.getElementById('search');
        this.input = <HTMLInputElement>document.getElementById('city_input');
        this.weatherContinaer = document.getElementById('container');
        this.cities = [];

        this.searchButton.addEventListener('click', () => this.showWeather());

        this.showAllData();
        this.refreshWetherEvery(120000);
    }

    async getCityInfo(city: string, saveWeather:boolean = true) {
        const weather = await this.getWeather(city);
        if(saveWeather) { this.saveData(city); }
        this.showData(weather);
    }

    async getWeather(city: string){
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.opwApiKey}`;
        const weatherResponse = await fetch(openWeatherUrl);
        const weatherData = await weatherResponse.json();

        return weatherData;
    }

    showWeather(){
        const city = this.input.value;
        if(this.input){
            this.getCityInfo(city);
        }
    }

    showData(data: any) {
        const icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        this.weatherContinaer.innerHTML += `
        <img src='${icon}'/>
    <div><label>City: </label><span>${data.name}</span></div>
    <div><label>Temperature: </label><span>${(data.main.temp - 273.15).toFixed()}°C</span></div>
    <div><label>Pressure: </label><span>${data.main.pressure} hPA</span></div>
    <div><label>Humidity: </label><span>${data.main.humidity}%</span></div>
    <br>`;
    }

    async showAllData() {
        this.weatherContinaer.innerHTML = '';
        const cities = this.getData();
        if(cities){
            cities.forEach(element => {
                this.getCityInfo(element, false);
            });
        }
    }

    saveData(city: string) {
        this.cities.push(city);
        localStorage.cities = JSON.stringify(this.cities);
    }

    getData(): string[]{
        const data = localStorage.getItem('cities');
        if (data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    refreshWetherEvery(milsec: number){
        setInterval(()=> {
            console.log('Weather refreshed!');
            this.showAllData();
        }, milsec);
    }
}