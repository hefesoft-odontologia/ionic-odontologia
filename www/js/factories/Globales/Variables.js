angular.module('starter')
.factory('varsFactoryService', [function () {
	
	var vars = {};
	var pacienteSeleccionado;
	var autologueado = true;

	vars.fijarPaciente = function(paciente){
		pacienteSeleccionado = paciente;
	}

	vars.pacienteSeleccionado = function(){
		return pacienteSeleccionado;
	}

	vars.getAutologueado = function(){
		return autologueado;
	}

	vars.setAutologueado = function(valor){
		autologueado = valor;
	}

	return vars;

}])