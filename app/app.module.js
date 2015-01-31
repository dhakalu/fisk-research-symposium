
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
	var descipline = disciplineNames[presenter.discipline];
	var department = deptNames[descipline.deptId];
	var title = paper.title;
	var abstractBody = abstracts[abstractId];
	$scope.abstractObject = {
	    'title': title,
	    'presenter': presenter,
	    'descipline': descipline.name,
	    'department': department,
	    'abstractBody': abstractBody
	};
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
	if($scope.abstractForm.$valid){
	    $http.post('submit.php', $scope.formData);
	}
	console.log($scope.formData);
    };
}]);
