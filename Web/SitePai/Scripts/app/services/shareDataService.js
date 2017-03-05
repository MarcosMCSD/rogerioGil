angular.module('app')
    .service('shareDataService', function () {
    var myList = [];

    var addList = function (newObj) {
        myList.push(newObj);
    }

    var getList = function () {
        return myList;
    }

    return {
        addList: addList,
        getList: getList
    };

});