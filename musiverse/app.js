
var app = angular.module('app', []);

app.controller('controller', function($scope, $http) {

    $http.get('data/file.json').success(function(data) {
                                        data.sort(function(a,b){
                                                  return a.title < b.title ? -1 : 1;
                                                  })
        $scope.songs = data;
    });

    $scope.search = function() {

        var result;
        for(var i=0; i<$scope.songs.length; i++)
            if($scope.query == $scope.songs[i].title)
                result = $scope.songs[i].track_id;

        $http({
             url: "http://analytics.lsd.ufcg.edu.br:5405/similarity",
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
