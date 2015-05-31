
var app = angular.module('app', []);

app.controller('controller', function($scope, $http) {

    $http.get('data/file.json').success(function(data) {
        $scope.songs = data;
    });

    $scope.search = function() {
        /*$http({
            url: "http://developer.echonest.com/api/v4/song/search",
            method: "GET",
            params: {
                api_key: "7NTCYVTMP9GABADO0",
                bucket: ["id:7digital-US", "tracks"],
                combined: $scope.query,
                results: 5
            }
        });*/

        var result;
        for(var i=0; i<$scope.songs.length; i++)
            if($scope.query == $scope.songs[i].title)
                result = $scope.songs[i].track_id;

        $scope.query = result || "Not Found 404";
    }
});
