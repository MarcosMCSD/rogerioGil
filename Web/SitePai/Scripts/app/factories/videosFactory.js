angular.module('app').factory('videosFactory', ['$http', function ($http) {

    var _getVideos = function () {
        return $http.get('model/videos.json');
    };

    return {
        getVideos: _getVideos
    };
}]);