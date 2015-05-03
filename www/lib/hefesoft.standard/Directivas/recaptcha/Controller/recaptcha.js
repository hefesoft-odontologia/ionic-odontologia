angular.module('starter').
controller('recaptchaController', ['$scope', '$state', '$timeout', 'varsFactoryService', 
	function($scope, $state, $timeout, varsFactoryService){
	
	$scope.activarIngreso = false;

	if(varsFactoryService.getModoDesarrollo()){
		varsFactoryService.captchaSet("development");
		$scope.activarIngreso = true;
		$state.go("sigin");
	}

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