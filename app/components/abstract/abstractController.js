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
		'affiliations': abstractFactory.getAffiliationsDetails(abstractId)
	    };
	}])
	.controller('abstractListController', ['$scope', function($scope){
	    $scope.abstracts = [];
	    for(paper in papers){
		var presenter = people[papers[paper].presenter];
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
	}]).controller('abstractFormController', ['$scope', '$http', '$location', 'abstractFactory', 'addAffiliationFactory', function($scope, $http, $location, abstractFactory, addAffiliationFactory){
	    var getLogedUser = function(data){
		$scope.root_user = data;
		var loged_user = data;
		loged_user.affiliations = [];
		loged_user.affiliations.push({
		    'discipline': loged_user.discipline,
		    'institution': loged_user.institution,
		    'department': loged_user.department
		});
		loged_user.order = 1;
		loged_user.presenter = true;
		$scope.formData.authors.push(loged_user);
	    };
	    abstractFactory.getLogedUser(getLogedUser);
	    // Get all the users form the data base to suggest the author selection+
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
	    
	    $scope.getUserInstitution = function(instId){
		for( var i=0; i<$scope.institutions.length; i++){
		    var item = $scope.institutions[i];
		    if(item.id == instId){
			return item.name + ', ' + item.address;
		    }
		}
		return null;
	    };
	    $scope.getUserDepartment = function(deptId){
		for(var i=0; i<$scope.departments.length; i++){
		    var item = $scope.departments[i];
		    if (item.id == deptId){
			return item.title;
		    }
		}
		return null;
	    };
	    $scope.getUserDiscipline = function(desciId){
		for(var i=0; i<$scope.disciplines.length; i++){
		    var item = $scope.disciplines[i];
		    if( item.id == desciId){
			return item.name; 
		    }
		}
		return null;
	    };
	    
	    $scope.getUserAffiliation = function(user){
		var aff = '';
		var descipline = $scope.getUserDiscipline(user.discipline);
		var department = $scope.getUserDepartment(user.department);
		var institution = $scope.getUserInstitution(user.institution);
		if (descipline){
		    aff += descipline;
		};
		if(department){
		    aff += ', Department of ' + department; 
		}
		if(institution){
		    aff += ', ' + institution;
		}
		return aff;
	    };
	    // Grab the data from data base
	    abstractFactory.getAllUsers(getUsers);
	    abstractFactory.getInstitutions(getInstitutions);
	    abstractFactory.getDepartments(getDepartments);
	    abstractFactory.getDisciplines(getDisciplines);
	    // initialize variables
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
			    console.log(data.status);
			    if(data.status == 'OK'){
				$location.path('#/abstract/success');
			    }else if(data.status == 'ERR'){
				$scope.errors = data.errors;
			    };
			});
		}
	    };
	    $scope.addAuthor = false;
	    $scope.authorNotListed = false;
	    $scope.showAddAuthorForm = function(){
		$scope.addAuthor = true;
	    };
	    $scope.authorFormData = {};
	    $scope.authorNumber = 2;
	    $scope.addAuthorToList = function(){
		if(arguments.length > 0){
		    $scope.authorFormData = arguments[0];
		    var affiliation = {
			'discipline':  arguments[0].discipline,
			'institution': arguments[0].institution,
			'department': arguments[0].department
		    };
		    $scope.authorFormData.isinDataBase = true;
		    $scope.authorFormData.affiliations = [];
		    $scope.authorFormData.affiliations.push(affiliation);
		} else {
		    var formData =  $scope.authorFormData;
		    var aff = {
			'discipline':  $scope.authorFormData.discipline,
			'institution': $scope.authorFormData.institution,
			'department': $scope.authorFormData.department
		    };
		    formData.affiliations = [];
		    formData.affiliations.push(aff);
		    formData.username = (Math.random()*1000 | 0);
		}
		$scope.authorFormData.order = $scope.authorNumber;
		$scope.authorFormData.presenter = false;
		// avoid duplication of author
		if ($scope.formData.authors.indexOf($scope.authorFormData)){
		    $scope.formData.authors.push($scope.authorFormData);
		}else{
		    console.log("Duplicates?");
		}
		$scope.addAuthor = !$scope.addAuthor;
		$scope.authorFormData = {};
		$scope.authorNumber += 1;
		$scope.cancelAddingAuthor();
	    };
	    $scope.cancelAddingAuthor = function(){
		$scope.addAuthor = !$scope.addAuthor;
		$scope.authorNotListed = !$scope.authorNotListed; 
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
	    $scope.addNewAffiliation = function(author){
		addAffiliationFactory.updateUser(author);
	    };
	      // VALIDATORS
	    $scope.abstractFormIsValid = function(){
		if(!$scope.addAuthor && !$scope.authorNotListed){
		    return ($scope.abstractForm.title.$valid &&
			$scope.abstractForm.advisor.$valid &&
			$scope.abstractForm.type.$valid &&
			$scope.abstractForm.abstractBody.$valid);
		}
		return false;
	    };
	    $scope.authorFormIsValid = function(){
		return ($scope.abstractForm.firstname.$valid &&
			$scope.abstractForm.lastname.$valid &&
			$scope.abstractForm.email.$valid &&
			$scope.abstractForm.institution.$valid
		       );
	    };
	}]).directive('affiliationModal', ['$modal', function($modal) {
	var affiliationModalController = function($scope, $modalInstance,abstractFactory, addAffiliationFactory) {
	    $scope.user = addAffiliationFactory.user;
	    $scope.addAffiliationFormData = {};
	    var getDisciplines = function(data){
		$scope.disciplines = data;
	    };
	    
	    var getDepartments = function(data){
		$scope.departments = data;
	    };
	    var getInstitutions = function(data){
		$scope.institutions = data;
	    };
	    abstractFactory.getDisciplines(getDisciplines);
	    abstractFactory.getDepartments(getDepartments);
	    abstractFactory.getInstitutions(getInstitutions);
	    
	    // close the modal
	    $scope.cancel = function(){
		$modalInstance.dismiss('cancel');
            };
	    
	    // update the affiliation
	    $scope.addAffiliation = function(){
		addAffiliationFactory.updateAffiliation($scope.addAffiliationFormData);
		$scope.addAffiliationFormData = {};
		$scope.cancel();
	    };
	};
	return {
            restrict: 'A',
            scope: {
		affiliationModal:"&"
            },
            link: function(scope, element, attrs) {
		element.bind('click', function() {
		    var modalInstance = $modal.open({
			templateUrl: 'app/components/abstract/addAffiliation.html',
			controller: affiliationModalController,
			size: 'lg',
			backdrop: 'static',
			backdropClass: 'black-modal'
		    });
		    
		    modalInstance.result.then(function() {
			scope.openModal();
		    }, function() {
			//Modal dismissed
		    });
		    
		});
		
            }
	};
    }]).service('addAffiliationFactory', function(){
	var factory = {};
	factory.user = {
	    'firstname': 'Upendra',
	    'lastname': 'Dhakal'
	};
	factory.updateUser = function(formData){
	    factory.user = formData;
	};
	factory.updateAffiliation = function(formData){
	    var obj1 = factory.user.affiliations;
	    var isIn = false;
	    for(var i=0; i<obj1.length; i++){
		var curr = obj1[i]; 
		console.log(curr);
		console.log(formData);
		if(formData.institution == curr.institution && formData.discipline == curr.institution && formData.department == curr.department){
		    isIn = true;
		}
	    }
	    if(!isIn){
		factory.user.affiliations.push(formData);
	    }
	};
	return factory;
    });



















