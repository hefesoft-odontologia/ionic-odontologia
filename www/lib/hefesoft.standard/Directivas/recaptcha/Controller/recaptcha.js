angular.module('starter').
controller('recaptchaController', ['$scope', '$state', '$timeout', 'varsFactoryService', 
	function($scope, $state, $timeout, varsFactoryService){
	
	$scope.activarIngreso = false;

	$scope.irLogin = function(){
		$state.go("sigin");
	}

	 $scope.setCaptcha = function(response){
    	$scope.$apply(function () {
    		varsFactoryService.captchaSet(response);
            $scope.activarIngreso = true;
        });
  	};
}])