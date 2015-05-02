angular.module('starter')
.service('piezasService', ['$rootScope', function ($rootScope) {
	
	var dataFactory = {};
	var PiezasDentales = [];
	var COP;
	var CEO;

	dataFactory.setPiezas = function(data){
		convertirstringArray(data);
		PiezasDentales = data;

		calculoCeo(PiezasDentales);
		calculoCop(PiezasDentales);
		COP = dataFactory.numeroCOP();
		CEO = dataFactory.numeroCEO();
		generarEventoIndices();
	}

	dataFactory.recalcular = function(){		
		calculoCeo(PiezasDentales);
		calculoCop(PiezasDentales);
		COP = dataFactory.numeroCOP();
		CEO = dataFactory.numeroCEO();
		generarEventoIndices();
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

	function calculoCeo(coleecion){

		for (var i = 0; i < coleecion.length; i++) {
			var item = coleecion[i];

			if(item.Tipo_Diente == "Temporal"){
				
				var central = stringToBoolean(_.result(_.find(item.centralItems, { 'IndiceCEO': "True" }), 'IndiceCEO'));
				var izquierda = stringToBoolean(_.result(_.find(item.izquierdaItems, { 'IndiceCEO': "True" }), 'IndiceCEO'));
				var derecha = stringToBoolean(_.result(_.find(item.derechaItems, { 'IndiceCEO': "True" }), 'IndiceCEO'));
				var abajo = stringToBoolean(_.result(_.find(item.abajoItems, { 'IndiceCEO': "True" }), 'IndiceCEO'));
				var arriba = stringToBoolean(_.result(_.find(item.arribaItems, { 'IndiceCEO': "True" }), 'IndiceCEO'));
				var inferior = stringToBoolean(_.result(_.find(item.inferiorItems, { 'IndiceCEO': "True" }), 'IndiceCEO'));
				var superior = stringToBoolean(_.result(_.find(item.superiorItems, { 'IndiceCEO': "True" }), 'IndiceCEO'));
				var piezaCompleta = stringToBoolean(_.result(_.find(item.piezaCompletaItems, { 'IndiceCEO': "True" }), 'IndiceCEO'));				

				var indice = (central || izquierda || derecha || abajo || arriba || inferior || superior || piezaCompleta);
				item.IndiceCEO = indice;

			}
		};

	}

	function calculoCop(coleecion){

		for (var i = 0; i < coleecion.length; i++) {
			var item = coleecion[i];

			if(item.Tipo_Diente == "Permanente"){
				
				var central = stringToBoolean(_.result(_.find(item.centralItems, { 'IndiceCOP': "True" }), 'IndiceCOP'));
				var izquierda = stringToBoolean(_.result(_.find(item.izquierdaItems, { 'IndiceCOP': "True" }), 'IndiceCOP'));
				var derecha = stringToBoolean(_.result(_.find(item.derechaItems, { 'IndiceCOP': "True" }), 'IndiceCOP'));
				var abajo = stringToBoolean(_.result(_.find(item.abajoItems, { 'IndiceCOP': "True" }), 'IndiceCOP'));
				var arriba = stringToBoolean(_.result(_.find(item.arribaItems, { 'IndiceCOP': "True" }), 'IndiceCOP'));
				var inferior = stringToBoolean(_.result(_.find(item.inferiorItems, { 'IndiceCOP': "True" }), 'IndiceCOP'));
				var superior = stringToBoolean(_.result(_.find(item.superiorItems, { 'IndiceCOP': "True" }), 'IndiceCOP'));
				var piezaCompleta = stringToBoolean(_.result(_.find(item.piezaCompletaItems, { 'IndiceCOP': "True" }), 'IndiceCOP'));			

				var indice = (central || izquierda || derecha || abajo || arriba || inferior || superior || piezaCompleta);
				item.IndiceCOP = indice;
			}
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

	function generarEventoIndices(){
		$rootScope.$broadcast('CEO-COP', { indiceCEO : CEO, indiceCOP : COP });
	}

	function stringToBoolean(string){
		var val = (string === "True");
		return val;
	}

	dataFactory.numeroCOP = function(){
		var items = _.where(PiezasDentales, { 'IndiceCOP': true });
		var numeroItems = _.size(items);
		return numeroItems;
	}

	dataFactory.numeroCEO = function(){
		var items = _.where(PiezasDentales, { 'IndiceCEO': true });
		var numeroItems = _.size(items);
		return numeroItems;
	}

	dataFactory.getCOP = function(){
		return COP;
	}

	dataFactory.getCEO = function(){
		return CEO;
	}


	return dataFactory;

}])