angular.module('peopleControllers', []).
    controller('allPeopleController', ['$scope', 'peopleFactory', 'abstractFactory', function($scope, peopleFactory, abstractFactory){
	var allPeople = [];
	for( p in people){
	    allPeople.push(peopleFactory.getPeopleById(p));
	}
	$scope.allPeople = allPeople;
    }]).
    controller('advisorsPageController', ['$scope', function($scope){
	var advisors = [];
	facultyAdvisors.forEach(function(item){
	    advisors.push(
		{
		    'personalDetails': people[item],
		    'professionalDetails': facultyStaff[item]
		}
	    );
	});
	$scope.advisors = advisors;
    }]).
    controller('externalPeopleController', ['$scope', function($scope){
	
    }])
;
