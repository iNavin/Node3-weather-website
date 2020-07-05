const request = require('request');

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=5768ab041e20f245a9a39498ea9e2c02&query='+latitude+','+longitude;
 
    request({url, json:true}, (error, {body}) => {
       if(error){
          callback('Unable to connect to the web server',undefined);
       }else if(body.error){
          callback('Unable to get data for the specified location',undefined);
       }else{
          callback(undefined,body.current.weather_descriptions+" .The current temperature is "+body.current.temperature+" But feels like "+body.current.feelslike+"\n the humidity : "+body.current.humidity)
       }
    })
 
 }

 module.exports = forecast;