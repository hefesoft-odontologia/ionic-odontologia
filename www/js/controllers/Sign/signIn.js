angular.module('starter')
.controller('signInController', 
	['$scope','signFactoryService','$ionicLoading','$state', 'users', 'pushFactory','signalrService', 'varsFactoryService', 'validarNavegacionService', 'messageService', '$timeout',
	function ($scope, signFactoryService, $ionicLoading, $state, users, pushFactory, signalrService, varsFactoryService, validarNavegacionService, messageService, $timeout) {
	
	validarNavegacionService.validarCaptcha();
	$scope.loginData= {};
	var usuario = users.getCurrentUser();
	var ingresoSatisfactorio = false;

	if(varsFactoryService.getAutologueado()){
		if(!angular.isUndefined(usuario) && usuario.email.length >0){
			$scope.loginData.username = usuario.email;
			$scope.loginData.password = usuario.password;
			
			varsFactoryService.setAutologueado(false);
			//Se busca que en el primer ingreso el usuario no tenga que poner su usuario y contraseña
			//Pero despues pueda volver a esta pagina sin que lo autologuee
			$state.go("app.pacientes");	
		}
	}

	$scope.registrarse = function(){
		$state.go("signup");
	}

	$scope.doSign = function(){
		//Variable de control para el timeout
		ingresoSatisfactorio = false;
		$ionicLoading.show();
		signFactoryService.sign($scope.loginData).then(success, error);
		$timeout(validarToken, 15000);
	}

	function success(data){
		ingresoSatisfactorio = true;
		console.log(data);
		$ionicLoading.hide();
		$state.go("app.pacientes");
		
		//Notification Hub
		pushFactory.registerAndroid();

		//SignalR
		signalrService.inicializarProxy('chatHub')
		.then(proxyInicializado,error,error);

	}

	function proxyInicializado(){
		$timeout(function(){
			signalrService.sendMessage('futbolito152@gmail.com', {mensaje : 'prueba socket', to: 'hefesoft@hotmail.com'});	
		}, 10000);		
	}

	function validarToken(){

		if(!ingresoSatisfactorio){
			messageService.showMessage("Tiempo superado para realizar validacion, por favor intente de nuevo");
		}

		$ionicLoading.hide();
	}

	function error(data){
		console.log(data);
		$ionicLoading.hide();

		if(!ingresoSatisfactorio){
			messageService.showMessage("Usuario o clave incorrectos");

			// Para que no muestre el mensaje en el timer
			ingresoSatisfactorio = true;
		}
	}

}])