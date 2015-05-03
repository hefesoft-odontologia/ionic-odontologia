angular.module('starter')
.service('indicesServices', ['$rootScope', 'dataTableStorageFactory', 'piezasService' , 'sharedDataService',
	function ($rootScope, dataTableStorageFactory, piezasService, sharedDataService) {
	
	var datafactory = {};
	var indicePlacaBacteriana = 0;
	
	datafactory.inicializar = function(item){
		indicePlacaBacteriana = 0;		
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

	return datafactory;

}])