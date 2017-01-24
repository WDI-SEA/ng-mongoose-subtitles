angular.module('App')
.component('videoComp', {
  templateUrl: 'app/components/video/video.html',
  controller: VideoCompCtrl,
  controllerAs: 'videoComp'
});

function VideoCompCtrl($element, $interval, $state, $stateParams, ScriptService){
  var videoComp = this;

  videoComp.editing = $state.current.name === "editState";

  // GET THE SUBTITLES
  videoComp.script = [];
  ScriptService.getScript($stateParams.id).then(function(script) {
    videoComp.script = script;
  });

  // GET THE MOVIE
  var video = $element.find('video')[0];

  // SET INTERVAL FOR TIME
  $interval(displaySubtitle, 100);

  videoComp.currentTime = 0;
  videoComp.subtitle = {};

  videoComp.save = function() {
    ScriptService.editScript(videoComp.script);
  };

  videoComp.saveAs = function() {
    ScriptService.newScript(videoComp.script);
  };

  function displaySubtitle() {
    videoComp.currentTime = video.currentTime;
    videoComp.subtitle = findSubtitle(videoComp.currentTime);
  }

  function findSubtitle(time) {
    for (var i = 0; i < videoComp.script.subtitles.length; i++) {
      var subtitle = videoComp.script.subtitles[i];
      if (isTimeInDuration(time, subtitle)) {
        return subtitle;
      }
    }

    // If no subtitle is found then return a dummy
    // empty subtitle that won't break out app.
    return {
      line1: "",
      line2: "",
    };
  }

  function isTimeInDuration(time, subtitle) {
    var duration = subtitle.duration;
    var timestamps = duration.split(" --> ");
    // duration: "00:00:00,380 --> 00:00:01,940",
    var start = timestamps[0];
    var end = timestamps[1];

    start = timestampsToSeconds(start);
    end = timestampsToSeconds(end);

    return start < time && time < end;
  }

  function timestampsToSeconds(timestamp) {
    var mm = parseInt(timestamp.split(",")[1], 10);
    var units = timestamp.split(",")[0].split(":");

    var hours = parseInt(units[0], 10);
    var minutes = parseInt(units[1], 10);
    var seconds = parseInt(units[2], 10);

    return mm / 1000 + seconds + minutes * 60 + hours * 3600;
  }



}

VideoCompCtrl.$inject = ['$element', '$interval', '$state', '$stateParams', 'ScriptService'];
