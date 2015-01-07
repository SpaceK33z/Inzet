appCtrls.controller('MainCtrl', function($scope, userService, $rootScope, $location, $route, $routeParams, $http, subjectService, teacherService, oerService) {
  $scope.username = userService.getName() || 'Bart';
  $scope.locationPath = $location.path();

  // Change the selected sidebar when the route parameters change.
  $scope.$on('$routeChangeSuccess', function (ev, current, prev) {
    $scope.selectedSidebar = $routeParams.term || false;
    $scope.subjectSlug = $routeParams.subject || false;
    $scope.locationPath = $location.path();
  });

  subjectService.getTerms().then(function(payload) {
    $scope.terms = payload;
  });


  teacherService.getTeachers();

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
      name: $scope.newSubject.name[0],
      description: $scope.newSubject.description,
      hours: $scope.newSubject.hours
    });

    // Empty subject data
    $scope.newSubject = {};

    $scope.showAdd = false;
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

  $scope.removeSubject = function(term, subject) {
    subjectService.deleteSubject(term, subject);
  };

  $scope.subjectConfig = {
    options: oerService.getOers(),
    create: false, // Don't allow to create new tags
    openOnFocus: true,
    selectOnTab: true,
    valueField: 'value',
    labelField: 'value',
    searchField: ['value'],
    maxItems: 1
  };

  if ($rootScope.loginGroup === 'team') {
    $scope.getTerm = function (termSlug) {
      return subjectService.getTerm(termSlug);
    };
  }
});
