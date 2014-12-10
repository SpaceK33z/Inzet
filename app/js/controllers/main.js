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

  $scope.showAdd = false;
  $scope.showEdit = false;

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

  $scope.addForm = function() {
    if ($scope.showAdd === false) {
      $scope.showAdd = true;
      $scope.showEdit = false;
    }
    else {
      $scope.showAdd = false;
    }
  };

  $scope.editForm = function(slug) {
    // Check if the item was already visible
    if ($scope.showEdit === slug) {
      $scope.showEdit = false;
    }
    else {
      $scope.showEdit = slug;
      $scope.showAdd = false;
    }
  };
});
