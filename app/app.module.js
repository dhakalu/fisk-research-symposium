var rSApp = angular.module('rSApp', [
    'ngRoute',
    'rSAppRoutes',
    'homePageModule',
    'abstractModule',
    'homeDirectives',
    'abstractDirectives'
]).controller('advisorSelectController', ['$scope', function($scope) {
  
    $scope.advisors = [];
    for(var i=0; i<facultyAdvisors.length; i++){
	var peopleId = facultyAdvisors[i];
	var advisor = people[peopleId];
	$scope.advisors.push(advisor);
    };
}]).controller('abstractFormController', ['$scope', '$http', function($scope, $http){
    $scope.formData = {};
    $scope.submitAbstract = function(){
	console.log($scope.formData);
	$http.post('submit.php', $scope.formData);
    };
}]);
