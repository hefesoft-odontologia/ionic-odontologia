angular.module('starter')
.service('piezasService', [function () {
	
	var dataFactory = {};
	var PiezasDentales = [];

	dataFactory.setPiezas = function(data){
		convertirstringArray(data);
		PiezasDentales = data;
	}

	dataFactory.getPiezas = function(convertirString){
		if(!angular.isUndefined(convertirString)){
			convertirPiezasAstring(PiezasDentales);
		}

		return PiezasDentales;
	}

	dataFactory.getPiezaByNumber = function(number){

	  var item = _.findIndex(PiezasDentales, function(chr) {
		  return chr.codigo == number;
	   });

	  var Pieza = PiezasDentales[item]; 
	  return Pieza;

	}

	dataFactory.getPiezaByNombre = function(numeroPiezaDental){

	  var item = _.findIndex(PiezasDentales, function(chr) {
		  return chr.numeroPiezaDental == numeroPiezaDental;
	   });

	  var Pieza = PiezasDentales[item]; 
	  return Pieza;

	}

	dataFactory.getTratamientosByNombre = function(numeroPiezaDental){

	  var item = _.findIndex(PiezasDentales, function(chr) {
		  return chr.numeroPiezaDental == numeroPiezaDental;
	   });

	  var Pieza = PiezasDentales[item]; 

	  var array = [];
	  array = array.concat(Pieza.centralItems);
	  array = array.concat(Pieza.izquierdaItems);
	  array = array.concat(Pieza.derechaItems);
	  array = array.concat(Pieza.abajoItems);
	  array = array.concat(Pieza.arribaItems);
	  array = array.concat(Pieza.inferiorItems);
	  array = array.concat(Pieza.superiorItems);
	  array = array.concat(Pieza.piezaCompletaItems);

	  return array;

	}

	function convertirPiezasAstring(PiezasDentales){

		for (var i = 0; i < PiezasDentales.length; i++) {
			var item = PiezasDentales[i];

			if(!validarEsString(item.centralItems)){
				item.centralItems = JSON.stringify(item.centralItems);
			}

			if(!validarEsString(item.izquierdaItems)){
				item.izquierdaItems = JSON.stringify(item.izquierdaItems);
			}

			if(!validarEsString(item.derechaItems)){
				item.derechaItems = JSON.stringify(item.derechaItems);
			}

			if(!validarEsString(item.abajoItems)){
				item.abajoItems = JSON.stringify(item.abajoItems);
			}

			if(!validarEsString(item.arribaItems)){
				item.arribaItems = JSON.stringify(item.arribaItems);
			}

			if(!validarEsString(item.inferiorItems)){
				item.inferiorItems = JSON.stringify(item.inferiorItems);
			}

			if(!validarEsString(item.superiorItems)){
				item.superiorItems = JSON.stringify(item.superiorItems);
			}

			if(!validarEsString(item.piezaCompletaItems)){
				item.piezaCompletaItems = JSON.stringify(item.piezaCompletaItems);
			}
		};

	}

	function convertirstringArray(PiezasDentales){

		for (var i = 0; i < PiezasDentales.length; i++) {
			var item = PiezasDentales[i];			
			item.centralItems = JSON.parse(item.centralItems);			
			item.izquierdaItems = JSON.parse(item.izquierdaItems);			
			item.derechaItems = JSON.parse(item.derechaItems);			
			item.abajoItems = JSON.parse(item.abajoItems);			
			item.arribaItems = JSON.parse(item.arribaItems);			
			item.inferiorItems = JSON.parse(item.inferiorItems);			
			item.superiorItems = JSON.parse(item.superiorItems);			
			item.piezaCompletaItems = JSON.parse(item.piezaCompletaItems);			
		};

	}

	function validarEsString(item){
		if (typeof item === 'string') {
			return true;
		}
		else{
			false
		}
	}


	return dataFactory;

}])