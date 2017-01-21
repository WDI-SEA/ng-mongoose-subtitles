var app = angular.module('Subtvtle');
app.controller('VideoCtrl', ['$scope', '$element', '$interval', 'ScriptService',
    function($scope, $element, $interval, ScriptService) {
  
  // save a reference to the video element.
  var video = $element.find('video')[0];
  var script = ScriptService.getScript(0);
  
  // start the currentTime at zero.
  $scope.currentTime = 0;
  
  // constantly poll the video for it's current time.
  $interval(displaySubtitle, 100);
  
  function displaySubtitle(time) {
    $scope.currentTime = video.currentTime;
    $scope.subtitle = findSubtitle($scope.currentTime);
  }

  function findSubtitle(time) {
    for (var i = 0; i < script.length; i++) {
      var subtitle = script[i];
      if (isTimeInDuration(time, subtitle)) {
        return subtitle;
      }
    }

    // If no subtitle is found then return a dummy
    // empty subtitle that won't break out app.
    return {
      line1: "",
      line2: "",
    }
  }

  function isTimeInDuration(time, subtitle) {
    var duration = subtitle.duration;
    var timestamps = duration.split(" --> ");
    // duration: "00:00:00,380 --> 00:00:01,940",
    var start = timestamps[0];
    var end = timestamps[1];

    start = timestampsToSeconds(start);
    end = timestampsToSeconds(end);

    var isInDuration = start < time && time < end;
    return isInDuration;
  }

  function timestampsToSeconds(timestamp) {
    var mm = parseInt(timestamp.split(",")[1], 10);
    var units = timestamp.split(",")[0].split(":");

    var hours = parseInt(units[0], 10);
    var minutes = parseInt(units[1], 10);
    var seconds = parseInt(units[2], 10);

    return mm / 1000 + seconds + minutes * 60 + hours * 3600;
  }
}]);
