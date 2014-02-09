'use strict';

angular.module('jsNoteApp')
    .controller('NavbarCtrl', function ($scope, $location, Auth) {
        $scope.menu = [
            {
                'title': 'Home',
                'link': '/'
            },
            {
                'title': 'Notes',
                'link': '/notes'
            },
            {
                'title': 'Settings',
                'link': '/settings'
            }
        ];

        $scope.logout = function () {
            Auth.logout()
                .then(function () {
                    $location.path('/login');
                });
        };

        $scope.isActive = function (route) {
            return route === $location.path();
        };
      $scope.usrMenu = [ {
        "text": "logout",
        "click": "logout()"
      }];
    });
