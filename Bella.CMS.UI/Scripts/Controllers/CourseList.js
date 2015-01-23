'use strict';

/* App Module */

var courseListApp = angular.module('app', [
  'ngRoute',
  'ui.bootstrap',
  'courseListControllers'
]);

courseListApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/list', {
            templateUrl: '/Templates/CourseList/list.html',
            controller: 'CourseListCtrl'
        }).
        when('/list/:id', {
            templateUrl: '/Templates/CourseList/detail.html',
            controller: 'CourseDetailCtrl'
        }).
        otherwise({
            redirectTo: '/list'
        });
  }]);

var courseListControllers = angular.module('courseListControllers', []);

courseListControllers.controller('CourseListCtrl', ['$scope', '$http',
  function ($scope, $http) {
      $http.get('/CourseList/All').success(function (data) {
          $scope.courseList = data;
      });

      $scope.changeFilter = $.bootstrap.button.dropDownText;
  }]);

courseListControllers.controller('CourseDetailCtrl', ['$scope', '$http', '$routeParams',
  function ($scope, $http, $routeParams) {
      $scope.courseID = $routeParams.id;

      $http.get('/CourseList/Detail/' + $routeParams.id).success(function (data) {
          $scope.courseList = data;
      });

      $scope.changeFilter = $.bootstrap.button.dropDownText;
      $scope.filterData = {
          platform: ['Android', 'IOS'],
          langugae: ['english', 'chinese'],
          culture: ['english', 'chinese'],
      }
      $scope.filters = {};
  }]);