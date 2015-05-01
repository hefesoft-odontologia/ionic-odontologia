angular.module('starter')
.service('indicesServices', ['$rootScope', 'dataTableStorageFactory', 'piezasService' , 'sharedDataService',
	function ($rootScope, dataTableStorageFactory, piezasService, sharedDataService) {
	
	var datafactory = {};
	var indicePlacaBacteriana = 0;
	var IndiceCEO = 0;
	var IndiceCOP = 0;

	datafactory.inicializar = function(item){
		indicePlacaBacteriana = 0;	
		IndiceCEO = 0;
		IndiceCOP = 0;
	}

	/* indice placa bacteriana */
	datafactory.setIndicePlacaBacteriana = function(item){
		if(item.IndicePlacaBacteriana == "True" || item.IndicePlacaBacteriana == "true" || item.IndicePlacaBacteriana == "1"){
			indicePlacaBacteriana = indicePlacaBacteriana + 1;
			$rootScope.$broadcast('idice placa bacteriana', { indice : indicePlacaBacteriana });
		}
	}

	datafactory.deleteIndicePlacaBacteriana = function(item){
		if(item.IndicePlacaBacteriana == "True" || item.IndicePlacaBacteriana == "true" || item.IndicePlacaBacteriana == "1"){
			indicePlacaBacteriana = indicePlacaBacteriana - 1;
			$rootScope.$broadcast('idice placa bacteriana', { indice : indicePlacaBacteriana });
		}
	} 

	datafactory.getIndicePlacaBacteriana = function(){
		return  indicePlacaBacteriana;
	}
	/*****************************************************/

	/* indice Ceo */
	datafactory.setIndiceCeo = function(item, elemento){
		/*
		var ceo = (item.IndiceCEO == "True" || item.IndiceCEO == "true" || item.IndiceCEO == "1");
		var temporal = (elemento.Tipo_Diente == "Temporal");

		var cop = (item.IndiceCOP == "True" || item.IndiceCOP == "true" || item.IndiceCOP == "1");
		var permanente = (elemento.Tipo_Diente == "Permanente");

		if(ceo && temporal){
			IndiceCEO = IndiceCEO + 1;
			elemento.IndiceCEO = true;
			procesarIndice(elemento, "IndiceCEOElementos", item);
			$rootScope.$broadcast('idice CEO', { indice : IndiceCEO });
		}
		else if(cop && permanente){
			IndiceCOP = IndiceCOP+ 1;
			elemento.IndiceCOP = true;
			procesarIndice(elemento, "IndiceCOPElementos", item);
			$rootScope.$broadcast('idice COP', { indice : IndiceCOP });
		}
		*/
	}

	datafactory.deleteIndiceCeo = function(item, elemnto){
		
	} 

	datafactory.getIndiceCeo = function(){
		return  IndiceCEO;
	}

	datafactory.getIndiceCop = function(){
		return  IndiceCOP;
	}

	datafactory.IndiceCeo = function(indice){
		IndiceCEO = indice;
	}

	datafactory.IndiceCop = function(indice){
		IndiceCOP = indice;
	}	
	/****************************************************/

	function procesarIndice(item, indice, tratamiento){

		var elemento = piezasService.getPiezaByNumber(item.codigo);
		var tratamientoSeleccionado = sharedDataService.getTratamientoSeleccionado();

		var array = [];
		if((elemento[indice]).length > 0){
			array = JSON.parse(elemento[indice]);
		}

		array.push({idtratamiento : tratamientoSeleccionado.RowKey});
		elemento[indice] = JSON.stringify(array);
		//dataTableStorageFactory.saveStorage(elemento);
	}


	return datafactory;

}])