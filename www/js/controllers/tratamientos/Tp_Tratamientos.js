angular.module('starter')
.controller('TpTratamientosCtrl', ['$scope','dataTableStorageFactory','$cordovaOauth','$ionicLoading', '$state', 'users',
	function ($scope, dataTableStorageFactory, $cordovaOauth,$ionicLoading, $state, users) {
	
	$scope.customOptions = {
	    size: 30,
	    roundCorners: true,
	    randomColors: 30,
	    total: 30
	}

	var Color;
	var ColorAdicional;	
	var Descripcion;
	var Simbolo;
	var Letra;	
	var i = 0;
	var hubCtrl;
	var usuario = users.getCurrentUser();

	$scope.listado = function(){
		$state.go("app.listadotratamientos");
	}

	$scope.setCtrl = function(ctrl){
		hubCtrl = ctrl;
	}

	//va hacia la izquierda
	$scope.onSwipeRight = function(){		
		if(i > 0){
			i = i -1;
			goToSection(i);
		}
	}

	//va hacia la derecha
	$scope.onSwipeLeft = function(){		
		if(i < 5){
			i = i +1;
			goToSection(i);
		}
	}


	$scope.Aplica = [{nombre: 'Boca', codigo : 1}, {nombre: 'Superficie', codigo : 2}, {nombre: 'Pieza completa', codigo : 3}];
	$scope.AplicaSeleccionado = $scope.Aplica[1];

	$scope.Fuentes = [{fuente: 'Arial', codigo : 1 },{fuente: 'Glyphyx', codigo : 2}, {fuente: 'signify', codigo : 3}, {fuente: 'raphael', codigo : 4}];
	$scope.Fuente = $scope.Fuentes[1];

	$scope.Indices= { IndiceCEO: false, IndiceCOP: false, IndicePlacaBacteriana: false};
	
	$scope.selectedColor;
	$scope.textoDescripcion = '';
	$scope.textoSimbolo = '';
	$scope.textoLetra = '';
	
	$scope.tratamientoMuestra = {};

	$scope.clickColor = function(e){		
		Color = e;
		$scope.tratamientoMuestra.Color = e;

		login();
	}

	$scope.tratamientoTexto = function(e){
		Descripcion = e;
		$scope.tratamientoMuestra.Descripcion = e;
	}

	$scope.tratamientoSimbolo= function(e){

		if(angular.isUndefined(Color)){
			Color = "black";
		}

		$scope.tratamientoMuestra.Color = "Transparent";
		$scope.tratamientoMuestra.ColorAdicional = Color;
		$scope.tratamientoMuestra.Simbolo = e;	
		$scope.tratamientoMuestra.Fuente = $scope.Fuente.fuente;
		Simbolo = e;
	}

	$scope.tratamientoLetra= function(e){

		if(angular.isUndefined(Color)){
			Color = "black";
		}

		$scope.tratamientoMuestra.Color = "Transparent";
		$scope.tratamientoMuestra.ColorAdicional = Color;
		$scope.tratamientoMuestra.Letra = e;
		$scope.tratamientoMuestra.Fuente = 'Arial';	
		Letra = e;
	}

	$scope.cambioFuente = function(e){
		$scope.Fuente = e;
	}

	$scope.cambioAplicaA = function(e){
		$scope.AplicaSeleccionado = e;
	}

	$scope.guardar = function(){
		if(validar()){

		$ionicLoading.show();
		var elemento = { 
						PartitionKey : usuario.username,
						generarIdentificador : true, 
						nombreTabla: 'TpTratamientos',
						RowKey : 1000,
						Color: Color ,
						ColorAdicional : ColorAdicional,
						AplicaTratamiento: $scope.AplicaSeleccionado.codigo,
						Descripcion : Descripcion,
						Simbolo: Simbolo,
						Letra: Letra,
						IndiceCEO : $scope.Indices.IndiceCEO,
						IndiceCOP : $scope.Indices.IndiceCOP,
						IndicePlacaBacteriana : $scope.Indices.IndicePlacaBacteriana,
						Fuente: $scope.Fuente.fuente
					};

			dataTableStorageFactory.saveStorage(elemento);
		}
	}

	function validar(){
		var valido = true;
		if(angular.isUndefined($scope.AplicaSeleccionado)){
			valido = false;
		}
		return valido;
	}

	function login(){
		$cordovaOauth.facebook("426977727468725", ["email"]).then(function(result) {
	            // results
	        }, function(error) {
	            // error
	        });
	}

	function goToSection(index){
    	hubCtrl._scrollToSection(index,true)
    }

}])