
const ForecastService = require('./ForecastService');
const Dispatcher = require('./Dispatcher');

const ForecastActions = {

  searchCity(city) {
    ForecastService.getForecastForCity(city)
      .then((response) => {
        Dispatcher.handleServerAction({
          type:'FORECAST_UPDATE',
          forecast:response.body
        })
      })
      .catch(console.error);

  },

  getForecastForPosition(lat,lng) {
    ForecastService.getForecastForPosition(lat,lng)
      .then((response) => {
        Dispatcher.handleServerAction({
          type:'FORECAST_UPDATE',
          forecast:response.body
        })
      });

    // ForecastService.getWeatherForPosition(lat,lng)
    //   .then((response) => {
    //     Dispatcher.handleServerAction({
    //       type:'WEATHER_UPDATE',
    //       weather:response.body
    //     })
    //   });


  }

};

module.exports = ForecastActions;
