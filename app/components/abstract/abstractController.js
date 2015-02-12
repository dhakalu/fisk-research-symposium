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
	}]).controller('abstractFormController', ['$scope', '$http', '$location', 'abstractFactory', function($scope, $http, $location, abstractFactory){
	    // Get all the users form the data base to suggest the author selection
	    var getUsers = function(data){
		$scope.users = data;
	    };
	    var getInstitutions = function(data){
		$scope.institutions = data;
	    };

	    var getDepartments = function(data){
		$scope.departments = data;
	    };
	    
	    var getDisciplines = function(data){
		$scope.disciplines = data;
	    };
	    $scope.formData = {};
	    $scope.formData.authors = [];
	    $scope.makePresenter = function(author){
		for(var i=0; i<$scope.formData.authors.length; i++){
		    if($scope.formData.authors[i].username == author){
			$scope.formData.authors[i].presenter = !$scope.formData.authors[i].presenter;
		    }
		}
	    };
	    $scope.changeOrder = function(order, author){
		for(var i=0; i<$scope.formData.authors.length; i++){
                    if($scope.formData.authors[i].username == author.username){
		        $scope.formData.authors[i].order = order;
                    }
                }
	    };
	    $scope.submitAbstract = function(){
		if($scope.abstractFormIsValid){
		    $http.post('assests/php_scripts/submit.php', $scope.formData).
			success(function(data){
			    if(data.trim() == '200'){
				console.log("Yeah");
				$location.path('#/abstract/success');
			    };
			});
		}
	    };
	    $scope.addAuthor = false;
	    $scope.authorNotListed = false;
	    $scope.showAddAuthorForm = function(){
		$scope.addAuthor = true;
		abstractFactory.getAllUsers(getUsers);
		abstractFactory.getInstitutions(getInstitutions);
		abstractFactory.getDepartments(getDepartments);
		abstractFactory.getDisciplines(getDisciplines);
	    };
	    $scope.authorFormData = {};
	    $scope.authorNumber = 0;
	    $scope.addAuthorToList = function(){
		console.log($scope.institutions);
		console.log("Hello form add author");
		if(arguments.length > 0){
		    $scope.authorFormData = arguments[0];
		    $scope.authorFormData.order = $scope.authorNumber;
		    $scope.authorFormData.isinDataBase = true;
		} else {
		    var formData =  $scope.authorFormData;
		    formData.username = (Math.random()*1000 | 0);
		}
		$scope.authorFormData.presenter = false;
		$scope.formData.authors.push($scope.authorFormData);
		$scope.addAuthor = !$scope.addAuthor;
		$scope.authorFormData = {};
		$scope.authorNumber += 1;
	    };
	    $scope.cancelAddingAuthor = function(){
		$scope.addAuthor = !$scope.addAuthor;
		$scope.addAuthorFormData = {};
	    };
	    $scope.removeAuthor = function(author){
		var authors = $scope.formData.authors;
		for( var i=0; i<authors.length; i++){
		    if(authors[i].username == author.username){
			authors.splice(i, 1);
		    }
		}
		$scope.formData.authors = authors;
	    };
	    $scope.showAddNewAuthorForm = function(){
		$scope.authorNotListed = true;
	    };
	      // VALIDATORS
	    $scope.abstractFormIsValid = function(){
		return ($scope.abstractForm.title.$valid &&
			$scope.abstractForm.advisor.$valid &&
			$scope.abstractForm.type.$valid &&
			$scope.abstractForm.abstractBody.$valid);
	    };
	    $scope.authorFormIsValid = function(){
		return ($scope.abstractForm.firstname.$valid &&
			$scope.abstractForm.lastname.$valid &&
			$scope.abstractForm.email.$valid &&
			$scope.abstractForm.institution.$valid &&
			$scope.abstractForm.department.$valid
		       );
	    };
	}]);
abstractController.controller('manageAbstractController', ['$scope', 'abstractFactory', function($scope, abstractFactory){
    var getAbstracts = function(data){
	
    };
    var setUser = function(username){
	$scope.user = username;
	console.log(username);
    };
    $scope.abstracts = {};
}]);



















