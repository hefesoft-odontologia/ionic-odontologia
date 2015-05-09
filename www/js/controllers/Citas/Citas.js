angular.module('starter')
.controller('citasCtrl', ['$scope', 'dataTableStorageFactory', 'users', '$cordovaPush', 'pushFactory', 'emailFactory', 'validarNavegacionService', 'conexionSignalR', 'messageService',
	function ($scope, dataTableStorageFactory, users, $cordovaPush, pushFactory, emailFactory, validarNavegacionService, conexionSignalR, messageService) {
	
	$scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true
	$scope.listado = [];

	validarNavegacionService.validarCaptcha();

	$scope.aceptar = function(item){
		item['aceptado'] = true;
		item.aceptadaPrestador = "1";
		var usuario = users.getCurrentUser();
		var textoCita = 'Aceptada';
		var textoEmail = "La cita solicitada ha sido aceptada";

		//pushFactory.enviarMensajeUsername(item.usuarioEmail, textoCita);
		//emailFactory.enviarEmail(usuario.email, item.usuarioEmail, 'Solicitud de cita', textoEmail, textoEmail);		
		dataTableStorageFactory.saveStorage(item).then(function(data){
			//para, de, tipo, mensaje, accion
			var mensaje = [item.RowKey, "cita aprobada"];
			//Debe enviarse con un separador diferente a comas
			mensaje = mensaje.join(";");
        	conexionSignalR.procesarMensaje(item.usuarioEmail, usuario.email, "ejecutar accion", mensaje, "cambio cita prestador");
        	conexionSignalR.procesarMensaje(item.usuarioEmail, usuario.email, "mensaje", "Cita cancelada por " + item.fecha);
		});
	}

	$scope.cancelar = function(item){
		var usuario = users.getCurrentUser();
		item['aceptado'] = false;
		item.aceptadaPrestador = "3";
		var textoCita = 'Denegada';
		var textoEmail = "La cita solicitada ha sido denegada";
		//pushFactory.enviarMensajeUsername(item.usuarioEmail, textoCita);		
		//emailFactory.enviarEmail(usuario.email, item.usuarioEmail, 'Solicitud de cita', textoEmail, textoEmail);
		dataTableStorageFactory.saveStorage(item).then(function(data){			
			//para, de, tipo, mensaje, accion
			var mensaje = [item.RowKey, "cita cancelada"];
			//Debe enviarse con un separador diferente a comas
			mensaje = mensaje.join(";");
        	conexionSignalR.procesarMensaje(item.usuarioEmail, usuario.email, "ejecutar accion", mensaje, "cambio cita prestador");
        	conexionSignalR.procesarMensaje(item.usuarioEmail, usuario.email, "mensaje", "Cita cancelada por " + item.fecha);
		});
	}

	$scope.reloadList = function(){
		cargarCitas();
	}

	//Ocurre cuando un paciente cancela una cita
	$scope.$on("cita cancelada", function(event, args) {
       try{
           var array = args.mensaje.split(';');
           var RowKey = array[0];
           var cambio = array[1];

           var cita = _.find($scope.listado, { 'RowKey': RowKey })

           if(cambio == "cita cancelada"){              
              cambioEstado(cita, "3");
              messageService.showMessage("Cita cancelada por " + cita.RowKey + " " + cita.fecha);
           }                        
       }
       catch(ex){
            messageService.showMessage("Una cita a sido cancelada"); 
       }       
    })

    //Ocurre cuando un paciente cancela una cita
	$scope.$on("nueva cita", function(event, args) {
       try{
           var array = args.mensaje.split(';');
           var RowKey = array[0];
           var cambio = array[1];

           var cita = _.find($scope.listado, { 'RowKey': RowKey })

           if(cambio == "cita cancelada"){              
              cambioEstado(cita, "3");
              messageService.showMessage("Cita cancelada por " + cita.RowKey + " " + cita.fecha);
           }                        
       }
       catch(ex){
            messageService.showMessage("Una cita a sido cancelada"); 
       }       
    })

    function cambioEstado(cita,  estado){
        $scope.$apply(function () {
             cita.aceptadaUsuario = estado;
        });
    }

	function cargarCitas(){
		$ionicLoading.show();
		var usuario = users.getCurrentUser();
		dataTableStorageFactory.getTableByPartition('TmCitas', usuario.username)
		.success(success)
		.error(error);
	}

	function success(data){
		$scope.listado = data;
		$ionicLoading.hide();
	}

	function error(error){
		console.log(error);
		$ionicLoading.hide();
	}

	cargarCitas();

}])