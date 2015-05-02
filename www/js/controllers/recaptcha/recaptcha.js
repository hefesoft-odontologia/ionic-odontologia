angular.module('starter').
controller('recaptchaController', ['$scope', '$state', '$timeout', 'varsFactoryService', 
	function($scope, $state, $timeout, varsFactoryService){
	
	$scope.activarIngreso = false;

	$scope.irLogin = function(){
		$state.go("sigin");
	}

	 $timeout(iniciarCaptcha, 5000);

	 function iniciarCaptcha(){

	 	grecaptcha.render('captcha', {
	      'sitekey' : '6LcuNwYTAAAAAJjbc9x9utQtFmRiBYVfOh9_6KwU"',
	      'callback' : verifyCallback,
	      'theme' : 'light'
    	});

	 }


	

    var verifyCallback = function(response) {  
    	$scope.$apply(function () {
    		varsFactoryService.captchaSet(response);
            $scope.activarIngreso = true;
        });
  	};


}])