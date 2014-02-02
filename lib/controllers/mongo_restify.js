'use strict';


var mongoose = require('mongoose'),
    notes = mongoose.model('Notes'),
    restify = require('express-restify-mongoose');

module.exports = function (app) {
  restify.defaults({
    version: '' //default is v1
  });
  restify.serve(app, notes, {plural: false});
  console.log('restified');
}