appCtrls.controller('DashboardCtrl', function($scope, userService, $filter, $location, ngTableParams, $http, subjectService) {
  $scope.terms = subjectService.getTermsRealtime();

  $scope.tableParams = function (termSlug) {
    var subjectData = subjectService.getTerm(termSlug).subjects;
    return new ngTableParams({
      count: subjectData.length,
      sorting: {
        name: 'asc'
      }
    }, {
      total: subjectData.length, // length of data
      getData: function($defer, params) {
        var orderedData = params.sorting() ? $filter('orderBy')(subjectData, params.orderBy()) : subjectData;

        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });
  };

  // No teacher in subjects or teachers without hours
  $scope.checkZero = function (subject) {
    var output = false;

    if (!subject.teachers.length) {
      output = true;
    }
    else {
      subject.teachers.forEach(function(teacher) {
        if (teacher.hours === 0) {
          output = true;
        }
      });
    }

    return output;
  };
});
