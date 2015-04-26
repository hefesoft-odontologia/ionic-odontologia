
angular.module('starter')
.service('sharedDataService', [function () {

	var tratamientoSeleccionado;

	this.putTratamientoSeleccionado = function(tratamiento){
		tratamientoSeleccionado = tratamiento;
	}

	this.getTratamientoSeleccionado = function(){
		return tratamientoSeleccionado;
	}

	
}])