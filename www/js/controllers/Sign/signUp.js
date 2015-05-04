angular.module('starter')
.controller('signUpController', ['$scope', 'signFactoryService','$ionicLoading', 'validarNavegacionService', 'messageService','$state',
	function ($scope, signFactoryService, $ionicLoading, validarNavegacionService, messageService, $state) {
	
	validarNavegacionService.validarCaptcha();
	$scope.loginData= {};

	$scope.doSignUp = function(){
		$ionicLoading.show();
		signFactoryService.signUp($scope.loginData).then(success, error);
	}

	$scope.goLogin = function(){
		$state.go("sigin");
	}

	//Apenas se registre se loguea en la app
	function success(data){
		signFactoryService.sign(data)
		.then(successLogin, error);
		messageService.showMessage("Usuario registrado ahora podra ingresar al sistema");
	}

	function successLogin(data){
		console.log(data);
		$ionicLoading.hide();
	}

	function error(data){
		$ionicLoading.hide();
		console.log(data);
		messageService.showMessage("Error al registrar usuario");
	}

}])