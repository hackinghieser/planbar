angular.module("PlanBarApp").controller("CourseController", function ($scope, $http, $state, $stateParams) {
    console.log("CourseConroller loaded");

    var url = $stateParams.url;

    $scope.items = [];

    function activate() {
        try {
            console.log("Activate");

            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                console.log(response)
                $scope.items = response.data.modules;
                $scope.items.map(function (item) {
                    item.checked = false;
                    return item;
                })
                $("[name='my-checkbox']").bootstrapSwitch();
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        } catch (err) {
            $state.go('year');
        }
    }


    activate();

    $scope.submit = function () {
      if(checkIfSelected()) {
        console.log($scope.items);
        $state.go('transform', {
            modules: $scope.items
        });
      }else {
        $('#myModal').modal('show')
      }
    }

    function checkIfSelected() {
      var selected = false;
      $scope.items.forEach(function(ele) {
        if(ele.checked) {
          selected = true;
          return;
        } 
      })
      return selected;
    }
});