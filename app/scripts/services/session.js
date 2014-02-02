'use strict';

angular.module('jsNoteApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
