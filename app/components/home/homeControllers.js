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

homePageModule.controller('loginFormController', ['$scope','$sce', '$modal','$http','$location', function($scope, $sce, $modal, $http, $location) {
    $scope.user = {};
    $scope.user.login = true;
    $scope.login = function(){
	console.log("Hello from login");
	if(true)$http
	    .post('assests/php_scripts/login.php', $scope.user)
	    .success(function(data){
		console.log(data);
		if(data == "login_sucess"){
		    $location.path('#/');
		}else{
		    $scope.error = $sce.trustAsHtml(data);
		}
	    });
	console.log($scope.user);
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
    }]).
    directive('signupModal', ['$modal', function($modal){
	var signUpModalController = function($scope, $modalInstance, $http) {
	    $scope.user = {};
	    $scope.user.signup = true;
	    $scope.signup = function() {
		if (true){
		    $http
			.post('assests/php_scripts/signup.php', $scope.user)
			.success(function(data){
			    if(data == "signup_sucess"){
				$scope.cancel();
			    }else{
				$scope.error = data;
			}
			});
		    console.log($scope.user);
		}
	    };
	    
            $scope.cancel = function() {
		$modalInstance.close();
            };
	};
	
	return {
            restrict: 'A',
            scope: {
		ngSignupModal:"&"
            },
            link: function(scope, element, attrs) {
		element.bind('click', function() {
		    var modalInstance = $modal.open({
			templateUrl: 'app/components/home/signUpView.php',
			controller:  signUpModalController,
			size: 'lg',
			backdrop: 'static',
			backdropClass: 'black-modal'
		    });
		    
		    modalInstance.result.then(function() {
			scope.ngSignupModal();
		    }, function() {
			//Modal dismissed
		    });
		    
		});
		
            }
	};
    }]);
