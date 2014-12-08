appCtrls.controller('MainCtrl', function($scope, userService, $location, $route, $routeParams) {
  $scope.username = userService.getName() || 'Bart';

  // Change the selected sidebar when the route parameters change.
  $scope.$on('$routeChangeSuccess', function (ev, current, prev) {
    $scope.selectedSidebar = $routeParams.term || false;
  });
});
