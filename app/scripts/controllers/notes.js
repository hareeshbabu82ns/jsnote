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
        $scope.tinymceOpts = {
          //selector: "textarea",
          plugins: [
            "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak spellchecker",
            "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
            "table contextmenu directionality emoticons template textcolor paste fullpage textcolor"
          ],

          toolbar1: "newdocument fullpage | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
          toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code | inserttime preview | forecolor backcolor",
          toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | spellchecker | visualchars visualblocks nonbreaking template pagebreak restoredraft",

          menubar: false,
          toolbar_items_size: 'small'
        };
      }]);
