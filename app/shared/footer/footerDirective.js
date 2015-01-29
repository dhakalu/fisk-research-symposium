var footerDirective = angular.module('footerDirective', []);

footerDirective.directive('socialApps', function(){
    return {
	restrict: 'E',
        templateUrl: 'social-apps.html'
    };
});
