appServices.factory('oerService', function($http, $q) {
  var oerData = [{
    value: "PHP32"
  }, {
    value: "MMD32"
  }, {
    value: "IMS42"
  }, {
    value: "WD42"
  }];

  return {
    getOers: function () {
      return oerData;
    }
  };
});
