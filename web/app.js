
var app = angular.module('app', []);

app.controller('controller', function($scope, $http) {

    $http.get('data/file.json').success(function(data) {
        $scope.songs = data;
    });

    $scope.search = function() {

        var result;
        for(var i=0; i<$scope.songs.length; i++)
            if($scope.query == $scope.songs[i].title)
                result = $scope.songs[i].track_id;

        $http({
             url: "http://localhost:5005/similarity",
             method: "GET",
             params: {
                 track_id: result
             }
         })

            .success(function(data) {
                $scope.recomendation = data;
            })
    }
});
