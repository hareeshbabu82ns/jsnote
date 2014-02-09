'use strict';

angular.module('jsNoteApp')
    .controller('MainCtrl', function ($scope, $http) {
      $scope.usrMenu = [ {
        "text": "Another action",
        "href": "#anotherAction"
      }];
    });
