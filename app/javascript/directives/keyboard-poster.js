angular.module('app')
    .directive('keyboardPoster', function ($parse, $timeout) {
        var DELAY_TIME_BEFORE_POSTING = 500;
        return function (scope, elem, attrs) {

            var element = angular.element(elem)[0];
            var currentTimeout = null;

            var doWork = function () {
                var model = $parse(attrs.postFunction);
                var poster = model(scope);

                if (currentTimeout) {
                    $timeout.cancel(currentTimeout);
                }
                currentTimeout = $timeout(function () {
                    poster(angular.element(element).val());
                }, DELAY_TIME_BEFORE_POSTING);
            };
            element.oninput = doWork;
            element.onfocus = doWork;
        };
    });
