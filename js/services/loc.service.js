export default {
    getLocs: getLocs,
    getPosition: getPosition,
    copyLocation: copyLocation,
}

var locs = [{ lat: 11.22, lng: 22.11 }]


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

function copyLocation() {
    return getLocs()
        .then(locs => {
            let lat = locs[0].lat;
            let lng = locs[0].lng;
            let query = `?lat=${lat}&lng=${lng}`
            let baseURL = new URL('https://artyomp1.github.io/travel-tip/index.html')
            let url = baseURL + query;
            return Promise.resolve(url);
        })
}


