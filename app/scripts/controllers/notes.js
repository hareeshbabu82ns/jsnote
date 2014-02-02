'use strict';

angular.module('jsNoteApp')
    .controller('NotesCtrl', ['$scope', 'mongular',
      function ($scope, mongo) {
        $scope.notes = mongo.all('notes').getList().$object;
        $scope.note = {};
        $scope.getNew = function () {
          $scope.note = {};
        };
        $scope.save = function () {
          if (_.isUndefined($scope.note._id)) {
            $scope.notes.post($scope.note) // create
                .then(function (note) {
                  $scope.note = mongo.copy(note);
                  $scope.note.push(note);
                });
          } else
            $scope.note.put() //update
                .then(function () {
                  mongo.localUpdate($scope.notes, $scope.note);
                });
        }
        $scope.delete = function () {
          if ($scope.note) {
            var id = $scope.note._id;
            $scope.note.remove().then(function () {
              mongo.localDelete($scope.notes, id);
              $scope.getNew();
            });
          }
        };
        $scope.show = function (note) {
          $scope.note = mongo.copy(note);
        };
      }]);
