appCtrls.controller('MainCtrl', function($scope, userService, $location, $route, $routeParams, $http) {
  $scope.username = userService.getName() || 'Bart';

  // Change the selected sidebar when the route parameters change.
  $scope.$on('$routeChangeSuccess', function (ev, current, prev) {
    $scope.selectedSidebar = $routeParams.term || false;
    $scope.subjectSlug = $routeParams.subject || false;
  });

  $http.get('/test-terms.json').success(function(data) {
    $scope.terms = data;
  });

  // Empty subject
  $scope.newSubject = {
    name: null,
    description: null
  };

  // Add subject to $scope.terms
  $scope.addSubject = function (index) {
    var slug = $scope.newSubject.name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');

    $scope.terms[index].subjects.push({
      "name": $scope.newSubject.name,
      "slug": slug,
      "description": $scope.newSubject.description
    });

    // Empty subject data
    $scope.newSubject = {};
  };
});
