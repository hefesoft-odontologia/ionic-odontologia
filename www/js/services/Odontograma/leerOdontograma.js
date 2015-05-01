/*
	Del servicio viene un odontograma este servicio se encarga de manejarlo y presentarlo graficamente
*/

angular.module('starter')
.service('leerOdontogramaServices', ['$rootScope', 'tratamientosPorPiezaDental', 'indicesServices', 
	function ($rootScope, tratamientosPorPiezaDental, indicesServices) {	
	
	this.odontogramaToUi = function(data){	
	
		tratamientosPorPiezaDental.setdata(data);
		
		for (var i = 0; i < data.length; i++) {
			var item = data[i];
			var nombreEvento = "leer" + item.numeroPiezaDental;
			$rootScope.$broadcast(nombreEvento, { seleccionado : item, numeroPiezaDental : item.numeroPiezaDental });
			indicePlacaBacteriana(item);
		};

	}

	function indicePlacaBacteriana(item){
		indicesServices.setIndicePlacaBacteriana(item);
	}

}])