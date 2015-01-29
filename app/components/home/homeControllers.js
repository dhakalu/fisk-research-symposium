var homePageModule = angular.module('homePageModule', ['ui.bootstrap', 'openModalDirective']);

homePageModule.controller('instructionModalController', ['$scope', '$modal', function($scope, $modal) {
    $scope.items = ['item1', 'item2', 'item3'];
}]);

angular.module('openModalDirective', ['ui.bootstrap'])
    .directive('openModal', ['$modal', function($modal) {
	var ModalInstanceCtrl = function($scope, $modalInstance) {
	    $scope.ok = function() {
		$modalInstance.close();
	    };
	    
            $scope.cancel = function() {
		$modalInstance.dismiss('cancel');
            };
	};
	
	return {
            restrict: 'A',
            scope: {
		ngReallyClick:"&"
            },
            link: function(scope, element, attrs) {
		element.bind('click', function() {
		    var message = attrs.ngReallyMessage || "Are you sure ?";
		    var modalInstance = $modal.open({
			templateUrl: 'app/components/home/instructionModalView.html',
			controller: ModalInstanceCtrl,
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
    }
			    ]);
