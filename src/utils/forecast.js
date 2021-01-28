const request = require('request')

//Weather Stack API, return forecast for cords
const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=53eaf2ec2c0a84b9b6bd53c81f58e7c1&query=' + latitude + ',' + longitude;

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Cannot connect to weatherstack server!', undefined)
    } else if(body.error){
      callback(body.error.info, undefined);
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        feels_like: body.current.feelslike
      })  
    }
  })
}

module.exports = forecast;