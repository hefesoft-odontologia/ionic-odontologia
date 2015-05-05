
/*

Listado en el que se muestran todos lo tratamientos para una pieza dental

*/

angular.module('starter')
.directive('tratamientosPorPiezaDental', [function () {
    return {
        restrict: 'E',      
        templateUrl: 'templates/directives/tratamientos/tratamientosPorPiezaDental.html',
        controller : 'tratamientosPorPiezaDentalCtrl'
    };
}])

.controller("tratamientosPorPiezaDentalCtrl", ['$scope','tratamientosPorPiezaDental', 'indicesServices','piezasService',
    function ($scope, tratamientosPorPiezaDental, indicesServices, piezasService) {

	$scope.items = [];

    $scope.eliminar = function(elemento){
        tratamientosPorPiezaDental.eliminar(elemento.elemento);
        var resultados = tratamientosPorPiezaDental.obtenerTratamientos(elemento.elemento.numeroPiezaDental);
        refrescarListado(resultados); 
    }

    $scope.$on('elemento-dental-seleccionado', function(event, args){		
        var seleccionado = args.seleccionado.item;
        mostrar(seleccionado);
	});  

    $scope.realizado = function(item){
        var elemento = piezasService.getPiezaByNombre(item.numeroPiezaDental);
        elemento["Modificado"] = true;
        
        if(item.realizado == "SI"){
            item["textoRealizado"]  = "Iniciado";
        }
        else if(item.realizado == "NO"){
            item["textoRealizado"]  = "En espera";
        }

        mostrar(item);
    }

    function mostrar(seleccionado){
        var resultados = tratamientosPorPiezaDental.obtenerTratamientos(seleccionado.numeroPiezaDental);
        refrescarListado(resultados); 
    }

    function refrescarListado(resultados){
        var data = [];

        for (var i = resultados.length - 1; i >= 0; i--) {            
            
            //Cuando se agrega al listado en el que se puede eliminar hay que indicarle
            //que si es boca no muestre cirtas superficies
            if(resultados[i].numeroPiezaDental == "Boca"){
                resultados[i]["esBoca"] = true;
            }
           
            data.push(
                {
                    Descripcion : resultados[i].Descripcion,
                    //En el listado es lo que muestra la pieza dental al lado del boton eliminar
                    elemento : resultados[i],
                    i : resultados[i].i,
                    busqueda : resultados[i].textoRealizado
                });
        };

        $scope.items = data;
    }
   
}]);
