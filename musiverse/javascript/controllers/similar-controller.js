angular.module('app')
    .controller('SimilarController', function ($scope, $http, Musiverse) {
        //        $scope.searchSimilarSongs = function () {
        var result = $scope.allsongs.filter(function (song, index) {
            return song.title === $scope.song
        })[0];
        Musiverse.searchSimilarSongs(result.track_id).then(function (songs) {
            $scope.songs = songs;
            console.log(songs);
        });
        //        };
    });