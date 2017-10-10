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
            controller: "YearController"
        })
        .state('type', {
            url: "/type",
            templateUrl: "../views/type.html",
            controller: "TypeController",
            params: {
                url: null
            },
        })
        .state('courses', {
            url: "/courses",
            templateUrl: "../views/courses.html",
            controller: "CourseController",
            params: {
                url: null
            },
        })
        .state('sessions', {
            url: "/session",
            templateUrl: "../views/sessions.html",
            controller: "SessionController",
            params: {
                url: null
            }
        })
        .state('transform', {
            url: "/transform",
            templateUrl: "../views/transform.html",
            controller: "TransformController",
            params: {
                modules: null
            }
        });
});