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
        //    console.log(typeof locs);
        //    console.log(typeof locs[0].lat);
           console.log(locs[0].lat);
           console.log(locs[0].lng);
           
        })
}


