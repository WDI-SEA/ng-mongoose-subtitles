var app = angular.module('Subtvtle');
app.controller('VideoCtrl', ['$scope', 'ScriptService',
    function($scope, ScriptService) {
  $scope.script = ScriptService.getScript(0);
  console.log($scope.script);
}]);
