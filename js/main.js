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

document.querySelector('.btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    mapService.getLocation()
        .then(pos => {
            mapService.showLocation(pos)
                .then(pos => {
                    console.log(pos.lat);

                    locService.addLocationName(pos.lat, pos.lng).then(renderAddress)

                    weatherService.getWeather(pos.lat, pos.lng)
                })
                // weatherService.getWeather(pos.lat, pos.lng)
                //     .then()
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