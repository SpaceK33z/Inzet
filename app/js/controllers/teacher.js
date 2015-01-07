appCtrls.controller('TeacherCtrl', function($scope, $route, $filter, ngTableParams, $http, subjectService, teacherService) {
  teacherService.getTeachers().then(function(payload) {
    console.log(payload);
    $scope.tableParams = new ngTableParams({
      count: payload.length,
      sorting: {
        name: 'asc'
      }
    }, {
      total: payload.length, // length of data
      getData: function($defer, params, $http) {
          var orderedData = params.sorting() ? $filter('orderBy')(payload, params.orderBy()) : payload;

          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });
  });

  $scope.getSubjectsFromTeacher = function (teacherName) {
    return subjectService.getSubjectsFromTeacher(teacherName);
  };

});
