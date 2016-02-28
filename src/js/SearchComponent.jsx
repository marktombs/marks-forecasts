/**
* Component with a search field.
* If the user allows it will use geolocation to find the user and send an action
* to get the weather for the current location.
*/

const React = require('react');
const debounce = require('lodash/debounce');
const ForecastActions = require('./ForecastActions');
const ForecastStore = require('./ForecastStore');


module.exports = React.createClass({

  getInitialState() {
    return {usingGeo:true, placeholder:'Letar efter vädret nära dig...'}
  },

  componentDidMount() {
    ForecastStore.addChangeListener(this.forecastStoreListener);

    if(navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.doSearchWithPosition, this.onGeoError);
    }
    // set focus to the input field
    this.refs.input.focus();
  },

  onGeoError(err) {
    if (err.code === 1) {
      this.setState({usingGeo:false, placeholder:'Sök efter stad'});
    } else {
      console.error('error during geolocation:', err);
    }
  },

  /**
  * when the forecast store emits a change, update the city name in the box
  */
  forecastStoreListener() {
    this.setState({value:ForecastStore.getCurrentCity(), searching:false});
  },

  doSearchWithPosition(position) {
    ForecastActions.getForecastForPosition(position.coords.latitude, position.coords.longitude);
  },

  /**
  * perform the search. debounced to stop it searching on every key press.
  */
  doSearch: debounce((s) => {
    ForecastActions.searchCity(s);
  },700),

  /**
  * If enter more than 2 chars do a search
  */
  onChange(e) {
    this.setState({value:e.target.value});
    if (e.target.value.length > 2) {
      this.setState({searching:true});
      this.doSearch(e.target.value);
    }
  },

  renderSearchIcon() {
    // if searching for a place show a spinner
    if ((this.state.usingGeo && !this.state.value) || this.state.searching) {
      return (<i className='fa fa-sun-o fa-spin'></i>);
    }
    // if found a place with geolocation show the arrow
    if (this.state.usingGeo && this.state.value) {
      return (<i className='fa fa-location-arrow'></i>);
    }
    // otherwise no icon
  },
  render() {
    return (
      <div className='city-search'>
        <input ref='input' className='form-control' focus type='search' onChange={this.onChange} value={this.state.value} placeholder={this.state.placeholder}/>
        {this.renderSearchIcon()}
      </div>);
  }

});
