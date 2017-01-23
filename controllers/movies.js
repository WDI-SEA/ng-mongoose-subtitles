var express = require('express');
var router = express.Router();

var models = require('../models/subtitle');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/subtitles');

// GET /movie/
// returns array of [ {title: ___, id: ___ } ]
router.route('/')
.get(function(req, res) {

  models.Subtitle.find({}, function(err, subtitles) {
    var subtitlesList = [];
    subtitles.forEach(function(subtitle){
      subtitlesList.push({
        title: subtitle.title,
        _id: subtitle._id
      });
    });

    res.send(subtitlesList);

  });

});

// GET /movie/script/:id
// returns object of { title: ___, subtitles: [] }
router.route('/script/:id')
.get(function(req, res) {
  // search by ObjectId
  models.Subtitle.findById(req.params.id, function(err, subtitle) {
    res.send(subtitle);
  });

});

// POST /movie/create/script/:templateId
router.route('/create/script/:templateId')
.post(function(req, res) {
  
});

// PUT /movie/edit/script/:index
router.route('/edit/script/:index')
.put(function(req, res) {

});

module.exports = router;
