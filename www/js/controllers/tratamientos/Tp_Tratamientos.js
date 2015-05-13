angular.module('starter')
.controller('TpTratamientosCtrl', ['$scope','dataTableStorageFactory','$cordovaOauth','$ionicLoading', '$state', 'users', 'messageService',
	function ($scope, dataTableStorageFactory, $cordovaOauth,$ionicLoading, $state, users, messageService) {
	
	$scope.customOptions = {
	    size: 30,
	    roundCorners: true,
	    randomColors: 80,
	    total: 80
	}

	var Color;
	var ColorAdicional;	
	var Descripcion = "";
	var Simbolo;
	var Letra;	
	var i = 0;
	var hubCtrl;
	var usuario = users.getCurrentUser();
	var tipo = "Na";

	$scope.esModoColor = true; 
	$scope.esModoLetra = false; 
	$scope.esModoSimbolo = false; 

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


	$scope.Aplica = [{nombre: 'Boca', codigo : 3}, {nombre: 'Superficie', codigo : 2}, {nombre: 'Pieza completa', codigo : 1}];
	$scope.AplicaSeleccionado = $scope.Aplica[1];

	$scope.Fuentes = [{fuente: 'Arial', codigo : 1 },{fuente: 'Glyphyx', codigo : 2}, {fuente: 'signify', codigo : 3}, {fuente: 'raphael', codigo : 4}, {fuente:'odontologia', codigo : 5}];
	$scope.Fuente = $scope.Fuentes[1];

	$scope.Indices= { IndiceCEO: false, IndiceCOP: false, IndicePlacaBacteriana: false};
	
	$scope.selectedColor;
	$scope.textoDescripcion = '';
	$scope.textoSimbolo = '';
	$scope.textoLetra = '';
	
	$scope.tratamientoMuestra = {};

	//Tipo de tratamiento
	$scope.modoTratamiento = [{codigo: 1, Modo : "Color"}, {codigo: 2, Modo : "Texto"}, {codigo: 3, Modo : "Simbolo"}];
	$scope.modoTratamientoSeleccionado = $scope.modoTratamiento[0];

	$scope.cambioModo = function(e){
		if(e.Modo == "Texto"){
			$scope.esModoColor = false; 
			$scope.esModoLetra = true; 
			$scope.esModoSimbolo = false; 
			$scope.textoSimbolo = "";
			$scope.tratamientoMuestra.Simbolo = "";
		}
		else if(e.Modo == "Simbolo"){
			$scope.esModoColor = false; 
			$scope.esModoLetra = false; 
			$scope.esModoSimbolo = true; 
			$scope.textoLetra = "";
			$scope.tratamientoMuestra.Letra = "";
		}
		else if(e.Modo == "Color"){
			$scope.esModoColor = true; 
			$scope.esModoLetra = false; 
			$scope.esModoSimbolo = false; 
			$scope.textoLetra = "";
			$scope.textoSimbolo = "";
			$scope.tratamientoMuestra.Simbolo = "";
			$scope.tratamientoMuestra.Letra = "";			
		}
	}

	$scope.clickColor = function(e){		
		Color = e;
		$scope.tratamientoMuestra.Color = e;

		login();
		tipo = "Color";
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
		tipo = "Simbolo";
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
		tipo = "Letra";
	}

	$scope.cambioFuente = function(e){
		$scope.Fuente = e;
	}

	$scope.cambioAplicaA = function(e){
		$scope.AplicaSeleccionado = e;
	}

	$scope.guardar = function(){
		if(validar()){

		var colorPrincipal = Color;

		if(tipo == "Simbolo" || tipo == "Letra"){
			colorPrincipal = "Transparent";
			ColorAdicional = Color;
		}
		else{
			colorPrincipal = Color;
		}

		$ionicLoading.show();
		var elemento = { 
						PartitionKey : usuario.username,
						generarIdentificador : true, 
						nombreTabla: 'TpTratamientos',
						RowKey : 1000,
						Color: colorPrincipal ,
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

			if(elemento.AplicaTratamiento == 1 || elemento.AplicaTratamiento == 2){
				elemento["criterioBusqueda"] = "Aplica para superficies y pieza completa";
			}
			else if(elemento.AplicaTratamiento =3){
				elemento["criterioBusqueda"] = "Aplica para boca";
			}
		  dataTableStorageFactory.saveStorage(elemento).then(function(data){
		  	messageService.showMessage(elemento.Descripcion + " guardado");
		  });
		}
	}

	function validar(){
		var valido = true;
		if(angular.isUndefined($scope.AplicaSeleccionado)){
			valido = false;
			messageService.showMessage("Seleccione si aplica para diente superficie o boca");
		}
		if(Descripcion.length == 0){
			valido = false;
			messageService.showMessage("Digite una descripcion");
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