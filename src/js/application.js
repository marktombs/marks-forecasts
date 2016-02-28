
console.info('starting...');

// bundle styles
require('../style/forecast.less');
require('font-awesome/less/font-awesome.less');
require('../style/weather-icons-master/less/weather-icons.less');
require('../style/weather-icons-master/less/weather-icons-wind.less');

const React = require('react');
const ReactDom = require('react-dom');
const Application = require('./ApplicationComponent.jsx');

ReactDom.render(React.createElement(Application), document.getElementById('main'));
