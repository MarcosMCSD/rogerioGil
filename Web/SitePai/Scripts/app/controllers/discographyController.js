/// <reference path="../../frameworks/angular/angular.js" />
angular.module('app', ['ngSanitize'])
    .controller('discographyController', ['$scope', '$sce', '$window' ,'discographyFactory',
        function ($scope, $sce, $window,  discographyFactory) {
            //Variables
            $scope.collection = [];
            $scope.displayVideoSource = '';

            //Initializer
            function init() {
                discographyFactory.getDiscography().then(function (response) {
                    //save discography by type
                    for (var i = 0; i < response.data.discography.length; i++) {
                        var discographyItem = new DiscographyItem(
                            response.data.discography[i].title,
                            response.data.discography[i].year,
                            response.data.discography[i].description,
                            response.data.discography[i].members,
                            response.data.discography[i].music,
                            response.data.discography[i].status,
                            response.data.discography[i].image,
                            response.data.discography[i].category);
                        $scope.collection.push(discographyItem);
                    };
                    //set discography item info by default
                    $scope.showItemInfo($scope.collection[0].category);
                    //to active
                    $scope.listItem = $scope.collection[0].category;
                    //set image
                    $scope.image = $scope.collection[0].image;
                    //set music
                    $scope.music = $scope.collection[0].music.source;
                });
            };

            $scope.sendCategory = function (category) {
                $window.sessionStorage.setItem("shared", category);
            };

            $scope.showItemInfo = function (category) {
                $scope.listItem = '';
                $scope.videosByFilter = '';
                for (var i = 0; i < $scope.collection.length; i++) {
                    if ($scope.collection[i].category === category) {
                        $scope.title = $scope.collection[i].title;
                        $scope.year = $scope.collection[i].year;
                        $scope.status = $scope.collection[i].status;
                        $scope.description = $scope.collection[i].description;
                        $scope.members = $scope.collection[i].members;
                        $scope.image = $scope.collection[i].image;
                        $scope.music = $scope.collection[i].music.source;
                    }
                }
                $scope.listItem = category; //set category to active.

            };


            $scope.setVideo = function (src, name) {
                $scope.displayVideoSource = $sce.trustAsResourceUrl(src);
                $scope.songName = name;
            };

            init();

        }]);



//Aux
//Constructor
function DiscographyItem(title, year, description, members, music, status, image, category) {
    this.title = title;
    this.year = year;
    this.description = description;
    this.members = members;
    this.music = music;
    this.status = status;
    this.image = image;
    this.category = category;
}

function setEntityCollection(array) {
    var entityCollection = [];

    for (var i = 0; i < array.length; i++) {
        entityCollection.push(array[i]);
    }

    return entityCollection;
}