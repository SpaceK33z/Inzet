appCtrls.controller('DashboardCtrl', function($scope, $rootScope, userService, $filter, $location, ngTableParams, $http, subjectService, teacherService) {
  $scope.terms = subjectService.getTermsRealtime();

  // TEAMLEIDER
  if ($rootScope.loginGroup === 'team') {
    $scope.tableParams = function () {
      var termData = subjectService.getTermsRealtime();
      return new ngTableParams({
        count: termData.length,
        sorting: {
          name: 'asc'
        }
      }, {
        total: termData.length, // length of data
        getData: function($defer, params) {
          var orderedData = params.sorting() ? $filter('orderBy')(termData, params.orderBy()) : termData;

          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
      });
    };


  }

  // SHARED SCOPES
  $scope.getTermHoursRemaining = function (termSlug) {
    return subjectService.getTermHoursRemaining(termSlug);
  };

  $scope.getHoursOfSubject = function (termSlug, subjectSlug) {
    return subjectService.getSubjectHours(termSlug, subjectSlug);
  };

  // BLOKEIGENAAR
  if ($rootScope.loginGroup === 'blok') {

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

    $scope.getFreeTeacherHours = function (teacherName) {
      return teacherService.getFreeHours(teacherName);
    };

  }
});
