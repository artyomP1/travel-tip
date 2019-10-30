import locService from './services/loc.service.js'
import mapService from './services/map.service.js'
import weatherService from './services/weather-service.js'
// import getPosition from './services/map.service.js'

locService.getLocs()
    .then(locs => console.log('locs', locs))



window.onload = () => {
    mapService.initMap()
        .then(() => {
            mapService.addMarker({ lat: 32.088019, lng: 34.803166 });
        })
        .catch(console.log('INIT MAP ERROR'));


    locService.getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

document.querySelector('.btn-find-location').addEventListener('click', () => {
    const address = document.querySelector('.address-lookup').value
    let coordinates = locService.getLocationGeocode(address.split(' '))
        coordinates.then(coords => renderCoordinates(coords.results[0].geometry.location))
})


document.querySelector('.btn').addEventListener('click', () => {
    mapService.getLocation()
        .then(pos => {
            mapService.showLocation(pos)
                .then(pos => weatherService.getWeather(pos.lat, pos.lng))
                .then(data => renderWeatherInfo(data))
            locService.addLocationName(pos.coords.latitude, pos.coords.longitude).then(renderAddress)
        })

})

document.querySelector('.btn-copy-loc').onclick = () => {
    locService.copyLocation()
        .then(url => { onCopyLocation(url) })
}

function renderAddress(value) {
    let address = value.results[0].formatted_address
    document.querySelector('.user-location').innerText = address;
}

function onCopyLocation(url) {
    const el = document.createElement('textarea');
    el.value = url;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

function renderWeatherInfo(data) {
    document.querySelector('.weather-window').innerHTML = `<h3>Today's Weather</h3>
    <span>${data.name}, ${data.sys.country}</span>
    <img src="https://image.flaticon.com/icons/svg/1087/1087295.svg" alt="" class="weather-img">
    <span>${data.weather[0].description}</span>
    <span>Now ${data.main.temp}℃</span>
    <span>Humidity: ${data.main.humidity}%</span>
    <span>Wind </span>
    <span>Max ${data.main.temp_max} ℃ Min ${data.main.temp_min} ℃</span>`
}

function renderCoordinates({lat, lng}){
    const coordinates = `latitude: ${lat}, 'longitude: ${lng}`
    document.querySelector('.coordinates').innerText = coordinates
}