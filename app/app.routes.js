var baseRoutes = angular.module('rSAppRoutes', []); 

baseRoutes.config(function($locationProvider, $routeProvider){
    $routeProvider.
	when('/', {
	    templateUrl: 'app/components/home/mainView.html'
	}).
	when('/abstracts',{
	    templateUrl: 'app/components/abstract/abstractMainView.html'
	}).when('/login', {
	    templateUrl: 'app/components/home/loginViewHtml.php'
	});
});
	
