angular.module('app', [])
    .service('Musiverse', function ($q, $http) {
        var API_URL = 'http://localhost:3000';
        this.searchArtists = function (term) {
            var METHOD = '/artists?s=';
            var deferred = $q.defer();
            $http.get(API_URL + METHOD + term).then(function (artists) {
                deferred.resolve(artists.data);
            }, function () {
                deferred.reject(arguments);
            });
            return deferred.promise;
        };
        this.searchSongsForArtist = function (artist) {
            var METHOD = '/songs?a=';
            var deferred = $q.defer();
            $http.get(API_URL + METHOD + artist).then(function (songs) {
                deferred.resolve(songs.data);
            }, function () {
                deferred.reject(arguments);
            });
            return deferred.promise;
        };
    })
    .controller('controller', function ($scope, $http, Musiverse) {
        $scope.allsongs = [];
        $scope.songs = [];

        //        $http.get('data/file.json').success(
        //            function (data) {
        //                data.sort(function (a, b) {
        //                    if (a.artist_name === b.artist_name) {
        //                        return a.title < b.title ? -1 : 1;
        //                    } else {
        //
        //                        return a.artist_name < b.artist_name ? -1 : 1;
        //                    }
        //                });
        //                $scope.songs = data;
        //            });
        $scope.search = function () {

            var result = $scope.allsongs.filter(function (song, index) {
                return song.title === $scope.song
            })[0];

            $http({
                    url: "http://localhost:3000/similarity",
                    method: "GET",
                    params: {
                        track_id: result
                    }
                })
                .success(function (data) {
                    $scope.recomendation = data;
                })
        };

        $scope.searchArtists = function (term) {
            if (term.length !== 0) {
                Musiverse.searchArtists(term).then(function (artists) {
                    $scope.artists = artists;
                });
            }
        };
        $scope.searchSongsForArtist = function (term) {
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
    })
    .directive('keyboardPoster', function ($parse, $timeout) {
        var DELAY_TIME_BEFORE_POSTING = 0;
        return function (scope, elem, attrs) {

            var element = angular.element(elem)[0];
            var currentTimeout = null;

            var doWork = function () {
                var model = $parse(attrs.postFunction);
                var poster = model(scope);

                if (currentTimeout) {
                    $timeout.cancel(currentTimeout)
                }
                currentTimeout = $timeout(function () {
                    poster(angular.element(element).val());
                }, DELAY_TIME_BEFORE_POSTING)
            };
            element.oninput = doWork;
            element.onfocus = doWork;
        }
    });