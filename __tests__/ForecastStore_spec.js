
jest.dontMock('../src/js/ForecastStore');

describe('LanguageStore', function () {

  let ForecastStore, dispatcher, callback;

  beforeEach(function () {
    dispatcher = require('../src/js/Dispatcher');
    ForecastStore = require('../src/js/ForecastStore');
    callback = dispatcher.register.mock.calls[0][0];
    spyOn(ForecastStore, 'emitChange');
  })

  it('exists', function () {
    expect(ForecastStore).toBeDefined();
  });

  it('registers a listener with the dispatcher', function () {
    expect(dispatcher.register.mock.calls.length).toBe(1);
  });


  it('updates forecast', function () {

    let mockForecast = {
      list:[],
      city:{name:'marktown'}
    };
    
    expect(ForecastStore.getCurrentForecast()).toBeNull();

    callback({
      source: 'SERVER_ACTION',
      action: {
        type: 'FORECAST_UPDATE',
        forecast : mockForecast
      }
    });

    expect(ForecastStore.emitChange).toHaveBeenCalled();
    expect(ForecastStore.getCurrentForecast()).toBe(mockForecast);
    expect(ForecastStore.getCurrentCity()).toBe('marktown');

  });

})
