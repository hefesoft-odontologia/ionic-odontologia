angular.module('starter').
service('validarNavegacionService', ['users', '$state', 'varsFactoryService', function (users, $state, varsFactoryService) {
	
 	this.validarPacienteSeleccionado = function (){ 		
		var usuario = users.getCurrentUser();
    	var paciente = varsFactoryService.pacienteSeleccionado();

    	if(!usuario){
    		$state.go("sigin");
    	}
    	else if(!paciente){
    		$state.go("app.pacientes");
    	}
 	}


}])