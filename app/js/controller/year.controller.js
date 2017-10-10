angular.module("PlanBarApp").controller("YearController", function($scope,$http,$state){
    console.log("YearController loaded");


    $scope.items = [];

    function activate() {
        console.log("Activate");

        $http({
            method: 'GET',
            url: URL_Base
          }).then(function successCallback(response) {
              console.log(response)
              $scope.items = response.data;
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
    }

    $scope.onClickItem = function(item) {
        $state.go('type', {url : item.url});
    }
    activate();

});
