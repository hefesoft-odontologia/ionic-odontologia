angular.module('starter')
.service('crearPropiedades', [function () {
	
	/*Toma un elemento y lo usa para crear propiedades en el otro*/
	this.fill = function(elemento1, elemento2){
		for(var propertyName in elemento1) {					
			elemento2[propertyName] = elemento1[propertyName];
		}
	}

}])