const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');


search.addEventListener('click', () => {
    const APIKey = '7c51cbdf4f1305b7502ef9a57b2b26f0';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;
    // https://api.openweathermap.org/data/2.5/weather?q=poltava&appid=${APIKey}
    // fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${APIKey}`)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
        .then(response => response.json())
        .then(json =>{
            console.log(json);
            if(json.cod == '404'){
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            // ?????
            console.log(json.weather[0].main);
            switch (json.weather[0].main){
                case 'Clear':
                    image.src = 'img/clear.png';
                    console.log('Clear');
                    break;

                case 'Clouds':
                    image.src = 'img/cloud.png';
                    console.log('Cloud');
                    break;

                case 'Mist':
                    image.src = 'img/mist.png';
                    console.log('Mist');
                    break;

                case 'Rain':
                    image.src = 'img/rain.png';
                    console.log('Rain');
                    break;

                case 'Snow':
                    image.src = 'img/snow.png';
                    console.log('Snow');
                    break;
                default:
                    image.src = '';
            }
            // ?????
            temperature.innerHTML = Math.round(parseInt(json.main.temp) - 273.15) + "&#8451";
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px'

        }
    )
})