$(document).ready(function() {
  if (localStorage.time !== undefined) {
    var movie = $("video")[0];
    movie.currentTime = localStorage.time;
  }
  setInterval(printTime, 100);
});

function printTime() {
  var movie = $("video")[0];
  var time = movie.currentTime;
  $("#time").text(time);

  localStorage.time = time;

  displaySubtitle(time);
}

function displaySubtitle(time) {
  var subtitle = findSubtitle(time);
  $("#line1").text(subtitle.line1);
  $("#line2").text(subtitle.line2);
}

function findSubtitle(time) {
  for (var i = 0; i < SUBTITLES.length; i++) {
    var subtitle = SUBTITLES[i];
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

$("#edit-video").click(function() {
  alert("holla");
});