/**
* El listado de los elementos aplicados a cada superficies 
*/
angular.module('starter').
service('tratamientosPorPiezaDental', ['$rootScope','sharedDataService', 'crearPropiedades','aplicarTratamientoService','dataTableStorageFactory','users','varsFactoryService', 'indicesServices', 'piezasService',

	function ($rootScope, sharedDataService, crearPropiedades, aplicarTratamientoService, dataTableStorageFactory, users, varsFactoryService, indicesServices, piezasService) {
	
	var usuario = users.getCurrentUser();
	var i = 0; 
	var tratamientos = [];
	var pacienteId;

	this.setdata = function(data){
		if(data.length > 0){
			tratamientos = data;

			//Saca el maximo indice que existe en la coleccion
			var max =_.max(tratamientos, function(n) {
			  return  parseInt(n.i);
			});

			i = parseInt(max.i);
		}
	}

	this.insertar = function(item){       
		//Tratamiento seleccionado
		var tratamientoSeleccionado = sharedDataService.getTratamientoSeleccionado();
		pacienteId = varsFactoryService.pacienteSeleccionado();
		crearPropiedades.fill(tratamientoSeleccionado,item);

		var existe = validarExiste(item);
		if(!existe){
			i = i+1;
			item['i'] = i;
			tratamientos.push(item);
	    }

	    item['idTratamiento'] = tratamientoSeleccionado.RowKey;
	    var elementoSalvar = addToPiezaDental(item);
	    piezasService.recalcular();
	}

	this.eliminar = function(item){

		var elemento = piezasService.getPiezaByNombre(item.numeroPiezaDental);
		var array = (elemento[item.superficie + "Items"]);

		var index = _.findIndex(array, function(chr) {
                      return chr.idTratamiento == item.idTratamiento;
                    });

		if (index > -1) {
		    (elemento[item.superficie + "Items"]).splice(index, 1);
		}		
		
		actualizarDespuesEliminarUI(item);
		piezasService.recalcular();
	}

	function validarExiste(item){
		var result = _.any(tratamientos, function(n){
			var valor =  
  			(n.PartitionKey  === item.PartitionKey 
  			&& n.RowKey === item.RowKey 
  			&& n.numeroPiezaDental === item.numeroPiezaDental 
  			&& n.superficie === item.superficie);

  			return valor;
		});

		return result;
	}


	function addToPiezaDental(item){
		var elemento = piezasService.getPiezaByNombre(item.numeroPiezaDental);

		if(item.AplicaTratamiento == 1)
		{
			item.superficie = "piezaCompleta";			
		}

		return superficie(elemento, item.superficie, item);
	}

	function superficie(elemento, parte, item){
		elemento[parte + "Items"].push(item); 		
		return elemento;
	}

	//Filtra deacuerdo al numero de pieza dental
	this.filtrarNumeroPiezaDental = function(numeroPiezaDental){
		var resultado =_.filter(tratamientos, function(n) {
		  return n.numeroPiezaDental === numeroPiezaDental;
		});

		return resultado;
	}

	function actualizarDespuesEliminarUI(item){		
		var elemento = obtenerUltimoExistente(item);		

		//actualiza la superficie seleccionada luego de eliminar el elemento
		var nombreEvento = "eliminado" + item.numeroPiezaDental;
		$rootScope.$broadcast(nombreEvento, { seleccionado : elemento, numeroPiezaDental : item.numeroPiezaDental });
	}

	//Obtiene el ultimo elemento de la collecion por ejemplo el ultimo del centro
	function obtenerUltimoExistente(item){
		var elemento = piezasService.getPiezaByNombre(item.numeroPiezaDental);
		var array = (elemento[item.superficie + "Items"]);

		var index = array.length -1;

		if(index >= 0){
			dato = array[index];
			dato = aplicarTratamientoService.revertir(dato, item.superficie);
		}
		else{
			dato = null;
			//Devuelve un elemento vacio para la superficie seleccionada
			dato = aplicarTratamientoService.limpiar(item.superficie);
		}

		return dato;
	}

}])