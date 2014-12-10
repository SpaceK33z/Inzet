appServices.factory('subjectService', function($http, $q) {
  var subjectData = [];

  var deferred = $q.defer();

  $http.get('/test-terms.json').success(function(data) {
    subjectData = data;
    deferred.resolve(data);
  });

  return {
    getTerms: function () {
      return deferred.promise;
    },
    getTerm: function(termSlug) {
      var output;

      subjectData.forEach(function(term) {
        if (term.slug === termSlug) {
          output = term;
        }
      });

      return output;
    },
    newSubject: function(index, data) {
      var slug = data.name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');

      subjectData[index].subjects.push({
        name: data.name,
        slug: slug,
        description: data.description,
        hours: data.hours,
        teachers: []
      });
    },
    getSubject: function(termSlug, subjectSlug) {
      var output;

      // I <3 some dirty code.
      subjectData.forEach(function(term) {
        if (term.slug === termSlug) {
          term.subjects.forEach(function(subject) {
            if (subject.slug === subjectSlug) {
              output = subject;
            }
          });
        }
      });

      return output;
    },
    deleteSubject: function(termSlug, subject) {
      subjectData.forEach(function(term) {
        if (term.slug === termSlug) {
          var subjectIndex = term.subjects.indexOf(subject);
          term.subjects.splice(subjectIndex, 1);
        }
      });
    },
    addTeacher: function(termSlug, subjectSlug, teacherName) {
      subjectData.forEach(function(term) {
        if (term.slug === termSlug) {
          term.subjects.forEach(function(subject) {
            if (subject.slug === subjectSlug) {
              var teacherIndex = subject.teachers.indexOf(teacherName);

              if (teacherIndex == -1) {
                // Teacher isn't added yet
                subject.teachers.push(teacherName);
              }
              else {
                // Teacher exists, so remove
                subject.teachers.splice(teacherIndex, 1);
              }
            }
          });
        }
      });
    },
    getTeacher: function(termSlug, subjectSlug, teacherName) {
      var output;

      subjectData.forEach(function(term) {
        if (term.slug === termSlug) {
          term.subjects.forEach(function(subject) {
            if (subject.slug === subjectSlug) {
              if (subject.teachers.indexOf(teacherName) > -1) {
                output = true;
              }
              else {
                output = false;
              }
            }
          });
        }
      });

      return output;
    }
  };
});
