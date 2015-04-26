angular.module('starter')

.directive('tratamientos', [function () {
	return {
		restrict: 'E',
		scope: {			
			item : '='
		},
		templateUrl: 'templates/directives/tratamientos/tratamientos.html',
		controller : function($scope, fuenteConverterService, coloresService){
			var item = $scope.item;
			
			item.Fuente = fuenteConverterService.convertirFuente(item.Fuente);
			if(!angular.isUndefined(item.ColorAdicional) && item.ColorAdicional !== null && !S(item.ColorAdicional).contains('#')) { item.ColorAdicional = '#' + coloresService.intToHexColor(item.ColorAdicional); }
			if(!angular.isUndefined(item.Color) && item.Color !== null && !S(item.Color).contains('#')) { item.Color = '#' + coloresService.intToHexColor(item.Color); }
			
		}
	};
}])