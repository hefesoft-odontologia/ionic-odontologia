angular.module('starter')
.controller('prestadorCtrl', ['$scope', 'users', 'dataTableStorageFactory', '$cordovaCamera', 'imagesStorageFactory','$ionicLoading', 'pushFactory',
	function ($scope, users, dataTableStorageFactory, $cordovaCamera, imagesStorageFactory, $ionicLoading, pushFactory) {
	
  var usuario = users.getCurrentUser();
  $scope.Imagen = 'https://hefesoft.blob.core.windows.net/profile/profile.png';

  $scope.Datos = {
  	email: usuario.email, 
  	username: usuario.username, 
  	PartitionKey : 'PrestadoresOdontologia', 
  	RowKey : usuario.username, 
  	nombreTabla: 'TmPrestador',
  	imagen: $scope.Imagen
  };


  $scope.salvar = function(){
      var platformPush = pushFactory.getPlatform();
      $scope.Datos['platform'] = platformPush;
  		dataTableStorageFactory.saveStorage($scope.Datos);
  }

  function obtenerDatos(){
  	$ionicLoading.show();
  	dataTableStorageFactory.getTableByPartitionAndRowKey('TmPrestador', 'PrestadoresOdontologia', usuario.username)
  	.success(success)
  	.error(error);
  }

  $scope.cargarImagen = function(item){
		obtenerFoto();
  }

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

  function success(data){
  	//Se llenan los valores de las propiedades desde la bd
  	for (var property in data) {
	    if (data.hasOwnProperty(property)) {	        
	        $scope.Datos[property] = data[property];
	    }
	}

	$ionicLoading.hide();
  }

  function error(data){  	
  	console.log(data);
  	$ionicLoading.hide();
  }


  obtenerDatos();

}])