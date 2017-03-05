angular.module('app').factory('discographyFactory', ['$http', function ($http) {

    var _getDiscography = function () {
        return $http.get('model/discography.json');
    };

    return {
        getDiscography: _getDiscography
    };
}]);