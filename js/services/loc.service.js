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
    getLocs()
        .then(locs => {
           let lat = locs[0].lat;
           let lng = locs[0].lng;
           let query = `?lat=${lat}&lng=${lng}`
           return query
        })
        .then(query=>{
            // console.log(query)
            let baseURL = new URL('https://artyomp1.github.io/travel-tip/index.html')
            let url = baseURL + query;
            return Promise.resolve(url);
        })
    // var searchParams = new URLSearchParams(paramsString);
    // console.log(paramString);
    // Should looke like that - 
    // github.io/travelTip/index.html?lat=3.14&lng=1.63
}


