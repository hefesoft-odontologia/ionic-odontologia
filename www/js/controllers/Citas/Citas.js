angular.module('starter')
.controller('citasCtrl', ['$scope', 'dataTableStorageFactory', 'users', '$cordovaPush', 'pushFactory', 'emailFactory',
	function ($scope, dataTableStorageFactory, users, $cordovaPush, pushFactory, emailFactory) {
	
	$scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true
	$scope.listado = [];


	$scope.aceptar = function(item){
		item['aceptado'] = true;
		item.aceptadaPrestador = 1;
		var usuario = users.getCurrentUser();
		var textoCita = 'Aceptada';
		var textoEmail = "La cita solicitada ha sido aceptada";

		pushFactory.enviarMensajeUsername(item.usuarioEmail, textoCita);
		emailFactory.enviarEmail(usuario.email, item.usuarioEmail, 'Solicitud de cita', textoEmail, textoEmail);		
		dataTableStorageFactory.saveStorage(item);
	}

	$scope.cancelar = function(item){
		item['aceptado'] = false;
		item.aceptadaPrestador = 2;
		var textoCita = 'Denegada';
		var textoEmail = "La cita solicitada ha sido denegada";
		pushFactory.enviarMensajeUsername(item.usuarioEmail, textoCita);		
		emailFactory.enviarEmail(usuario.email, item.usuarioEmail, 'Solicitud de cita', textoEmail, textoEmail);
		dataTableStorageFactory.saveStorage(item);	
	}

	function cargarCitas(){
		var usuario = users.getCurrentUser();
		dataTableStorageFactory.getTableByPartition('TmCitas', usuario.username)
		.success(success)
		.error(error);
	}

	function success(data){
		$scope.listado = data;		
	}

	function error(error){
		console.log(error);
	}

	cargarCitas();

}])