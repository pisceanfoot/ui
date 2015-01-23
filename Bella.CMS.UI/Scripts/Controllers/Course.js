'use strict';

/* App Module */

var courseApp = angular.module('app', [
  'ngRoute',
  'ui.bootstrap',
  'courseControllers',
  'angularFileUpload'
]);

courseApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/edit/:id/:system/:src/:tar', {
            templateUrl: '/Templates/Course/item.html',
            controller: 'CourseCtrl'
        }).
        when('/new/:system?/:src?/:tar?', {
            templateUrl: '/Templates/Course/newItem.html',
            controller: 'CourseNewCtrl'
        }).
        otherwise({
            controller: function () {
                window.location = '/CourseList#list';
            },
            template: "<div></div>"
        });
  }]);

var courseControllers = angular.module('courseControllers', []);

courseControllers.directive('customToLowerCase', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$formatters.push(function (inputValue) { return (inputValue || '').toLowerCase(); });
            ngModel.$parsers.push(function (inputValue) { return (inputValue || '').toLowerCase(); });
        }
    };
});
courseControllers.directive('customTrim', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$formatters.push(function (inputValue) { return jQuery.trim(inputValue || ''); });
            ngModel.$parsers.push(function (inputValue) { return ' ' + (inputValue || '') + ' '; });
        }
    };
});
courseControllers.directive('inputChange', function () {
    return {
        link: function (scope, element, attrs) {
            element.on('change', function () {
                var i = attrs.inputChange.lastIndexOf('.');
                var pre = attrs.inputChange.substring(0, i);
                var suf = attrs.inputChange.substring(i + 1);
                var obj = scope.$eval(pre);
                scope.upload(obj, suf);
            });
        }
    };
});

courseControllers.controller('CourseCtrl', ['$scope', '$http', '$routeParams', 'FileUploader',
function ($scope, $http, $routeParams, FileUploader) {
    var data = null;
    if ($routeParams.id === "new") {
        $scope.goBack = '#/new/' + $routeParams.system + '/' + $routeParams.src + '/' + $routeParams.tar;
        data = { CourseID: '', SrcCulture: $routeParams.src, TarCulture: $routeParams.tar, System: $routeParams.system };
        $scope.courseDetail = data;
        $scope.CourseData = { language: $routeParams.tar };
    }
    else {
        $scope.goBack = '/CourseList#list/' + $routeParams.id;
        data = { CourseID: $routeParams.id, SrcCulture: $routeParams.src, TarCulture: $routeParams.tar, System: $routeParams.system };
        $http.post('/Course/Get', data).success(function (data) {
            $scope.courseDetail = data;

            if (data.CourseData) {
                $scope.CourseData = $.parseJSON(data.CourseData);
            }
        }).error(function (data, status, headers, config) {
        });
    }

    $scope.addChunk = function () {
        $scope.CourseData.chunk = $scope.CourseData.chunk || {};
        $scope.CourseData.chunk.details = $scope.CourseData.chunk.details || [];
        $scope.CourseData.chunk.details.push({ title: '', content: '' });
    };
    $scope.addDialogue = function () {
        $scope.CourseData.presentation = $scope.CourseData.presentation || {};
        $scope.CourseData.presentation.dialogue = $scope.CourseData.presentation.dialogue || [];
        $scope.CourseData.presentation.dialogue.push({ content: '', speakericon: '' });
    };
    $scope.addQuestion = function () {
        $scope.CourseData["multi-choice"] = $scope.CourseData["multi-choice"] || [];
        $scope.CourseData["multi-choice"].push({ question: '', header: '', audio: '', limit_time: '', items: [], 'multi-choice-type': '', score: '', random: '' });
    };
    $scope.addOption = function (question) {
        question.items = question.items || [];
        question.items.push({ item: '', iscorrect: '', errorhint: '' });
    }
    $scope.edit = function () {
        //var getLocker = function () {
        //    $http.post('/CourseLocker', { course_id: $routeParams.id }).success(function (result) {
        //        if (result && result.Success) {
        //            alert('You can edit it now');

        //            if (!$routeParams.id) {
        //                //update course id for CreateNew
        //            }


        //        }
        //        else {
        //            alert('Course is locked by ' + result.Lock_by);
        //        }
        //    });

        //    //setTimeout(getLocker, 5000);
        //}

        //getLocker();
    };
    $scope.submit = function () {
        var data = jQuery.extend({}, $scope.courseDetail);

        removeItems(data, '$$hashKey');

        if ($scope.CourseData) {
            var courseData = jQuery.extend({}, $scope.CourseData);

            removeItems(courseData, '$$hashKey');

            data.CourseData = JSON.stringify(courseData);
        }

        $http.post('/Course/Save', data).success(function (result) {
            if (result && result.success) {
                alert("success");
            }
            else {
                alert("failed");
            }
        });

        return false;
    }

    // https://github.com/nervgh/angular-file-upload
    var uploader = $scope.uploader = new FileUploader({
        url: '/Upload/Upload',
        queueLimit: 1
    });

    uploader.filters.push({
        name: 'customExtFilter',
        fn: function (item /*{File|FileLikeObject}*/, options) {
            var name = item.name || '';
            name = name.toLowerCase();
            var i = name.lastIndexOf('.')
            if (i > 0) {
                var ext = name.substring(i);
                return ext == ".jpeg" || ext == ".jpg" || ext == ".png" || ext == ".gif" || ext == ".mp4" || ext == ".mp3";
            } else {
                return false;
            }
        }
    });

    uploader.onBeforeUploadItem = function (fileItem) {
        fileItem.formData.push({ CourseID: data.CourseID });
        fileItem.formData.push({ SrcCulture: data.SrcCulture });
        fileItem.formData.push({ TarCulture: data.TarCulture });
        fileItem.formData.push({ System: data.System });
    };

    $scope.upload = function (e, i) {
        uploader.uploadAll();

        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            e[i] = response.Data;
        };
    };

    $scope.triggerUpload = function (id) {
        $("#" + id).click();
    };

    var removeItems = function (obj, key) {
        if (obj && key) {
            if (typeof (obj) == "object") {
                for (var k in obj) {
                    if (key === k) {
                        delete obj[k];
                    }
                    else if (typeof (obj[k] === "object")) {
                        removeItems(obj[k], key);
                    }
                }
            }
        }
    }
}]);

courseControllers.controller('CourseNewCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.system = $routeParams.system;
        $scope.sourceLanguage = $routeParams.src;
        $scope.targetLanguage = $routeParams.tar;

        $scope.next = function () {
            if ($scope.system && $scope.sourceLanguage && $scope.targetLanguage) {
                document.location.hash = '/edit/new/' + $scope.system + '/' + $scope.sourceLanguage + '/' + $scope.targetLanguage;
            }
        };
    }]);