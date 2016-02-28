/**
* Stores the current forecast information and state of the city search.
*/

const Dispatcher = require('./Dispatcher');
const EventEmitter = require('events').EventEmitter;
const extend = require('lodash/extend');
const filter = require('lodash/filter');
const CHANGE_EVENT = 'CHANGE_EVENT';

let _currentCity = null;
let _currentForecast = null;
let _currentWeather = null;

function setWeather(weather) {
  _currentWeather = weather;
  _currentCity = weather.name;
};

function setForecast(forecast) {
  _currentForecast = forecast;
  _currentCity = forecast.city.name;
  _currentWeather = forecast.list[0];
  // this forecast has data for every 3 hours. Extract daily values from it.

};

const ForecastStore = extend({},EventEmitter.prototype, {

  getCurrentCity() {
    return _currentCity;
  },

  getCurrentForecast() {
    return _currentForecast;
  },

  getCurrentWeather() {
    return _currentWeather;
  },

  getDailyForecast() {
    return filter(_currentForecast.list,(f) => (new Date(f.dt_txt).getHours() === 0));
  },

  /**
  * Event handling
  */
  addChangeListener(callback) {
      this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
      this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange() {
      this.emit(CHANGE_EVENT);
  },


  /**
  * Listen to dispatcher events
  */
  token: Dispatcher.register(function(payload){
    const action = payload.action;
    switch(action.type) {
      case 'WEATHER_UPDATE':
        setWeather(action.weather);
        ForecastStore.emitChange();
      break;
      case 'FORECAST_UPDATE':
        setForecast(action.forecast);
        ForecastStore.emitChange();
      break;
    }

  })
});

module.exports = ForecastStore;
