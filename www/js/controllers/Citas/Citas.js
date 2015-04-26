angular.module('starter')
.controller('citasCtrl', ['$scope', 'dataTableStorageFactory', 'users', '$cordovaPush', 'pushFactory', 'emailFactory',
	function ($scope, dataTableStorageFactory, users, $cordovaPush, pushFactory, emailFactory) {
	
	$scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true
	$scope.listado = [];


	$scope.aceptar = function(item){
		item['aceptado'] = true;
		var usuario = users.getCurrentUser();
		var textoCita = 'Cita pedida a: ' + item.RowKey + ' aceptada';
		pushFactory.enviarMensajePlatform(item.RowKey, textoCita, item.platform);
		emailFactory.enviarEmail(usuario.email, item.RowKey, 'Solicitud de cita', textoCita, textoCita);
		dataTableStorageFactory.saveStorage(item);
	}

	$scope.cancelar = function(item){
		item['aceptado'] = false;

		var textoCita = 'Cita pedida a: ' + item.RowKey + ' no aceptada';
		pushFactory.enviarMensajePlatform(item.RowKey,textoCita, item.platform);
		emailFactory.enviarEmail(usuario.email, item.RowKey, 'Solicitud de cita', textoCita, textoCita);

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