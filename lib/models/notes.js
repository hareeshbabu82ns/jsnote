'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Notes Schema
 */
var NotesSchema = new Schema({
  name: String,
  content: String,
  tags: [String]
});

mongoose.model('Notes', NotesSchema);
