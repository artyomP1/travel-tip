export default {
    getLocs: getLocs,
    getPosition: getPosition,
    copyLocation: copyLocation,
    addLocationName
}

var locs = { lat: 11.22, lng: 22.11 }


function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });

}


function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function copyLocation(locs) {
            let lat = locs.latitude;
            let lng = locs.longitude;
            let query = `?lat=${lat}&lng=${lng}`
            let baseURL = new URL('https://artyomp1.github.io/travel-tip/index.html')
            let url = baseURL + query;
            return Promise.resolve(url);
}


function addLocationName(lat, lng) {
    let urlAddress = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAr1sqzMlxBHmfdTU5Sr3sldPfpHVUU3LI`;
    locs.lat = lat
    locs.lng = lng
    return getAnswer(urlAddress)

}

function getAnswer(url) {
    var prmAns = axios.get(url)
    console.log(prmAns);

    var prm1 = prmAns.then(res => {
        console.log('SERVICE GOT RES:', res.data);
        return res.data;
    })

    return Promise.resolve(prm1)

}