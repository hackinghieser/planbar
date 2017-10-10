angular.module("PlanBarApp").controller("TransformController", function ($scope, $http, $state, $stateParams) {
    console.log("TransformController loaded");

    var modules = $stateParams.modules;

    $scope.items = [];


    function activate() {
        console.log("Activate TransformController");

        modules.forEach(function (module) {
            if (module.checked) {
                var prom =
                    $http({
                        method: 'GET',
                        url: module.url
                    }).then(function successCallback(response) {
                        console.log(response)
                        $scope.items.push(response.data);
                    }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            }
        }, this);

    }


    activate();

    $scope.submit = function () {
        console.log($scope.items);
    }
});