/**
* does the communication with the api
*/

const request = require('superagent-bluebird-promise');

const apiKey = '66b363b3d07064ff1cf6656399949a1e';
const rootUrl = 'http://api.openweathermap.org/data/2.5';

const ForecastService = {

  getForecastForCity(s) {
    return request.get(rootUrl + '/forecast')
      .query({q:s})
      .query({APPID:apiKey})
      .query({lang:'sv'})
      .query({units:'metric'});

  },

  getWeatherForPosition(lat,lng) {
    return request.get(rootUrl + '/weather')
      .query({APPID:apiKey})
      .query({lang:'sv'})
      .query({units:'metric'})
      .query({lat:lat})
      .query({lon:lng});

  },

  getForecastForPosition(lat,lng) {
    return request.get(rootUrl + '/forecast')
      .query({APPID:apiKey})
      .query({lang:'sv'})
      .query({units:'metric'})
      .query({lat:lat})
      .query({lon:lng});
  }


};

module.exports = ForecastService;
