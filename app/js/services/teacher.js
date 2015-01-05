appServices.factory('teacherService', function($http, $q, subjectService) {
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
    },
    getFreeHours: function(teacherName) {
      var output = 0;

      teacherData.forEach(function(teacher) {
        if (teacher.name === teacherName) {
          output = teacher.max_hours;
        }
      });

      var terms = subjectService.getTermsRealtime();
      terms.forEach(function(term) {
        term.subjects.forEach(function(subject) {
          subject.teachers.forEach(function(teacher) {
            if (teacher.name === teacherName) {
              output -= teacher.hours;
            }
          });
        });
      });

      return output;
    }
  };
});
