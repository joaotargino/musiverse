angular.module('app')
  .controller('SimilarController', ['$scope', '$routeParams', 'Musiverse', function($scope, $routeParams, Musiverse) {
    var controller = this;
    Musiverse.searchSimilarSongs($routeParams.track_id)
      .then(function(songs) {
        $scope.song = songs.shift();
        $scope.songs = songs;
      });
  }]);
