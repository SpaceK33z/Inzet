appCtrls.controller('SubjectCtrl', function($scope, $route, $filter, ngTableParams, $http, subjectService) {
  var termSlug = $route.current.params.term,
    subjectSlug = $route.current.params.subject;

  $scope.subject = subjectService.getSubject(termSlug, subjectSlug);


  $scope.selectModel = 1;
  $scope.selectOptions = [
    {value: 'php32', text: 'PHP32'},
    {value: 'ptm32', text: 'Programmeren'},
    {value: 'mmd42', text: 'MMD42'}
  ];

  $scope.selectConfig = {
    create: false, // Don't allow to create new tags
    delimiter: '|',
    placeholder: 'Zoek op een vak.',
    openOnFocus: true,
    hideSelected: true,
    selectOnTab: true,
    plugins: ['remove_button']
  };

  $scope.maybeAddTeacher = function(teacher) {
    if ($scope.getTeacher(teacher.name)) {
      // Remove teacher if exists
      $scope.addTeacher(teacher.name);
    }
    else {
      // Add box to check if it isn't an accident or something
      $scope.showConfirm = true;
      $scope.selectedTeacher = teacher;
    }
  };

  $scope.addTeacher = function (teacherName) {
    subjectService.addTeacher(termSlug, subjectSlug, teacherName);
  };

  $scope.getTeacher = function (teacherName) {
    return subjectService.getTeacher(termSlug, subjectSlug, teacherName);
  };

  $http.get('/test-subjects1.json').success(function(data) {
    $scope.tableParams = new ngTableParams({
      count: data.length,
      sorting: {
        name: 'asc'
      }
    }, {
      total: data.length, // length of data
      getData: function($defer, params, $http) {
          var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;

          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });
  });

});
