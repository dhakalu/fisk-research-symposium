var homePageModule = angular.module('homePageModule', ['ui.bootstrap', 'openModalDirective']);

homePageModule.controller('instructionModalController', ['$scope', '$modal', function($scope, $modal) {
    $scope.items = ['item1', 'item2', 'item3'];
}]);

angular.module('openModalDirective', ['ui.bootstrap'])
    .directive('openModal', ['$modal', function($modal) {
	var ModalInstanceCtrl = function($scope, $modalInstance) {
	    
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
			controller: ModalInstanceCtrl,
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
			templateUrl: 'app/components/home/signUpView.html',
			controller:  signUpModalController,
			size: 'lg',
			backdrop: 'static',
			backdropClass: 'black-modal'
		    });
		    
		    modalInstance.result.then(function() {
			scope.ngReallyClick();
		    }, function() {
			//Modal dismissed
		    });
		    
		});
		
            }
	};
    }]);
