/**
* show forecast for the next X days.
*/

const React = require('react');
const ForecastStore = require('./ForecastStore');
const WeatherCodeUtil = require('./WeatherCodeUtil');

const SevenDaysComponent = React.createClass({

  getInitialState() {
    return {}
  },

  componentDidMount() {
    ForecastStore.addChangeListener(this.forecastStoreListener);
  },

  forecastStoreListener() {
    this.setState({forecast:ForecastStore.getDailyForecast()});
  },

  renderWeather(weather,i) {
    let date = new Date(weather.dt_txt);
    let formattedDate = date.getDate() + '/' + date.getMonth();
    return (
      <td key={i}>
        <div>{formattedDate}</div>
        <div>{Math.round(weather.main.temp)}<i className='wi wi-celsius'></i></div>
        <div><i className={'wi-main wi ' + WeatherCodeUtil.getWIIcon(weather.weather[0].id)}></i></div>
        <div><i className={'wi wi-wind from-'+weather.wind.deg +'-deg'}></i></div>
      </td>);
  },

  render(){
    if (!this.state.forecast) {
      return null;
    }

    const weathers = this.state.forecast.map(this.renderWeather);

    return (<section className='seven-days'>
        <div className='box'>
          <h2>Prognos</h2>
          <table>
            <tbody>
              <tr>
             {weathers}
            </tr>
            </tbody>
          </table>
          </div>
      </section>);
  }

});

module.exports = SevenDaysComponent;
