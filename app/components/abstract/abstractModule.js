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
	    
	});
}); 
