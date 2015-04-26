angular.module('starter')
.controller('pacientesController', ['$scope','dataTableStorageFactory', 'users', '$cordovaCamera', 'imagesStorageFactory','$state','varsFactoryService','$ionicLoading','$rootScope', 'emailFactory',
	function ($scope, dataTableStorageFactory, users, $cordovaCamera, imagesStorageFactory, $state, varsFactoryService, $ionicLoading, $rootScope, emailFactory) {
	
	$scope.Paciente = {};

	//Cuando se selecciona un paciente
	$scope.Paciente = varsFactoryService.pacienteSeleccionado();
	$scope.Pacientes = new Array();
	$scope.shouldShowDelete = true;	
	$scope.Imagen = 'https://hefesoft.blob.core.windows.net/profile/profile.png';
	$scope.textoBuscar;

	var usuario = users.getCurrentUser();
	$rootScope.$broadcast('Dispositivo listo');

	$scope.navegarOdontograma = function(item){
		$scope.Paciente = item;
		varsFactoryService.fijarPaciente(item.RowKey);
		$state.go("app.odontograma", { "pacienteId": item.RowKey});
	}

	$scope.navegarPeriododntograma = function(item){
		$scope.Paciente = item;
		varsFactoryService.fijarPaciente(item.RowKey);
		$state.go("app.periodontograma", { "pacienteId": item.RowKey});
	}


	$scope.addPaciente = function(){

		var data = $scope.Paciente;		
		data.PartitionKey = usuario.username;

		//Cuando es un nuevo paciente el otro caso es cuando se edita un registro
		if(angular.isUndefined(data.RowKey)){
			data.generarIdentificador = true;
		}
		data.nombreTabla= 'TmPacientes';		

		dataTableStorageFactory.saveStorage(data);
		
		if(angular.isUndefined(data.RowKey)){
			$scope.Pacientes.push(data);
		}
	}

	$scope.delete = function(data, $index){
		data.Estado_Entidad = "2";		
		dataTableStorageFactory.saveStorage(data);
		$scope.Pacientes.splice($index, 1)
	} 

	$scope.cargarImagen = function(item){
		obtenerFoto();
	}

	$scope.edit = function(item){
		$scope.Paciente = item;
		$scope.Imagen = item.urlImagen;
		varsFactoryService.fijarPaciente(item);
		$state.go("app.editarPacientes");

		//prueba
		/*
		var usuario = users.getCurrentUser();
		var email = "futbolito152@gmail.com, chibchombiano26@gmail.com";
		emailFactory.enviarEmail(usuario.email, email , "Test", "texto mensaje", "texto html");
		*/
	}

	$scope.nuevo = function(){
		$scope.Paciente = {};
		$scope.Imagen = 'https://hefesoft.blob.core.windows.net/profile/profile.png';
		$scope.Paciente.urlImagen = $scope.Imagen;
		varsFactoryService.fijarPaciente({});
		$state.go("app.editarPacientes");		
	}

	function obtenerPacientes(){
		$ionicLoading.show();
		dataTableStorageFactory.getTableByPartition('TmPacientes', usuario.username)
		.success(function(data){
      		$scope.Pacientes = data;
      		$ionicLoading.hide();
        }).error(function(error){
        	console.log(error);
        	$ionicLoading.hide();
        })
	}

	obtenerPacientes();

    function obtenerFoto(){

    	/*Propiedades de la camara*/
		var options = {
	      quality: 50,
	      destinationType: Camera.DestinationType.DATA_URL,
	      sourceType: Camera.PictureSourceType.CAMERA,
	      allowEdit: true,
	      encodingType: Camera.EncodingType.JPEG,
	      targetWidth: 100,
	      targetHeight: 100,
	      popoverOptions: CameraPopoverOptions,
	      saveToPhotoAlbum: false
	    };

	    $cordovaCamera.getPicture(options).then(function(imageData) {	      
	      $scope.Imagen = "data:image/jpeg;base64," + imageData;
	      postImage(imageData);
	    }, function(err) {
	      // error
	    });  
	}

	
	function postImage(data){

		var datos = 
		{
      			tipo : 1, 
      			ImagenString : data, 
      			folder: 'imagenes', 
      			name: usuario.username + $scope.Paciente.nombre + $scope.Paciente.cedula + '.jpg'
  		};

		imagesStorageFactory.postImage(datos)
			.success(function(data){
        	$scope.Paciente.urlImagen = data;
        }).error(function(error){
        	console.log(data);
        })
	}

}])