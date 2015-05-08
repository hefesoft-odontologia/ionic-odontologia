angular.module('starter')
.controller('signUpController', ['$scope', 'signFactoryService','$ionicLoading', 'validarNavegacionService', 'messageService','$state', 'connectionMode',
	function ($scope, signFactoryService, $ionicLoading, validarNavegacionService, messageService, $state, connectionMode) {
	
	validarNavegacionService.validarCaptcha();
	$scope.loginData= {};

	$scope.doSignUp = function(){
		if(connectionMode.conexionStatus()){
			$ionicLoading.show();
			signFactoryService.signUp($scope.loginData).then(success, error);
		}
		else{
			messageService.showMessage("No se ha detectado una conexion a internet activa");	
		}
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