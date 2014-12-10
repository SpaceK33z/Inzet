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
    newSubject: function(index, data) {
      var slug = data.name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');

      subjectData[index].subjects.push({
        name: data.name,
        slug: slug,
        description: data.description,
        hours: data.hours
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
    }
  };
});
