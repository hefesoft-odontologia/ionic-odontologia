angular.module('starter').
controller('piezaSeleccionadaCtrl', ['$scope', function ($scope) {
	
 $scope.item = {
 	numeroPiezaDental : "Pieza seleccionada", 
 	central : 'transparent'
 }

  $scope.$on('elemento-dental-seleccionado', function(event, args) {
  		var seleccionado = args.seleccionado;
  		$scope.item = seleccionado.item;
  })

}])