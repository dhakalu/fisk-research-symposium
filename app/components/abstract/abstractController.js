var abstractController = angular.module('abstractControllers', []).
	controller('singleAbstractController', ['$scope', '$routeParams','abstractFactory', 'peopleFactory', function($scope, $routeParams, abstractFactory, peopleFactory){
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
		'authors': abstractFactory.getAuthors(abstractId),
		'abstractBody': abstractBody,
		'classification': peopleFactory.getClassification(paper.presenter),
		'affilations': abstractFactory.getAffiliationsDetails(abstractId)
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
	    $scope.formData.authors = [];
	    $scope.submitAbstract = function(){
		if($scope.abstractForm.$valid){
		    $http.post('assests/php_scripts/submit.php', $scope.formData).
			success(function(data){
			    console.log(data);
			});
		}
		console.log($scope.formData);
	    };
	    $scope.addAuthor = false;
	    $scope.showAddAuthorForm = function(){
		$scope.addAuthor = true;
	    };
	   
	    $scope.addAuthorToList = function(){
		$scope.formData.authors.push($scope.authorFormData);
		$scope.addAuthor = !$scope.addAuthor;
		$scope.authorFormData = {};
	    };
	    $scope.cancelAddingAuthor = function(){
		$scope.addAuthor = !$scope.addAuthor;
		$scope.addAuthorFormData = {};
	    };
	}]);
