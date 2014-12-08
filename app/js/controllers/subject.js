appCtrls.controller('SubjectCtrl', function($scope, $route) {
    $scope.name = $route.current.params.query;
});
