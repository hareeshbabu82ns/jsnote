'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Notes = mongoose.model('Notes');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
Notes.findOne(function (err, one) {
  if (one)
    return;
  Notes.create({
        name: 'NodeJS',
        content: 'javascript Non-Blocking Server',
        tags: ['nodejs', 'javascript', 'html']
      }, {
        name: 'Bower',
        content: 'client package manager for nodejs',
        tags: ['nodejs', 'package mgr', 'javascript']
      }, {
        name: 'NPM',
        content: 'server package manager for nodejs',
        tags: ['nodejs', 'package mgr', 'javascript']
      }, {
        name: 'Bootstrap',
        content: 'html styles boilerplate',
        tags: ['html', 'javascript']
      }, function () {
        console.log('finished populating Notes');
      }
  );
});

// Clear old users, then add a default user
User.findOne(function (err, user) {
  if (user)
    return;
  User.create({
        provider: 'local',
        name: 'Hareesh',
        email: 'h@g.com',
        password: 'test'
      }, function () {
        console.log('finished populating users');
      }
  );
});
