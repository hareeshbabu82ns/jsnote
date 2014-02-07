'use strict';

angular.module('jsNoteApp')
    .controller('NotesDetailCtrl',
    function ($route, $routeParams, $scope, mongular, $location) {
      $scope.note = {};
      if ($routeParams.id && $routeParams.id != 0) {
        mongular.one('notes', $routeParams.id).get().then(function (res) {
          $scope.note = res;
        });
      }
      $scope.save = function () {
        if (_.isUndefined($scope.note._id)) {
          mongular.all('notes').post($scope.note) // create
              .then(function (note) {
                //$scope.note = mongo.copy(note);
                removeTinyMCE('content');
                $location.path('notes/' + note._id);
              });
        } else
          $scope.note.put() //update
              .then(function () {
                //mongo.localUpdate($scope.notes, $scope.note);
              });
      }
      $scope.delete = function () {
        if ($scope.note) {
          $scope.note.remove().then(function () {
            removeTinyMCE('content');
            $location.path('notes');
          });
        }
      };
      $scope.cancel = function () {
        removeTinyMCE('content');
        $location.path('notes');
      }
      var removeTinyMCE = function (id) {
        tinyMCE.get(id).remove();
      };
      $scope.tinymceOpts = {
        //selector: "textarea",
        plugins: [
          "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak spellchecker",
          "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
          "table contextmenu directionality emoticons template textcolor paste fullpage textcolor"
        ],

        toolbar1: "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
        toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code | inserttime preview | forecolor backcolor",
        toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | spellchecker | visualchars visualblocks nonbreaking template pagebreak restoredraft",

        menubar: false,
        toolbar_items_size: 'small'
      };

      $scope.tagOpts = {
        multiple: true,
        simple_tags: true,
        tags: [],
        tokenSeparators: [",", " "]
      };

    })
    .controller('NotesCtrl', ['$scope', 'mongular', 'ngTableParams', '$filter',
      '$route', '$routeParams', '$location',
      function ($scope, mongo, ngTableParams, $filter, $route, $routeParams, $location) {
        mongo.all('notes').getList().then(function (notes) {
          $scope.notes = notes;
          $scope.noteTabOpts.reload();
        });
        $scope.notes = [];
        $scope.note = {};
        $scope.getNew = function () {
          $scope.note = {};
          $location.path('notes/' + 0);
        };
        $scope.save = function () {
          if (_.isUndefined($scope.note._id)) {
            $scope.notes.post($scope.note) // create
                .then(function (note) {
                  $scope.note = mongo.copy(note);
                  $scope.notes.push(note);
                  $scope.noteTabOpts.reload();
                });
          } else
            $scope.note.put() //update
                .then(function () {
                  mongo.localUpdate($scope.notes, $scope.note);
                  $scope.noteTabOpts.reload();
                });
        };
        $scope.delete = function (note) {
          if (note)
            $scope.note = note;
          if ($scope.note) {
            var id = $scope.note._id;
            $scope.note.remove().then(function () {
              mongo.localDelete($scope.notes, id);
              $scope.getNew();
              $scope.noteTabOpts.reload();
              $location.path('notes');
            });
          }
        };
        $scope.noteShowModel = {};
        $scope.show = function (note) {
          $scope.noteShowModel.title = note.name;
          $scope.noteShowModel.content = note.content;
        };
        $scope.edit = function (note) {
          $scope.note = mongo.copy(note);
          $location.path('notes/' + note._id);
        };
        $scope.search = function () {
          var p = [
            {name: "~" + $scope.searchStr},
            {tags: "~" + $scope.searchStr},
            {content: "~" + $scope.searchStr}
          ];
          $scope.notes.getList({$or: JSON.stringify(p)}).then(function (res) {
            $scope.notes = res;
            $scope.noteTabOpts.reload();
          });
        };
        $scope.searchStr = "";
        $scope.noteTabOpts = new ngTableParams({
          page: 1,
          count: 15,
          sorting: {
            name: 'asc'
          }
        }, {
          counts: [],
          total: $scope.notes.length,
          getData: function ($defer, params) {
            params.total($scope.notes.length);
            var orderedData = params.sorting() ?
                $filter('orderBy')($scope.notes, params.orderBy())
                : $scope.notes;
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(),
                params.page() * params.count()));
          },
          $scope: { $data: {}}
        });
      }]);
