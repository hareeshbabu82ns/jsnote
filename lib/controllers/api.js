'use strict';

var mongoose = require('mongoose'),
    Notes = mongoose.model('Notes'),
    Thing = mongoose.model('Thing');

exports.notes = function (req, res) {
  return Notes.find(function (err, notes) {
    if (!err) {
      return res.json(notes);
    } else {
      return res.send(err);
    }
  });
};

/**
 * Get awesome things
 */
exports.awesomeThings = function (req, res) {
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};