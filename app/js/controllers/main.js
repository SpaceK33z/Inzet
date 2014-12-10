appCtrls.controller('MainCtrl', function($scope, userService, $location, $route, $routeParams, $http, subjectService) {
  $scope.username = userService.getName() || 'Bart';

  // Change the selected sidebar when the route parameters change.
  $scope.$on('$routeChangeSuccess', function (ev, current, prev) {
    $scope.selectedSidebar = $routeParams.term || false;
    $scope.subjectSlug = $routeParams.subject || false;
  });

  subjectService.getTerms().then(function(payload) {
    $scope.terms = payload;
  });

  // Empty subject
  $scope.newSubject = {
    name: null,
    description: null,
    hours: null
  };

  // Add subject to $scope.terms
  $scope.addSubject = function (index) {
    subjectService.newSubject(index, {
      name: $scope.newSubject.name,
      description: $scope.newSubject.description,
      hours: $scope.newSubject.hours
    });

    // Empty subject data
    $scope.newSubject = {};
  };
});
