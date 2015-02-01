angular.module('peopleRoutes', []).
    config(function($routeProvider){
	$routeProvider.
	    when('/people/all', {
		templateUrl: 'app/components/people/allPeopleView.html',
		controller: 'allPeopleController'
	    }).
	    when('/people/presenters', {
		templateUrl: 'app/components/people/presentersView.html'
	    }).
	    when('/people/advisors', {
		templateUrl: 'app/components/people/advisorsView.html',
		controller: 'advisorsPageController'
	    }).
	    when('/people/external',{
		templateUrl: 'app/components/people/externalAdvisiorsView.html',
		controller: 'externalPeopleController'
	    }).
	    when('/people/organization', {
		templateUrl: 'app/components/people/organizationPeopleView.html'
	    }).
	    when('/people/judges', {
		templateUrl: 'app/components/people/judgesView.html'
	    }).
	    when('/people/adminstaff', {
		templateUrl: 'app/components/people/adminStaffView.html'
	    });
	
    });
