angular.module('app')
    .controller('FormController', function ($scope, $http, Musiverse) {
        $scope.allsongs = [];
        $scope.songs = [];
        $scope.searchArtists = function (term) {
            if (term.length !== 0) {
                Musiverse.searchArtists(term).then(function (artists) {
                    $scope.artists = artists;
                });
            }
        };
        $scope.searchSongsForArtist = function (term) {
            term = term.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            if ($scope.allsongs.length === 0) {
                Musiverse.searchSongsForArtist($scope.artist).then(function (songs) {
                    $scope.allsongs = songs;
                    $scope.songs = songs;
                });
            }
            $scope.songs = $scope.allsongs.filter(
                function (element, index) {
                    return element.title.search(term) === 0;
                });
        };
    });