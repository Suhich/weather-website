const request = require('request')

//Mapbox geocode API, finding most relevant address and return cords
const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWlhbnN1IiwiYSI6ImNraTh4b2tyajBhNWMyemxiYmFiMTltMWoifQ.sv6U2ct7hr-bqvdGvbwe8Q&limit=1';

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Cannot connect to cords server!', undefined)
    } else if(!body.features.length){
      callback('Nothing was found...', undefined);
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0]
      })  
    }
  })
}

module.exports = geocode;