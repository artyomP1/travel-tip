export default {
    initMap,
    addMarker,
    panTo,
    getLocation,
    showLocation
}
var map;


export function initMap(lat = 32.088019, lng = 34.803166) {
    return _connectGoogleApi()
        .then(() => {

            map = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    map.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyCvJvR2KyGNx_iVtPGMshqlhHL5ULgtGsI';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

export function getLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            alert("HTML5 Geolocation is not supported in your browser.");
        }
        navigator.geolocation.getCurrentPosition(resolve, handleLocationError)

    })

}

function showLocation(position) {
    return new Promise((resolve, reject) => {
        addMarker({ lat: position.coords.latitude, lng: position.coords.longitude });
        panTo(position.coords.latitude, position.coords.longitude)
        const latLng = { lat: position.coords.latitude, lng: position.coords.longitude }
        console.log(latLng)
        resolve(latLng)
    })
}

function handleLocationError(error) {
    var locationError = document.getElementById("locationError");

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
            break;
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
            break;
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
            break;
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location.";
            break;
    }
}