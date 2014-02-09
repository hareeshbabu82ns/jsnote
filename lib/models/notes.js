'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Notes Schema
 */
var NotesSchema = new Schema({
  name: String,
  content: String,
  tags: [String],
  modified: {type: Date, default: Date.now}
});

mongoose.model('Notes', NotesSchema);
