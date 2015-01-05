appCtrls.controller('SubjectCtrl', function($scope, $route, $filter, ngTableParams, $http, subjectService, teacherService) {
  var termSlug = $route.current.params.term,
    subjectSlug = $route.current.params.subject;

  $scope.subject = subjectService.getSubject(termSlug, subjectSlug);
  $scope.term = subjectService.getTerm(termSlug);

  $scope.selectModel = 1;
  $scope.selectOptions = [
    {value: 'php32', text: 'PHP32'},
    {value: 'ptm32', text: 'Programmeren'},
    {value: 'mmd42', text: 'MMD42'}
  ];

  $scope.selectConfig = {
    create: false, // Don't allow to create new tags
    delimiter: '|',
    placeholder: 'Zoeken…',
    openOnFocus: true,
    hideSelected: true,
    selectOnTab: true,
    plugins: ['remove_button']
  };

  $scope.addTeacher = function (teacherName) {
    subjectService.addTeacher(termSlug, subjectSlug, teacherName);
  };

  $scope.getTeacher = function (teacherName) {
    return subjectService.getTeacher(termSlug, subjectSlug, teacherName);
  };

  teacherService.getTeachers().then(function(payload) {
    $scope.tableParams = new ngTableParams({
      count: payload.length,
      sorting: {
        name: 'asc'
      }
    }, {
      total: payload.length, // length of data
      getData: function($defer, params, $http) {
          var orderedData = params.sorting() ? $filter('orderBy')(payload, params.orderBy()) : payload;

          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });
  });

  $scope.getTotalHours = function () {
    return subjectService.getSubjectHours(termSlug, subjectSlug);
  };

  $scope.getTermHoursRemaining = function () {
    return subjectService.getTermHoursRemaining(termSlug);
  };

  $scope.getFreeHours = function (teacherName) {
    return teacherService.getFreeHours(teacherName);
  };

  $scope.getHoursOfSubject = function (subjectSlugje) {
    return subjectService.getSubjectHours(termSlug, subjectSlugje);
  };

});
