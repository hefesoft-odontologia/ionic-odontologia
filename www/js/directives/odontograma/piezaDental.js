angular.module('starter')

.directive('piezaCompleta', [function () {
	return {
		restrict: 'E',
		scope: {			
			item : '=',
			width : '=',
			height : '=',
			esPiezaCompleta: '=',
			mostrarBotonSupernumerario : '='			
		},
		templateUrl: 'templates/directives/piezaDental.html',
		controller : 'piezaCompletaController',
		link: function(scope, el, attr) {    		 
    		 el.find("svg").attr('width', scope.width);
    		 el.find("svg").attr('height', scope.height);
    	}
	};
}])

angular.module('starter')
.controller('piezaCompletaController', ['$rootScope', '$scope','sharedDataService','aplicarTratamientoService', 'tratamientosPorPiezaDental','crearPropiedades',
	function ($rootScope, $scope, sharedDataService, aplicarTratamientoService, tratamientosPorPiezaDental, crearPropiedades) {

		if($scope.item.numeroPiezaDental == "Boca"){
			$scope.item["esBoca"] = true;
			$scope.item["widthBoca"] = 2;
		}
		else
		{
			$scope.item["widthBoca"] = 0;
			$scope.item["esBoca"] = false;	
		}

		if($scope.item.ausente == "False" || $scope.item.ausente == "false"){
			$scope.item.ausente = false;
		}
		else if($scope.item.ausente == "True" || $scope.item.ausente == "true"){
			$scope.item.ausente = true;	
		}

		$scope.clickAplicar = function(e, parte){
		var elemento = aplicarTratamientoService.aplicar($scope.item, parte, $scope.item);
		if(elemento.valido){
			elemento.superficie = parte;
			
			/*
				Cuando se agrega al servicio donde se persisten los elementos debe indicarse el numero de pieza dental
				a la cual se le estan realizando los procedimientos o diagnosticos
			*/
			elemento.numeroPiezaDental = $scope.item.numeroPiezaDental;
			tratamientosPorPiezaDental.insertar(elemento);

			crearPropiedades.fill(elemento,$scope.item);			

			if(!angular.isUndefined($scope.esPiezaCompleta) && $scope.item.numeroPiezaDental !== "Pieza seleccionada"){
				//si se da click sobre la pieza completa debe avizasrle al elemento dentro del listado
				//que tambien debe cambiar ademas se debe validar que se haya seleccionado algo			
				$rootScope.$broadcast($scope.item.numeroPiezaDental, { seleccionado: $scope });
			}	
		}
	}
	

	$scope.clickSeleccionar = function(e){		
		//Avisarle a la pieza seleccionada que se selecciono una pieza dental
		$rootScope.$broadcast('elemento-dental-seleccionado', { seleccionado: $scope });
	}

	$scope.supernumerario = function(direccion){
		$rootScope.$broadcast('supernumerario', { seleccionado: $scope.item, direccion : direccion });	
	}

	$scope.eliminarSupernumerario = function(){
		$rootScope.$broadcast('eliminar-supernumerario', { seleccionado: $scope.item});		
	}

	$scope.ausente = function(){
		$scope.item['Modificado'] = true;
	}

	//ocurre cuando se elilima algun tratamiento
	$scope.$on("eliminado" + $scope.item.numeroPiezaDental, function(event, args){		
		var elemento = args.seleccionado;
		var numeroPiezaDental = args.numeroPiezaDental;

		if($scope.item.numeroPiezaDental == numeroPiezaDental){
			crearPropiedades.fill(elemento, $scope.item);
			console.log('eliminado');
		}
	});

	//ocurre cuando se lee desde el servicio un tratamiento aplicado
	$scope.$on("leer" + $scope.item.numeroPiezaDental, function(event, args){		
		var elemento = args.seleccionado;
		var numeroPiezaDental = args.numeroPiezaDental;

		if($scope.item.numeroPiezaDental == numeroPiezaDental){
			crearPropiedades.fill(elemento,$scope.item);
			console.log('leido');
		}
	});

	$scope.$on($scope.item.numeroPiezaDental, function(event, args){
		var seleccionado = args.seleccionado;
		$scope.item = seleccionado.item;		
	});
}])