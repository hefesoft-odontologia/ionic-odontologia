angular.module('starter')
.controller('periodontogramaPiezaDentalCtrl', ['$scope', function($scope){
	
	if(!$scope.item.hasOwnProperty('margen1')){
		$scope.item.margen1 = 50;
	}
	
	if(!$scope.item.hasOwnProperty('margen2')){
		$scope.item.margen2 = 50;
	}

	if(!$scope.item.hasOwnProperty('margen3')){
		$scope.item.margen3 = 50;
	}

	if(!$scope.item.hasOwnProperty('profundidad1')){
		$scope.item.profundidad1 = 50;
	}

	if(!$scope.item.hasOwnProperty('profundidad2')){	
		$scope.item.profundidad2 = 50;
	}

	if(!$scope.item.hasOwnProperty('profundidad3')){	
		$scope.item.profundidad3 = 50;
	}

	if($scope.item.parte == "parte1" || $scope.item.parte == "parte2"){
		$scope.item.rutaPiezaDental = "img/Periodontograma/periodontograma-dientes-arriba-" +  $scope.item.numeroPiezaDental + ".png";		
	}
	else if($scope.item.parte == "parte3" || $scope.item.parte == "parte4"){
		$scope.item.rutaPiezaDental = "img/Periodontograma/periodontograma-dientes-abajo-" +  $scope.item.numeroPiezaDental + ".png";		
	}

	if($scope.item.lado  == "b"){
		$scope.item.fondo = "img/Periodontograma/fondo-grafico-inf.png";
	}
	else{
		$scope.item.fondo = "img/Periodontograma/fondo-grafico.png";
	}

	if(!angular.isUndefined($scope.item.mostrarFurca) && $scope.item.mostrarFurca === true){
		$scope.item.furca = "img/Periodontograma/" + $scope.item.tipoFurca + ".png";
	}

}])