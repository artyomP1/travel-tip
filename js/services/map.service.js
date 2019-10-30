export default {
    initMap,
    addMarker,
    panTo,
    getLocation,

}
console.log('h');


var map;


export function initMap(lat = 32.088019, lng = 34.803166) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');

            map = new google.maps.Map(
                document.querySelector('#map'), {
                    center: { lat, lng },
                    zoom: 15
                })
            console.log('Map!', map);
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
    const API_KEY = 'AIzaSyCvJvR2KyGNx_iVtPGMshqlhHL5ULgtGsI'; //TODO: Enter your API Key
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
    if (!navigator.geolocation) {
        alert("HTML5 Geolocation is not supported in your browser.");
        return;
    }
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
}

function showLocation(position) {
    addMarker({ lat: position.coords.latitude, lng: position.coords.longitude });
    console.log(position.coords.latitude, position.coords.longitude);
    addLocationName(position.coords.latitude, position.coords.longitude);
}

function addLocationName(lat, lng) {
    let urlAddress = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAr1sqzMlxBHmfdTU5Sr3sldPfpHVUU3LI`;
    getAnswer(urlAddress).then(renderAddress)
}

function renderAddress(value) {
    console.log(value.results[0].formatted_address);
    let address = value.results[0].formatted_address
    document.querySelector('.user-location').innerText = address;

}


function getAnswer(url) {
    var prmAns = axios.get(url)
    console.log(prmAns);

    var prm1 = prmAns.then(res => {
        console.log('SERVICE GOT RES:', res.data);
        return res.data;
    })

    // prm1.then(ans => {
    //     console.log('Ans:', ans);
    // })
    // console.log(prm1);

    return Promise.resolve(prm1)
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