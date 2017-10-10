var app = angular.module("PlanBarApp", ['ui.router']);



app.controller("MainController", function ($scope) {
    console.log("MainController loaded");
});


app.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/year");
    //
    // Now set up the states
    $stateProvider
        .state('year', {
            url: "/year",
            templateUrl: "../views/year.html",
            controller: "ScheduleController"
        })
        .state('type', {
            url: "/type",
            templateUrl: "../views/type.html",
            controller: "SchduleController"
        })
        .state('courses', {
            url: "/courses",
            templateUrl: "../views/courses.html",
            controller: "ScheduleController"
        });
});