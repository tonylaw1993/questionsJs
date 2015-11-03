/*global todomvc, angular, Firebase */
'use strict';

todomvc.controller('pollCtrl',
['$scope', '$location', '$firebaseArray', '$sce', '$localStorage', '$window', '$sanitize',
function ($scope, $location, $firebaseArray, $sce, $localStorage, $window, $sanitize) {
    $scope.message = "Hello world!";

}]);
