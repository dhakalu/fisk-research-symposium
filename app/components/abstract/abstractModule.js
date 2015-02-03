var abstractModule = angular.module('abstractModule', [
    'abstractRoutes',
    'formModule'
]);
angular.module('formModule', []).
    controller('formController', ['$scope', function($scope){
    
    }]);

var abstractRoutes = angular.module('abstractRoutes', []);

abstractRoutes.config(function($routeProvider){
    $routeProvider.
	when('/abstract/new',{
	    templateUrl: 'app/components/abstract/newAbstractView.html'
	}).
	when('/abstract/:abstractid/edit',{
	    templateUrl: 'app/components/abstract/editAbstractView.html'
	}).
	when('/abstract/all', {
	    templateUrl: 'app/components/abstract/allAbstractsView.html'
	}).
	when('/abstract/:abstractId', {
	    templateUrl: 'app/components/abstract/singleAbstractView.html',
	    controller: 'singleAbstractController'
	}).otherwise({redirectTo:'/'});
}); 
