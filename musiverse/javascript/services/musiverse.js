angular.module('app')
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
        this.searchSimilarSongs = function (track_id) {
            var METHOD = '/similarity?track_id=';
            var deferred = $q.defer();
            $http.get(API_URL + METHOD + track_id).then(function (songs) {
                deferred.resolve(songs.data);
            }, function () {
                deferred.reject(arguments);
            });
            return deferred.promise;
        };
    });