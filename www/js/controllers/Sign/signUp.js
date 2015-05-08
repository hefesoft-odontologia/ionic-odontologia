angular.module('starter')
.controller('signUpController', ['$scope', 'signFactoryService','$ionicLoading', 'validarNavegacionService', 'messageService','$state', 'connectionMode', 'inicializarServicios',
	function ($scope, signFactoryService, $ionicLoading, validarNavegacionService, messageService, $state, connectionMode, inicializarServicios) {
	
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
		messageService.showMessage("Bienvenido: " + $scope.loginData.username);
	}

	function successLogin(data){
		console.log(data);
		$ionicLoading.hide();
		inicializarServicios.inicializar($scope.loginData.username);
		$state.go("app.pacientes");
	}

	function error(data){
		$ionicLoading.hide();
		console.log(data);
		messageService.showMessage("Error al registrar usuario");
	}

}])