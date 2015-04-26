/**
* El listado de los elementos aplicados a cada superficies 
*/
angular.module('starter').
service('tratamientosPorPiezaDental', ['$rootScope','sharedDataService', 'crearPropiedades','aplicarTratamientoService','dataTableStorageFactory','users','varsFactoryService',

	function ($rootScope, sharedDataService, crearPropiedades, aplicarTratamientoService, dataTableStorageFactory, users, varsFactoryService) {
	
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

	    item.nombreTabla = 'TpOdontograma';
	    item.PartitionKey = usuario.username + 'paciente' + pacienteId;
	    item.RowKey = item.i;
	    saveStorage(item);
	}

	//Filtra deacuerdo al numero de pieza dental
	this.filtrarNumeroPiezaDental = function(numeroPiezaDental){
		var resultado =_.filter(tratamientos, function(n) {
		  return n.numeroPiezaDental === numeroPiezaDental;
		});

		return resultado;
	}

	this.eliminar = function(item){
		var result = _.remove(tratamientos, function(n) {
  			var valor =  (n.i  !== item.i);
  			return valor;
		});

		tratamientos = result;
		deleteFromStorage(item);
		actualizarDespuesEliminarUI(item);
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

	function actualizarDespuesEliminarUI(item){
		
		var elemento = obtenerUltimoExistente(item);		

		//actualiza la superficie seleccionada luego de eliminar el elemento
		var nombreEvento = "eliminado" + item.numeroPiezaDental;
		$rootScope.$broadcast(nombreEvento, { seleccionado : elemento, numeroPiezaDental : item.numeroPiezaDental });
	}

	//Obtiene el ultimo elemento de la collecion por ejemplo el ultimo del centro
	function obtenerUltimoExistente(item){

		//Si es pieza completa no se le puede hacer click porque en el canvas esta un layer mas abajo
		//Entonces hay que validar esta propiedad
		if(item.hasOwnProperty('esPiezaCompleta') && item.esPiezaCompleta === 'True')
		{
			item.superficie = "piezacompleta";	
		}

		var dato;
		var index = _.findLastIndex(tratamientos, function(n){
			return n.superficie === item.superficie && n.numeroPiezaDental === item.numeroPiezaDental ;
		});

		if(index >= 0){
			dato = tratamientos[index];
			dato = aplicarTratamientoService.revertir(dato, item.superficie);
		}
		else{
			dato = null;
			//Devuelve un elemento vacio para la superficie seleccionada
			dato = aplicarTratamientoService.limpiar(item.superficie);
		}

		return dato;
	}

	function saveStorage(item){
		dataTableStorageFactory.postTable(item)
            .success(function (data) {
              
            })
            .error(function (error) {
               
            });
	}

	function deleteFromStorage(item){
		item.Estado_Entidad = 2;		
		dataTableStorageFactory.postTable(item)
            .success(function (data) {
              
            })
            .error(function (error) {
               
            });
	}

}])