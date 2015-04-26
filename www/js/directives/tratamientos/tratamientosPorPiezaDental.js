angular.module('starter')

.directive('tratamientosPorPiezaDental', [function () {
    return {
        restrict: 'E',      
        templateUrl: 'templates/directives/tratamientos/tratamientosPorPiezaDental.html',
        controller : 'tratamientosPorPiezaDentalCtrl'
    };
}])

.controller("tratamientosPorPiezaDentalCtrl", ['$scope','tratamientosPorPiezaDental',
    function ($scope, tratamientosPorPiezaDental) {

	$scope.items = [];

    $scope.eliminar = function(elemento){
        tratamientosPorPiezaDental.eliminar(elemento.elemento);
        var result = _.remove($scope.items, function(n) {
          return n.i !== elemento.i;
        });

        $scope.items = result;
    }

    $scope.$on('elemento-dental-seleccionado', function(event, args){		
        var seleccionado = args.seleccionado.item;
		var resultados = tratamientosPorPiezaDental.filtrarNumeroPiezaDental(seleccionado.numeroPiezaDental);      
        var data = [];

        for (var i = resultados.length - 1; i >= 0; i--) {
            data.push(
                {
                    Descripcion : resultados[i].Descripcion,                     
                    elemento : resultados[i],
                    i : resultados[i].i
                });
        };

        $scope.items = data;
	});
   
}]);
