appCtrls.controller('TermCtrl', function($scope, $route, $filter, ngTableParams, $http, subjectService, teacherService) {
  var termSlug = $route.current.params.term;

  $scope.term = termSlug;

  $scope.getTeacher = function(name) {
    return teacherService.getTeacher(name);
  };

  $scope.selectModel = 1;
  $scope.selectOptions = [
    {value: 'php32', text: 'PHP32'},
    {value: 'ptm32', text: 'Programmeren'},
    {value: 'mmd42', text: 'MMD42'}
  ];

  $scope.selectConfig = {
    create: false, // Don't allow to create new tags
    delimiter: '|',
    placeholder: 'Zoeken',
    openOnFocus: true,
    hideSelected: true,
    selectOnTab: true,
    plugins: ['remove_button']
  };

  var subjectData = subjectService.getTerm(termSlug).subjects;

  $scope.tableParams = new ngTableParams({
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
});
