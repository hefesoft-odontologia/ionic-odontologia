angular.module('starter')
.service('inicializarServicios', ['users', 'stripeService', 'platformService', 'conexionSignalR', 'messageService', 'pushFactory', 'dataTableStorageFactory',
	function (users, stripeService, platformService, conexionSignalR, messageService, pushFactory, dataTableStorageFactory) {

		var dataFactory = {};
		
		dataFactory.inicializar = function(username){

			var user = users.userEmailToUser(username);
			stripeService.getSubscription(user).then(subscripcionActiva, errorStripe);
			
			//Notification Hub
			if(platformService.esMobile()){		
				pushFactory.registerAndroid();
			}

			dataFactory.registrarEnSocket(username);
		}

		dataFactory.registrarEnSocket = function(username){
			//Valida que existan datos en prestador para que se le puedan solicitar citas a el
			datosActualizadosPrestador();

			//para, de, tipo, mensaje, accion
			//Esta instruccion es para inicializar el proxy
        	conexionSignalR.procesarMensaje(username, username, '', "");
		}


		function subscripcionActiva(data){
			var subscripcion =data.StripeCustomer.subscriptions.data[0];
			
			if(subscripcion.status == "trialing"){

				var fechaFinalizaTrial = moment(data.FechaFinalString);
				var diferencia = fechaFinalizaTrial.diff(data.FechaActualString, 'days');
				var mostrarMensaje = (diferencia > 0 && diferencia <=5);

				if(mostrarMensaje){
					messageService.showMessage("Su trial vencera en " + diferencia + " dias");
				}
			}
			else if(subscripcion.status == "active"){
				//no se debe validar nada
			}
			else{
				messageService.showMessage("Suscripcion inactiva");
			}		
		}

		function errorStripe(data){
			if(data == "No ha registrado medio de pago"){
				console.log("No se ha registrado medio de pago");
			}
		}

		function datosActualizadosPrestador(){
			var usuario = users.getCurrentUser();
	    	dataTableStorageFactory.getTableByPartitionAndRowKey('TmPrestador', 'PrestadoresOdontologia', usuario.username)
		  	.success(function(data){
		  		if(data == null){
		  			var msj = "Estimado usuario recuerde actualizar sus datos en el apartado 'Mis datos' de esta manera sera visible para que sus pacientes soliciten citas en el sistema";
		  			messageService.showMessage(msj);
		  		}
		  	})
		  	.error(error);
    	}

    	function error(e){
    		console.log(e);
    	}


		return dataFactory;


}])