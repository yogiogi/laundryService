export const getLocInfo = (lat, long, APIkey) => {
    return fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + myLat + ',' + myLon + '&key=' + myApiKey)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
            JSON.stringify(responseJson);
        })
}