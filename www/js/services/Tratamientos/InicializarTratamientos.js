angular.module('starter')
.service('inicializarTratamientosServices', ['dataTableStorageFactory', 'users','$ionicLoading',
	function (dataTableStorageFactory, users, $ionicLoading) {

 	var usuario = users.getCurrentUser();
	var dataFactory = {};

	dataFactory.inicializar = function(){
        usuario = users.getCurrentUser();
		get();
	}


	function get() {
    dataTableStorageFactory.getTableByPartition('TpTratamientos', usuario.username)
        .success(function (data) {            
            if(data.length == 0){
				crearDatoslegislacionColombiana();                
            }            
        })
        .error(function (error) {
            messageService.showMessage("No se han podido crear los tratamientos por defecto");
        });
	}

	function crearDatoslegislacionColombiana(){
		dataTableStorageFactory.getTableByPartition('TpTratamientos', 'parametrizacion')
        .success(function (data) {            
            if(data.length > 0){
                saveTratamientos(data);
            }            
        })
        .error(function (error) {
            messageService.showMessage("No se han podido crear los tratamientos por defecto");
        });
	}

	function saveTratamientos(data){
	 var usuario = users.getCurrentUser();      

         //Datos, Nombre tabla, partition key, y campo que servira como row key
        dataTableStorageFactory.postTableArray(data, 'TpTratamientos',  usuario.username, 'RowKey')
        .success(function (data) {
           $ionicLoading.hide();
        })
        .error(function (error) {
            $ionicLoading.hide();
            console.log(error);                
        });
	}

	return dataFactory;
	
}])