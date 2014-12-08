appServices.factory('userService', function() {
  var userData = {
    name: null
  };

  return {
    getName: function() {
      return userData.name;
    },
    setName: function(name) {
      userData.name = name;
    }
  };
});
