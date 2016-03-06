angular.module('app')
    .controller('SimilarController', function ($scope, $routeParams, Musiverse) {
        var controller = this;
        Musiverse.searchSimilarSongs($routeParams.track_id).then(function (songs) {
            $scope.song = songs.shift();
            $scope.songs = songs;
        });
    });