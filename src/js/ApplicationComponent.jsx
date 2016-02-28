
const React = require('react');
const SearchComponent = require('./SearchComponent.jsx');
const TodayComponent = require('./TodayComponent.jsx');
const SevenDaysComponent = require('./SevenDaysComponent.jsx');
const ForecastChartComponent = require('./ForecastChartComponent.jsx');

module.exports = React.createClass({
  render(){
    return (
    <section className='container'>
      <h1><i className='wi wi-umbrella'></i> Mark's Forecasts</h1>
      <SearchComponent />
      <div className='row'>
      <TodayComponent />
      <div className='col-sm-8'>
        <SevenDaysComponent />
        <ForecastChartComponent />
      </div>
      </div>
      <div>
      </div>
    </section>
  )
  }
})
