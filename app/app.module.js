
var rSApp = angular.module('rSApp', [
    'ngRoute',
    'rSAppRoutes',
    'homePageModule',
    'homeDirectives',
    'abstractModule',
    'abstractDirectives',
])
    .controller('singleAbstractController', ['$scope', '$routeParams', function($scope, $routeParams){
	var abstractId = $routeParams.abstractId;
	var paper = papers[abstractId];
	var presenter = people[paper.presenter];
	$scope.paper = paper;
	$scope.presenter = presenter;
	$scope.abstractBody = abstracts[abstractId];
    }])
    .controller('abstractListController', ['$scope', function($scope){
	$scope.abstracts = [];
	for(paper in papers){
	    var presenter = people[papers[paper].presenter];
	    console.log(presenter);
	    var presenterName = presenter.firstname + ' ' + presenter.lastname;
	    var title = papers[paper].title;
	    $scope.abstracts.push(
		{
		    abstractId: paper,
		    presenter: presenterName,
		    title: title
		}
	    );
	}
    }])
    .controller('advisorSelectController', ['$scope', function($scope) {
  
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
