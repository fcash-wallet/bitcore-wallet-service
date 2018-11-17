var _ = require('lodash');

var provider = {
  name: 'Fcash',
  url: 'https://fcash.cash/api/rates/',
  parseFn: function(raw) {
    var rates = _.compact(_.map(raw, function(d) {
      if (!d.code || !d.rate) return null;
      return {
        code: d.code,
        value: d.rate,
      };
    }));
    return rates;
  },
};

module.exports = provider;
