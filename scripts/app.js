const cityForm = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {

    // const cityDets = data.cityDets;
    // const weather = data.weather;

    // destructure properties (properties and constants with same name)
    const { cityDets, weather } = data;

    // update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    // update the day/night & icon images (using TERNARY OPERATOR)
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);


    // remove the d-none class from the card
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

};

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // get city input value
    const city = cityForm.city.value.trim();
    // the name of the input field is "city", and trim() is to clear spaces in the field
    cityForm.reset(); // to clear the fields after submit

    // update the ui with new city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
};