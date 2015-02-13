var homePageModule = angular.module('homePageModule', ['ui.bootstrap', 'openModalDirective']);
homePageModule.controller('slideShowController', function ($scope) {
    var image = function(src, caption){
	this.image = src;
	this.caption = typeof caption !== 'undefinde' ? caption: "";
    };
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    slides.push(new image('assests/img/home/slideshow1.JPG'));
    slides.push(new image('assests/img/home/slideshow2.jpg'));
    slides.push(new image('assests/img/home/slideshow3.JPG'));
    slides.push(new image('assests/img/home/slideshow4.JPG'));
});

homePageModule.controller('loginFormController', ['$rootScope','$scope','$sce', '$modal','$http','$location', function($rootScope, $scope, $sce, $modal, $http, $location, $route) {
    $scope.user = {};
    $scope.user.login = true;
    $scope.login = function(){
	if(true)$http
	    .post('assests/php_scripts/login.php', $scope.user)
	    .success(function(data){
		console.log(data.status);
		if(data.status.trim() == "login_sucess"){
		    $location.path('#/');
		    $rootScope.root_user = data.user;
		    $route.reload();
		}else if(data.status.trim() == 'ERR'){
		    $scope.error = $sce.trustAsHtml(data.error);
		}
	    });
    };
}]);

homePageModule.controller('signUpFormController', ['$scope','$http', '$location', 'abstractFactory', function($scope, $http, $location, abstractFactory){
    $scope.user = {};
    $scope.error = 'You will see the submit button only if you fill the form correctly.';
    $scope.user.signup = true;
    var getDepartments = function(data){
	$scope.departments = data;
    };
    var getInstitutions = function(data){
	$scope.institutions = data;
    };
    var getDisciplines = function(data){
	$scope.disciplines = data;
    };
    abstractFactory.getInstitutions(getInstitutions);
    abstractFactory.getDepartments(getDepartments);
    abstractFactory.getDisciplines(getDisciplines);
    $scope.signup = function() {
	console.log("Clicked!");
	if ($scope.signupFormIsValid()){
	    console.log("Yes is valid");
	    $http
		.post('assests/php_scripts/signup.php', $scope.user)
		.success(function(data){
		    console.log(data);
		    if(data.trim() == '200'){
			$location.path('#/');
		    }else if(data.trim() == '500'){
			$scope.error = 'There is an accout associated with that email address. Please login to continue';
			console.log($scope.error);
		    }else if(data.trim() == '501'){
			$scope.error = 'That username is already taken. Plese choose another.';
		    }
		});
	}else{
	    console.log("Please fill all the fields correctly");
	};
    };
    
    // Validator
    $scope.printValidity = function(){
	console.log($scope.minValid());
    };
    $scope.minValid = function(){
	return($scope.signupForm.firstname.$valid &&
	       $scope.signupForm.lastname.$valid &&
	       $scope.signupForm.username.$valid &&
	       $scope.signupForm.email.$valid &&
	       $scope.signupForm.password.$valid &&
	       $scope.signupForm.institution.$valid &&
	       $scope.signupForm.discipline.$valid
	      );
    };
    $scope.validInstitution = function(){
	console.log($scope.signupForm.instName.$valid);
	    return ($scope.signupForm.instName.$valid &&
		    $scope.signupForm.instCity.$valid &&
		    $scope.signupForm.instState.$valid &&
		    $scope.signupForm.instZip.$valid
		   );
	};
    $scope.signupFormIsValid = function(){ 
	if ($scope.user.institution == '2'){
	    return $scope.minValid && $scope.signupForm.department.$valid;
	}else if($scope.user.institution == '1'){
	    return ($scope.minValid() && $scope.validInstitution());
	}else{
	    return $scope.minValid();
	}
    };    
}]);
angular.module('openModalDirective', ['ui.bootstrap'])
    .directive('openModal', ['$modal', function($modal) {
	var instructionModalController = function($scope, $modalInstance) {
				  $scope.formInstructions = formInstructions;
	    $scope.abstractInstructions = abstractInstructions;
            $scope.cancel = function() {
		$modalInstance.dismiss('cancel');
            };
	     $scope.ok = function() {
		$modalInstance.close();
	    };
	};
	return {
            restrict: 'A',
            scope: {
		ngReallyClick:"&"
            },
            link: function(scope, element, attrs) {
		element.bind('click', function() {
		    var modalInstance = $modal.open({
			templateUrl: 'app/components/home/instructionModalView.html',
			controller: instructionModalController,
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
    }]);
