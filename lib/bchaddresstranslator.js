var Fcash_ = {
  btc: require('fcash-lib')
};

var _ = require('lodash');

function BCHAddressTranslator() {
};


BCHAddressTranslator.getAddressCoin = function(address) {
  try {
    new Fcash_['btc'].Address(address);
    return 'legacy';
  } catch (e) {
    try {
      var a= new Fcash_['bch'].Address(address);
      if (a.toString() == address) return 'copay';
      return 'cashaddr';
    } catch (e) {
      return;
    }
  }
};


// Supports 3 formats:  legacy (1xxx, mxxxx); Copay: (Cxxx, Hxxx), Cashaddr(qxxx);
BCHAddressTranslator.translate = function(addresses, to, from) {
  var wasArray = true;
  if (!_.isArray(addresses)) {
    wasArray = false;
    addresses = [addresses];
  }


  from = from || BCHAddressTranslator.getAddressCoin(addresses[0]);
  if (from == to) return addresses;
  var ret =  _.map(addresses, function(x) {

    var fcash = Fcash_[from == 'legacy' ? 'btc' : 'bch'];
    var orig = new fcash.Address(x).toObject();

    if (to == 'cashaddr') {
      return Fcash_['bch'].Address.fromObject(orig).toCashAddress(true);
    } else if (to == 'copay') {
      return Fcash_['bch'].Address.fromObject(orig).toString();
    } else if (to == 'legacy') {
      return Fcash_['btc'].Address.fromObject(orig).toString();
    }
  });

  if (wasArray) 
    return ret;
  else 
    return ret[0];

};


module.exports = BCHAddressTranslator;
