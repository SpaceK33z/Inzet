appServices.factory('teacherService', function($http, $q) {
  var teacherData = [];

  var deferred = $q.defer();

  $http.get('/teachers.json').success(function(data) {
    teacherData = data;
    deferred.resolve(data);
  });

  return {
    getTeachers: function() {
      return deferred.promise;
    },
    getTeacher: function(name) {
      var output;

      teacherData.forEach(function(teacher) {
        if (teacher.name === name) {
          output = teacher;
        }
      });

      return output;
    }
  };
});
