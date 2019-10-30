'use strict'

export default {
    getWeather
}

const WEATHER_API = '9059b27d6fe13ef5408f276053fafd87'

function getWeather(lat, lng) {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=${WEATHER_API}`)
        .then(weather => weather.data)
}