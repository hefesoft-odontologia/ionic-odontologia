/**
* El listado de los elementos aplicados a cada superficies 
*/
angular.module('starter').
service('tratamientosPorPiezaDental', ['$rootScope','sharedDataService', 'crearPropiedades','aplicarTratamientoService','dataTableStorageFactory','users','varsFactoryService', 'indicesServices', 'piezasService',

	function ($rootScope, sharedDataService, crearPropiedades, aplicarTratamientoService, dataTableStorageFactory, users, varsFactoryService, indicesServices, piezasService) {
	
	var usuario = users.getCurrentUser();
	var i = 0; 	
	var pacienteId;
	var dataFactory = {};

	dataFactory.setdata = function(data){
		if(data.length > 0){
			var tratamientos = [];
			tratamientos = data;

			//Saca el maximo indice que existe en la coleccion
			var max =_.max(tratamientos, function(n) {
			  return  parseInt(n.i);
			});

			i = parseInt(max.i);
		}
	}

	dataFactory.insertar = function(item){       
		//Tratamiento seleccionado
		var tratamientoSeleccionado = sharedDataService.getTratamientoSeleccionado();
		var elemento = piezasService.getPiezaByNombre(item.numeroPiezaDental);
		
		pacienteId = varsFactoryService.pacienteSeleccionado();
		crearPropiedades.fill(tratamientoSeleccionado,item);
		item['idTratamiento'] = tratamientoSeleccionado.RowKey;


		var existe = validarExiste(item, elemento);
		if(!existe){
			i = i+1;
			item['i'] = i;			
	    	var elementoSalvar = addToPiezaDental(item, elemento);
	    	piezasService.recalcular();
	    }	    
	}

	dataFactory.eliminar = function(item){
		var elemento = piezasService.getPiezaByNombre(item.numeroPiezaDental);
		var array = (elemento[item.superficie + "Items"]);

		var index = _.findIndex(array, function(chr) {
                      return chr.idTratamiento == item.idTratamiento;
                    });		

		if (index > -1) {

			//Se agrega una propiedad para que solo guarde las entidades modificadas
			elemento["Modificado"] = true;
		    (elemento[item.superficie + "Items"]).splice(index, 1);
		    actualizarDespuesEliminarUI(item);
			piezasService.recalcular();
		}
	}

	dataFactory.obtenerTratamientos = function (numeroPiezaDental){
		var tratamientos = [];
		var elemento = piezasService.getPiezaByNombre(numeroPiezaDental);
		tratamientos = tratamientos.concat(elemento.centralItems);
		tratamientos = tratamientos.concat(elemento.izquierdaItems);
		tratamientos = tratamientos.concat(elemento.derechaItems);
		tratamientos = tratamientos.concat(elemento.abajoItems);
		tratamientos = tratamientos.concat(elemento.arribaItems);
		tratamientos = tratamientos.concat(elemento.inferiorItems);
		tratamientos = tratamientos.concat(elemento.superiorItems);
		tratamientos = tratamientos.concat(elemento.piezacompletaItems);
		return tratamientos;
	}

	function validarExiste(item, elemento){
		var tratamientos = [];
		tratamientos = dataFactory.obtenerTratamientos(item.numeroPiezaDental);
		result = false;

		//validacion para superficies y boca
		if(item.AplicaTratamiento == "2" || item.AplicaTratamiento == "3"){
			result = _.any(tratamientos, function(n){
				var valor =  
	  			(n.idTratamiento === item.idTratamiento 
	  			&& n.numeroPiezaDental === item.numeroPiezaDental 
	  			&& n.superficie === item.superficie);

	  			return valor;
			});
		}

		//validacion para pieza completa
		if(item.AplicaTratamiento == "1"){
			result = _.any(tratamientos, function(n){
				var valor =  
	  			(n.idTratamiento === item.idTratamiento 
	  			 && n.numeroPiezaDental === item.numeroPiezaDental 
	  			);

	  			return valor;
			});
		}

		return result;
	}


	function addToPiezaDental(item, elemento){		

		//Se agrega una propiedad para que solo guarde las entidades modificadas
		elemento["Modificado"] = true;

		//El nombre de esta propiedad debe ser piezacompleta sin mayusculas de lo contrario
		//cuando este limpiando las superficies no funcionara 
		if(item.AplicaTratamiento == 1)
		{
			item.superficie = "piezacompleta";			
		}
		
		elemento[item.superficie + "Items"].push(item); 		
		return elemento;
	}	

	//Filtra deacuerdo al numero de pieza dental
	dataFactory.filtrarNumeroPiezaDental = function(numeroPiezaDental){
		return dataFactory.obtenerTratamientos(numeroPiezaDental);		
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

	return dataFactory;
}])