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
              var found = false;

              for (var i = 0; i < subject.teachers.length; i++) {
                if (subject.teachers[i].name === teacherName) {
                  found = true;
                  subject.teachers.splice(i, 1);
                }
              }

              if (!found) {
                // Teacher isn't added yet
                subject.teachers.push({
                  name: teacherName,
                  hours: 0
                });
              }
            }
          });
        }
      });

    },
    getTeacher: function(termSlug, subjectSlug, teacherName, booltje) {
      booltje = booltje || false;
      var output;

      subjectData.forEach(function(term) {
        if (term.slug === termSlug) {
          term.subjects.forEach(function(subject) {
            if (subject.slug === subjectSlug) {
              subject.teachers.forEach(function(teacher) {
                if (teacher.name.indexOf(teacherName) > -1) {
                  if (booltje) {
                    output = true;
                  }
                  else {
                    output = teacher;
                  }
                }
                else {
                  output = false;
                }
              });
            }
          });
        }
      });

      return output;
    },
    getSubjectHours: function(termSlug, subjectSlug) {
      var output = 0;

      subjectData.forEach(function(term) {
        if (term.slug === termSlug) {
          term.subjects.forEach(function(subject) {
            if (subject.slug === subjectSlug) {
              subject.teachers.forEach(function(teacher) {
                output += teacher.hours;
              });
            }
          });
        }
      });

      return output;
    },
    getTermHoursRemaining: function(termSlug) {
      var output = 0;

      subjectData.forEach(function(term) {
        if (term.slug === termSlug) {
          output = term.hours;

          term.subjects.forEach(function(subject) {
            subject.teachers.forEach(function(teacher) {
              output -= teacher.hours;
            });
          });
        }
      });

      return output;
    }
  };
});
