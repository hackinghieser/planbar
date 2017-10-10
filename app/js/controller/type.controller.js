angular.module("PlanBarApp").controller("TypeController", function($scope,$http,$state,$stateParams){
    console.log("TypeController loaded");

    var url = $stateParams.url;

    $scope.items = [];

    function activate() {
        try  {
        console.log("Activate TypeController : URL " + url);

        $http({
            method: 'GET',
            url: url
          }).then(function successCallback(response) {
              console.log(response)
              $scope.items = response.data.programs;
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
        }catch(err){
            $state.go('year');
        }
    }

    $scope.onClickItem = function(item) {
        $state.go('sessions',{ url : item.url});
    }
    activate();

});
