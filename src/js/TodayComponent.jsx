/**
* Component for showing the weather as it is right now
*/

const React = require('react');
const ForecastStore = require('./ForecastStore');
const WeatherCodeUtil = require('./WeatherCodeUtil');

const TodayComponent = React.createClass({

  getInitialState() {
    return {}
  },

  componentDidMount() {
    ForecastStore.addChangeListener(this.forecastStoreListener);
  },

  forecastStoreListener() {
    this.setState({weather:ForecastStore.getCurrentWeather()});
  },

  render(){
    if (!this.state.weather) {
      return (null);
    }

    let weather = this.state.weather;

    return (
      <section className='today col-sm-4 clearfix'>
      <div className='box'>
        <h2>Just Nu</h2>
        <div className='today-main'>
          {Math.round(weather.main.temp)}<i className='wi wi-celsius'></i>
          <i className={'wi-main wi ' + WeatherCodeUtil.getWIIcon(weather.weather[0].id)}></i>
          <p className='lead'>{weather.weather[0].description}</p>
        </div>
        <div className='row'>
          <div className='col-sm-6'>
            <p><i className={'wi wi-wind from-'+weather.wind.deg +'-deg'}></i> {weather.wind.speed} m/s</p>
            <p><i className='wi wi-humidity'></i>  {weather.main.humidity}</p>
          </div>
          <div className='col-sm-6'>
            <p><i className='wi wi-barometer'></i> {weather.main.pressure}</p>
            <p><i className='wi wi-cloud'></i> {weather.clouds.all}%</p>
          </div>
        </div>
      </div>
    </section>);
  }

});

module.exports = TodayComponent;
