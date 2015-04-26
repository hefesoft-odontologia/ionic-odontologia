angular.module('starter')
.directive('margen', [function () {
	return {
		restrict: 'E',
		link: function (scope, iElement, iAttrs) {			
		  
		  var elemento = iElement[0];
		  var data = new google.visualization.DataTable();
	      data.addColumn('number', '');
	      data.addColumn('number', '');

	      data.addRows([
	        [0, 60],   [0, 50],  [0, 60]       
	      ]);

	      var options = {	      	
        	'width':65,
        	'height':40,        	
	        hAxis: {
	         title: '',
	         baselineColor: 'transparent',
	         gridlineColor: 'transparent',
	         textPosition: 'none'
	        },
	        vAxis: {
	         title: '',
	         baselineColor: 'transparent',
	         gridlineColor: 'transparent',
	         textPosition: 'none'
	        },
	        'chartArea': {'width': '100%', 'height': '100%'},
	        legend: {position: 'none'},
	        backgroundColor: 'transparent'
	      };

	      var chart = new google.visualization.LineChart(elemento);
	      chart.draw(data, options);
	      $(elemento).children('#margen'+scope.item.numeroPiezaDental).center();

		},
		template : '<div style="position: absolute; background: red;"><div>',
		controller: 'margenCtrl'
	};
}])


.controller('margenCtrl', ['$scope', function ($scope) {
		  
}])