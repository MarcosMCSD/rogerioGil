/// <reference path="../../frameworks/angular/angular.js" />
var app = angular.module('app', ['ngSanitize'])
    .controller('videosController', ['$scope', '$sce', '$window', 'videosFactory',
        function ($scope, $sce, $window, videosFactory) {
            //Variables
            $scope.collection = [];

            $scope.videosByFilter = [];
            $scope.displayVideoSource = '';
            //Info
            $scope.showInfo = false;


            //Initializer
            function init() {
                videosFactory.getVideos().then(function (response) {
                    //save categories
                    for (var i = 0; i < response.data.videos.length; i++) {
                        var videoCategory = new VideoCategory(
                            response.data.videos[i].title,
                            response.data.videos[i].description,
                            response.data.videos[i].list,
                            response.data.videos[i].category);
                        $scope.collection.push(videoCategory);
                        videoCategory = {};
                    };
                    //set first category and first video by default

                    if (!$window.sessionStorage.getItem("shared")) {
                        $scope.getVideosByCategory('fridaynight');
                    }
                    else {
                        $scope.getVideosByCategory($window.sessionStorage.getItem("shared"));
                    }
                });
            };

            //Actions
            $scope.getVideosByCategory = function (category) {
                $scope.showInfo = true;
                $scope.category = ''; //reset category
                $scope.videosByFilter = '';
                for (var i = 0; i < $scope.collection.length; i++) {
                    if ($scope.collection[i].category === category) {
                        $scope.videosByFilter = setEntityCollection($scope.collection[i].list);
                        //Data to show as info
                        $scope.title = $scope.collection[i].title;
                        $scope.description = $scope.collection[i].description;
                        //Set first video by default
                        $scope.setVideo($scope.collection[i].list[0].source);
                        $scope.songName = $scope.collection[i].list[0].name;
                    }
                }
                $scope.category = category; //set category to active
            };

            $scope.setVideo = function (src, name) {
                $scope.displayVideoSource = $sce.trustAsResourceUrl(src);
                $scope.songName = name;
            };

            init();

        }]);



//Aux
//Constructor
function VideoCategory(title, description, list, category) {
    this.title = title;
    this.description = description;
    this.list = list;
    this.category = category;
}

function setEntityCollection(array) {
    var entityCollection = [];

    for (var i = 0; i < array.length; i++) {
        entityCollection.push(array[i]);
    }

    return entityCollection;
}