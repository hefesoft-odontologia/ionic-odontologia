angular.module('starter').
service('validarNavegacionService', ['users', '$state', 'varsFactoryService', function (users, $state, varsFactoryService) {
	
 	this.validarPacienteSeleccionado = function (){ 		
		var usuario = users.getCurrentUser();
    	var paciente = varsFactoryService.prestadorSeleccionado();
    	var valido = true;

    	if(!usuario){
    		valido = false;
    		$state.go("sigin");
    	}
    	else if(!paciente){
    		valido = false;
    		$state.go("app.citas");
    	}

    	return valido;

 	}

    this.validarUsuarioSeleccionado = function (){         
        var usuario = users.getCurrentUser();        
        var valido = true;

        if(!usuario){
            valido = false;
            $state.go("sigin");
        }       

        return valido;

    }


}])