var app = angular.module('Subtvtle');
app.service('ScriptService', ['$http', function($http) {
  this.getTitles = function() {
    return [
      {id: 0, title: 'Blank'},
      {id: 1, title: 'WDI 11'}
    ];
  };
  
  this.getScript = function(id) {
     return SUBTITLES;
  };
}]);
