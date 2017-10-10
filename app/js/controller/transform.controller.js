angular.module("PlanBarApp").controller("TransformController", function ($scope, $http, $state, $stateParams) {
    console.log("TransformController loaded");

    var modules = $stateParams.modules;

    $scope.items = [];


    function activate() {
        try {

            console.log("Activate TransformController");

            modules.forEach(function (module) {
                if (module.checked) {
                    var prom =
                        $http({
                            method: 'GET',
                            url: module.url
                        }).then(function successCallback(response) {
                            console.log(response)
                            var c = response.data;
                            c.dates = [];
                            c.events.forEach(function(ev) {
                                $http({
                                    method: 'GET',
                                    url: ev.url
                                }).then(function successCallback(res) {
                                    console.log(res)
                                    c.dates.push(res.data);
                                    
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
            console.log($scope.items);

        } catch (err) {
            $state.go('year');
        }

    }


    activate();

    $scope.submit = function () {
        console.log($scope.items);

        var cal = ics();
        $scope.items.forEach(function(item){
            item.events.forEach(function(event){
                cal.addEvent(item.label,event.label , location, begin, end);
            });
        });
        cal.addEvent("", description, location, begin, end);
        cal.addEvent(subject, description, location, begin, end); // yes, you can have multiple events :-)
        cal.download(filename);
    }
});