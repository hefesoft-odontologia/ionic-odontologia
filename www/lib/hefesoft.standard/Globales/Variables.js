angular.module('starter')
.factory('varsFactoryService', [function () {
	
	var vars = {};
	var prestadorSeleccionado;

	vars.fijarPrestador = function(prestador){
		prestadorSeleccionado = prestador;
	}

	vars.prestadorSeleccionado = function(){
		return prestadorSeleccionado;
	}

	return vars;
	
}])