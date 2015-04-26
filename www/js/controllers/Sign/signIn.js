angular.module('starter')
.controller('signInController', 
	['$scope','signFactoryService','$ionicLoading','$state', 'users', 'pushFactory','signalrService', 'varsFactoryService',
	function ($scope, signFactoryService, $ionicLoading, $state, users, pushFactory, signalrService, varsFactoryService) {
	
	$scope.loginData= {};
	var usuario = users.getCurrentUser();

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
		$ionicLoading.show();
		signFactoryService.sign($scope.loginData).then(success, error);
	}

	function success(data){
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
		//signalrService.sendMessage('futbolito152@gmail.com', {mensaje : 'mensaje', to: 'futbolito152@gmail.com'});
	}

	function error(data){
		console.log(data);
		$ionicLoading.hide();
	}

}])