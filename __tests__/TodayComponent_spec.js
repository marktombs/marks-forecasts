
jest.dontMock('../src/js/TodayComponent.jsx');
const TodayComponent = require('../src/js/TodayComponent.jsx');

const testUtils = require('react-addons-test-utils');
const React = require('react');
const ReactDOM = require('react-dom');

describe('TodayComponent', function(){

  it('exists',function(){
    expect(TodayComponent).toBeDefined();
  });

  it('renders', function(){
    const props = {};
    var cpnt = testUtils.renderIntoDocument(React.createElement(TodayComponent, props));
    var node = ReactDOM.findDOMNode(cpnt);
    // renders nothing until there is weather data to show
    expect(node).toBeNull();
  });

})
