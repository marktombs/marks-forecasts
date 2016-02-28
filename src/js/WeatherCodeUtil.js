
/**
* Util for mapping weather codes to weather-icons icons
*/

/*

2xx : thunder
3xx : drizzle
5xx : rain
6xx : Snow
701
800 : clear
801,2,3,4 : clouds
90x extreme
903 cold
904 hot
905 windy
906 hail

*/

const _ = require('lodash');

const codeMap = {
  '804' : 'wi-day-cloudy',
  '803' : 'wi-day-cloudy',
  '802' : 'wi-day-cloudy',
  '801' : 'wi-day-cloudy',
  '800' : 'wi-day-sunny',
  '6' : 'wi-snow',
  '5' : 'wi-rain',
  '3' : 'wi-showers',
  '2' : 'wi-storm-showers'
}

module.exports = {

  getWIIcon(c){
    let code = String(c);
    return _.find(codeMap,(val,key) => code.startsWith(key));
  }

};
