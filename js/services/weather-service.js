'use strict'

export default {
    getWeather
}

const WEATHER_URL = 'api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&APPID=';
const WEATHER_API = '9059b27d6fe13ef5408f276053fafd87'

function getWeather(city, country) {
    return axios.get(`api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID= + ${WEATHER_API}`)
        .then(res => console.log(res))
}