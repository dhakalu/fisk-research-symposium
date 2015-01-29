var baseRoutes = angular.module('rSAppRoutes', []); 

baseRoutes.config(function($routeProvider){
    $routeProvider.
	when('/', {
	    templateUrl: 'app/components/home/mainView.html'
	}).
	when('/abstracts',{
	    templateUrl: 'app/components/abstract/abstractMainView.html'
	});
});
	
