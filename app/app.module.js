
var rSApp = angular.module('rSApp', [
    'ngRoute',
    'rSAppRoutes',
    'homePageModule',
    'homeDirectives',
    'abstractModule',
    'abstractDirectives',
    'peopleModule'
])
    .factory('abstractFactory', function(){
	var factory = {};
	// Returns the full name of the people
	var getFullName = function(peopleId){
	    var currPeople = people[peopleId];
	    return currPeople.firstname + ' ' + currPeople.lastname;
	};
	
	// returns the year of the person with the given id
	factory.getSchoolYear = function(personId){
	    var schoolYear = people[personId].schoolYear;
	    if (schoolYear == null || schoolYear == ""){
		return "N/A";
	    }
	    var years = ["Faculty", // 0
			 "Freshman", // 1
			 "Sophomore",  // 2
			 "Junior",  //3
			 "Senior", //4
			 "Graduate", //5
			 "Research Staff", // 6
			 "Admin Staff"]; // 7
	    return years[schoolYear];
	};
	var getDepartmentName = function(disciplineId){
	var deptId = disciplineNames[disciplineId].deptId;
	var dept = "";
	    if (deptId != null && deptId != ""){
		dept = "Department of " + deptNames[deptId] + ", ";
	    }
	    return dept;
	};
	factory.getAffiliationsDetails = function(paperId){
	    var pAff = papersWithAffiliations[paperId]; 
	    var id, symbol, disciplineId, unilabId;
	    var returnObj = [];
	    for(var i=0; i<pAff.length; i++){
		sam = {};
		id = pAff[i]; 
		symbol = affiliations[id].symbol;
		if (symbol != "0"){
		    sam.symbol = symbol;
		}
		disciplineId = affiliations[id].discipline;
		if (disciplineId == "wellness"){
		    sam.school = "Fisk-Meharry Wellness & Healthcare Project; ";
		} else if (disciplineId == "bad"){
		    aff = getDepartmentName(disciplineId);
		    unilabId = affiliations[id].university;
		    aff += unilabNames[unilabId];
		    sam.school = aff;
		}else{ 
		    var aff = disciplineNames[disciplineId].name + ', ';
		    aff += getDepartmentName(disciplineId);
		    unilabId = affiliations[id].university;
		    aff += unilabNames[unilabId];
		    sam.school = aff;
		}
		returnObj.push(sam);
	    } 
	    return returnObj;
};
	// returns the authors of the given abstract
	factory.getAuthors = function(abstractId){
	    console.log(abstractId);
	    var allAuthors = [];
	    papersWithAuthors[abstractId].forEach(function(item){
		item.name = getFullName(item.personId);
		allAuthors.push(item);
	    });
	    return allAuthors;
	};
	
	// returns all the abstracts related to the given people
	factory.getAbstractsByPeople = function(peopleId){
	    var abstracts = [];
	    presenters.forEach(function(item){
		console.log(item);
		if( item.presenterId == peopleId){
		    abstracts.push(item.paperId);
		}
	    });
	    return abstracts;
	};

	factory.getPaperById = function(paperId){
	    var currPaper= papers[paperId];
	    return {
		'id': paperId,
		'title': currPaper.title,
		'presenter': people[currPaper.presenter],
		'authors': factory.getAuthors(paperId)
	    };
	};

	return factory;
    })
    .controller('singleAbstractController', ['$scope', '$routeParams','abstractFactory', 'peopleFactory', function($scope, $routeParams, abstractFactory, peopleFactory){
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
    $scope.submitAbstract = function(){
	if($scope.abstractForm.$valid){
	    $http.post('assests/php/submit.php', $scope.formData);
	}
	console.log($scope.formData);
    };
}]).controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'app/components/abstract/authorSubmissionView.html',
      controller: 'ModalInstanceCtrl',
      size: size,
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
}).controller('ModalInstanceCtrl', function ($scope, $modalInstance, $http) {
  $scope.authorFormData = {}
  $scope.submitForm = function () {
  	$http.post('assests/php_scripts/submitAuthors.php', $scope.authorFormData);
  	console.log($scope.authorFormData);
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
})
