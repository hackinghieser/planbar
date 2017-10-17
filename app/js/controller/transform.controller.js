angular.module("PlanBarApp").controller("TransformController", function ($scope, $http, $state, $stateParams) {
  console.log("TransformController loaded");

  var modules = $stateParams.modules;

  $scope.items = [];

  $scope.course_count = 0;
  $scope.appointment_count = 0;

  function activate() {
    try {

      console.log("Activate TransformController");

      modules.forEach(function (module) {
        $scope.course_count++;
        if (module.checked) {
          var index = 0;
          var prom =
            $http({
              method: 'GET',
              url: module.url
            }).then(function successCallback(response) {
              console.log(response)
              var c = response.data;
              $scope.appointment_count += c.events.length;
              c.events.forEach(function (ev) {
                $http({
                  method: 'GET',
                  url: ev.url
                }).then(function successCallback(res) {
                  console.log(res)
                  c.events[index].date = res.data;
                  index++;
                }, function errorCallback(response) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
                });
              })
              $scope.items.push(c);


            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
        }
      }, this);
      console.log("Transfromation ", $scope.items);

    } catch (err) {
      $state.go('year');
    }

  }


  activate();

  $scope.submit = function () {
    console.log($scope.items);

    var cal = ics();
    $scope.items.forEach(function (item) {
      item.events.forEach(function (event) {
        console.log(moment.unix(event.date.startdate / 1000).format());
        cal.addEvent(item.label, event.label, "", moment.unix(event.date.startdate / 1000).format(), (moment.unix(event.date.enddate / 1000).format()));
      });
    });

    console.log("ICS", cal);
    cal.download('Schedule');
  }
});