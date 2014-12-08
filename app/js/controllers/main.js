appCtrls.controller('MainCtrl', function($scope, userService, $location) {
  $scope.username = userService.getName() || 'Bart';

  $scope.sidebar = function(sidebar) {
    $scope.selectedSidebar = sidebar;
  };
});
