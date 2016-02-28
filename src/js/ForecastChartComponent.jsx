/**
* Draw graphs showing temperature, humidity, wind speed, and pressure.
*/

const React = require('react');
const ForecastStore = require('./ForecastStore');
const WeatherCodeUtil = require('./WeatherCodeUtil');
const LineChart = require('react-chartjs').Line;

const ForecastChartComponent = React.createClass({

  getInitialState() {
    return {}
  },

  componentDidMount() {
    ForecastStore.addChangeListener(this.forecastStoreListener);
  },

  forecastStoreListener() {
    this.setState({forecast:ForecastStore.getCurrentForecast()});
  },

  getTempData() {
    return this.state.forecast.list.map((item) => item.main.temp);
  },
  getHumidityData() {
    return this.state.forecast.list.map((item) => item.main.humidity);
  },
  getWindData() {
    return this.state.forecast.list.map((item) => item.wind.speed);
  },
  getPressureData() {
    return this.state.forecast.list.map((item) => item.main.pressure);
  },

  formatTime(dt_txt) {
    let date = new Date(dt_txt);
    return date.getHours() + ':' + date.getMinutes();
  },

  getLabels() {
    return this.state.forecast.list.map((item) => this.formatTime(item.dt_txt) );
  },


  render() {
      if (!this.state.forecast) {
        return null;
      }

      let chartOptions = {
        datasetFill:false,
        pointDot:false
      };

    return (
      <div className='box'>
        <h3>Temperatur</h3>
        <LineChart data={{labels:this.getLabels(),datasets:[{label:'temperature',strokeColor:'#a5dff9',fillColor:'transparent', data:this.getTempData()}]}} options={chartOptions} width="720" height="200" />
        <h3>Humidity</h3>
        <LineChart data={{labels:this.getLabels(),datasets:[{label:'humidity',strokeColor:'#ef5285', fillColor:'transparent', data:this.getHumidityData()}]}} options={chartOptions} width="720" height="200" />
        <h3>Wind</h3>
        <LineChart data={{labels:this.getLabels(),datasets:[{label:'wind',strokeColor:'#60c5ba',fillColor:'transparent', data:this.getWindData()}]}} options={chartOptions} width="720" height="200" />
        <h3>Lufttryck</h3>
        <LineChart data={{labels:this.getLabels(),datasets:[{label:'pressure',strokeColor:'#feee7d', fillColor:'transparent', data:this.getPressureData()}]}} options={chartOptions} width="720" height="200" />
      </div>
    )
  }


});

module.exports = ForecastChartComponent;
