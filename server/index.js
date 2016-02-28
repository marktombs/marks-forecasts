
console.log('loading city list');
const citylist = require('./cities.json');
const _ = require('lodash');

module.exports = function(app) {
  var apiPrefix = '/api';

  app.get('/cities', function(req,res){
    var qry = req.params.q;
    return citylist.filter((city) => (city.name.startsWith(qry)));
  });

};
