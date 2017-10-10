angular.module("PlanBarApp").controller("SessionController", function($scope,$http,$state,$stateParams){
    console.log("SessionConroller loaded");

    var url = $stateParams.url;
    
    $scope.items = [];

    function activate() {
        console.log("Activate");

        $http({
            method: 'GET',
            url: url
          }).then(function successCallback(response) {
              console.log(response)
              $scope.items = response.data.sessions;
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
    }

    $scope.onClickItem = function(item) {
        $state.go('courses', {url : item.url});
    }
    activate();

});
