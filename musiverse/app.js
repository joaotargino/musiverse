angular.module('app', [])
    .controller('controller', function ($scope, $http) {

        $http.get('data/file.json').success(
            function (data) {
                data.sort(function (a, b) {
                    if (a.artist_name === b.artist_name) {
                        return a.title < b.title ? -1 : 1;
                    } else {

                        return a.artist_name < b.artist_name ? -1 : 1;
                    }
                });
                $scope.songs = data;
            });

        $scope.search = function () {

            var result = $(this).data('track');
            //        for (var i = 0; i < $scope.songs.length; i++)
            //            if ($scope.query == $scope.songs[i].title)
            //                result = $scope.songs[i].track_id;

            console.log(result);
            console.log($scope.query);

            $http({
                url: "http://localhost:5405/similarity",
                method: "GET",
                params: {
                    track_id: result
                }
            })

            .success(function (data) {
                $scope.recomendation = data;
            })
        };

        $scope.searchArtist = function (term) {
            Geolocator.searchFlight(term).then(function (countries) {
                $scope.countries = countries;
            });
        }
    })

.directive('keyboardPoster', function ($parse, $timeout) {
    var DELAY_TIME_BEFORE_POSTING = 0;
    return function (scope, elem, attrs) {

        var element = angular.element(elem)[0];
        var currentTimeout = null;

        element.oninput = function () {
            var model = $parse(attrs.postFunction);
            var poster = model(scope);

            if (currentTimeout) {
                $timeout.cancel(currentTimeout)
            }
            currentTimeout = $timeout(function () {
                poster(angular.element(element).val());
            }, DELAY_TIME_BEFORE_POSTING)
        }
    }
});