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

	dataFactory.getModifiedPiezas = function(){
		//Se convierten las que han sido modificadas a string
		dataFactory.getPiezas(true);
		var array = _.where(PiezasDentales, { 'Modificado': true });
		fijarModificadoFalso();
		return array;
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

	dataFactory.getAllTratamientos = function(){

	  var piezas = dataFactory.getPiezas(true);
	  var tratamientos = [];

	  for (var i = 0; i < piezas.length; i++) {
			var result = dataFactory.getTratamientosByNombre(piezas[i].numeroPiezaDental)
			tratamientos = tratamientos.concat(result);
	  };

	  return tratamientos;

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
	  array = array.concat(Pieza.piezacompletaItems);

	  return array;

	}

	function convertirPiezasAstring(PiezasDentales){

		for (var i = 0; i < PiezasDentales.length; i++) {
			var item = PiezasDentales[i];

			//Variable para computar los pendientes
			var p1,p2,p3,p4,p5,p6,p7,p8;			
			if(item.Modificado == true){

				if(!validarEsString(item.centralItems)){
					p1 = _.result(_.find(item.centralItems, { 'realizado': "NO" }), 'realizado');
					item.centralItems = JSON.stringify(item.centralItems);				
				}

				if(!validarEsString(item.izquierdaItems)){					
					p2 = _.result(_.find(item.izquierdaItems, { 'realizado': "NO" }), 'realizado');
					item.izquierdaItems = JSON.stringify(item.izquierdaItems);
				}

				if(!validarEsString(item.derechaItems)){					
					p3 = _.result(_.find(item.derechaItems, { 'realizado': "NO" }), 'realizado')
					item.derechaItems = JSON.stringify(item.derechaItems);
				}

				if(!validarEsString(item.abajoItems)){
					p4 = _.result(_.find(item.abajoItems, { 'realizado': "NO" }), 'realizado');
					item.abajoItems = JSON.stringify(item.abajoItems);					
				}

				if(!validarEsString(item.arribaItems)){
					p5 = _.result(_.find(item.arribaItems, { 'realizado': "NO" }), 'realizado');
					item.arribaItems = JSON.stringify(item.arribaItems);					
				}

				if(!validarEsString(item.inferiorItems)){
					p6 = _.result(_.find(item.inferiorItems, { 'realizado': "NO" }), 'realizado')
					item.inferiorItems = JSON.stringify(item.inferiorItems);					
				}

				if(!validarEsString(item.superiorItems)){
					p7 = _.result(_.find(item.superiorItems, { 'realizado': "NO" }), 'realizado')
					item.superiorItems = JSON.stringify(item.superiorItems);					
				}

				if(!validarEsString(item.piezacompletaItems)){
					p8 = _.result(_.find(item.piezacompletaItems, { 'realizado': "NO" }), 'realizado')
					item.piezacompletaItems = JSON.stringify(item.piezacompletaItems);					
				}

				if(p1 || p2 || p3 || p4 || p5 || p6 || p7 || p8){
					PiezasDentales[i]["Pendientes"] = "Tiene pendientes";
				}
				else{
					PiezasDentales[i]["Pendientes"] = "Sin pendientes";	
				}
			}
		};
	}

	function fijarModificadoFalso(){
		for (var i = 0; i < PiezasDentales.length; i++) {
			var item = PiezasDentales[i];
			if(item.Modificado == true){
				item.Modificado = false;
			}
		}
	}


	function convertirstringArray(PiezasDentales){

		for (var i = 0; i < PiezasDentales.length; i++) {
			var item = PiezasDentales[i];	

			try{		
				item.centralItems = JSON.parse(item.centralItems);			
				item.izquierdaItems = JSON.parse(item.izquierdaItems);			
				item.derechaItems = JSON.parse(item.derechaItems);			
				item.abajoItems = JSON.parse(item.abajoItems);			
				item.arribaItems = JSON.parse(item.arribaItems);			
				item.inferiorItems = JSON.parse(item.inferiorItems);			
				item.superiorItems = JSON.parse(item.superiorItems);			
				item.piezacompletaItems = JSON.parse(item.piezacompletaItems);
			}
			catch(ex){
				console.log("Parseando procedimientos " + ex + " " + item.numeroPiezaDental);
			}
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
				var piezaCompleta = stringToBoolean(_.result(_.find(item.piezacompletaItems, { 'IndiceCEO': "True" }), 'IndiceCEO'));				

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
				var piezaCompleta = stringToBoolean(_.result(_.find(item.piezacompletaItems, { 'IndiceCOP': "True" }), 'IndiceCOP'));			

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