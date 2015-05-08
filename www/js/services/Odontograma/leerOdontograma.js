/*
	Del servicio viene un odontograma este servicio se encarga de manejarlo y presentarlo graficamente
*/

angular.module('starter')
.factory('leerOdontogramaServices', ['$rootScope', 'tratamientosPorPiezaDental', 'indicesServices', 'piezasService', 'dataTableStorageFactory', '$ionicLoading', '$rootScope', '$q',
	function ($rootScope, tratamientosPorPiezaDental, indicesServices, piezasService, dataTableStorageFactory, $ionicLoading, $rootScope, $q) {	

	var dataFactory = {};
	var deferredCargarOdontograma;
	var items = [];
	var usuario;
	var pacienteId;
	
	dataFactory.odontogramaToUi = function(data){	
	
		tratamientosPorPiezaDental.setdata(data);
		
		for (var i = 0; i < data.length; i++) {
			var item = data[i];
			var nombreEvento = "leer" + item.numeroPiezaDental;
			$rootScope.$broadcast(nombreEvento, { seleccionado : item, numeroPiezaDental : item.numeroPiezaDental });
			indicePlacaBacteriana(item);
		};

	}

	dataFactory.load = function(Usuario, paciente){
		deferredCargarOdontograma = $q.defer();
		items = [];

		usuario = Usuario;
		pacienteId = paciente;
        indicesServices.inicializar();
        var partition = usuario.username + 'paciente' + pacienteId;
        var p1 = dataTableStorageFactory.getTableByPartition('TmOdontograma', usuario.username+'paciente'+pacienteId);
        var p2 = dataTableStorageFactory.getTableByPartition('TmIndicesPacientes', partition);
       
        $q.all([p1]).then(function(data){            
            leerOdontograma(data); 
        });  

        return deferredCargarOdontograma.promise;      
    }

    function obtenerSupernumerarios(){        
        dataTableStorageFactory.getTableByPartition('TmOdontogramaSupernumerario', usuario.username + 'paciente' + pacienteId)
        .success(function(data){

            if(data != null && data.length > 0){
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];

                    var index = _.findIndex(items, function(chr) {
                      return chr.numeroPiezaDental == item.numeroPiezaDentalReferencia;
                    });

                    if(item.direccion === "derecha"){
                        index = index+1;
                    }

                    items.splice(index, 0, item);
                };                
            }

             deferredCargarOdontograma.resolve(items);           

        }).error(function(error){
        	deferredCargarOdontograma.reject("Error leer supernumerarios");
        })
    }

    function leerOdontograma(data){       
        var odontograma = data[0].data;
        if(odontograma != null && odontograma.length > 0){  
            
            //Ordenarlos deacuerdo al codigo como en la nube se guardan en string no los ordena bien
            odontograma = _.sortBy(odontograma, function(item) {
               return parseInt(item.codigo);
            });

            piezasService.setPiezas(odontograma);
            items = odontograma;            
            obtenerSupernumerarios();
            $rootScope.$broadcast("Odontograma cargado");            
        }
        else{
            obtenerOdontogramaBase();
        }
    }

    function save(data, recargar){       
        //Datos, Nombre tabla, partition key, y campo que servira como row key
        dataTableStorageFactory.postTableArray(data, 'TmOdontograma',  usuario.username+'paciente'+pacienteId, 'codigo')
        .success(function (data) {          
           if(recargar){
             dataFactory.load(usuario, pacienteId);
           }
        })
        .error(function (error) {
           
            console.log(error);                
        });
    }

     //Mockup del odontograma
    function obtenerOdontogramaBase(){
        dataTableStorageFactory.getJsonData('Odontograma.json')
        .success(function (data) {
            save(data, true);            
        })
        .error(function (error) {
            console.log(error);           
        });
    }

	function indicePlacaBacteriana(item){
		indicesServices.setIndicePlacaBacteriana(item);
	}

	return dataFactory;

}])