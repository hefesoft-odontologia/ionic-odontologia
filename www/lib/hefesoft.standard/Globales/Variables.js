angular.module('starter')
.factory('varsFactoryService', [function () {
	
	var vars = {};
	var pacienteSeleccionado;
	var prestadorSeleccionado;
	var captcha;
	var captchaFijado = false;	
	var autologueado = true;


	vars.fijarPrestador = function(prestador){
		prestadorSeleccionado = prestador;
	}

	vars.captchaSet = function(response){
		captcha = response;
		captchaFijado = true;
	}

	vars.captchaFijado = function(){
		return captchaFijado;
	}

	vars.prestadorSeleccionado = function(){
		return prestadorSeleccionado;
	}

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