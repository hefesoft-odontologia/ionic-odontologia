angular.module('starter')
.controller('CieCupsCtrl', ['$scope', 'sharedSignatureHttpHelper', '$q', 
	function ($scope, sharedSignatureHttpHelper, $q) {

		var listado = [];
		$scope.listado = [];		
		$scope.textoBuscar;

		function load(){
		    $q.all([sharedSignatureHttpHelper.getAll("TRCIE", '?tn=TRCIE&sv=2014-02-14&si=Shared&sig=uHj3pBPqCIIVhYsNXaiSdValKIqu9Q0dydf9%2FPzePdk%3D'), 
		    	sharedSignatureHttpHelper.getAll("TRCUPS", '?tn=TRCUPS&sv=2014-02-14&si=Shared&sig=z45zzlAqNKC5wxghBsKDQFXPXrTwDrLBnh%2FApTKIwoU%3D')])
		    .then(function(data){            
		        var Cie = data[0].value;
		        var Cups = data[1].value;
				procesarCie(Cie);
				procesarCups(Cups);

				$scope.listado = listado;
		    });
		}


		function procesarCie(data){
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				var busqueda = item.PartitionKey + " " + item.RowKey;

				listado.push({Codigo : item.PartitionKey, Descripcion: item.RowKey, Tipo : "Cie", Busqueda: busqueda});

			};
		}

		function procesarCups(data){
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				var busqueda = item.PartitionKey + " " + item.RowKey;

				listado.push({Codigo : item.PartitionKey, Descripcion: item.RowKey, Tipo : "Cup", Busqueda: busqueda});

			};
		}

		$scope.getTags = function (query) {
			query = query.toUpperCase();
			var array = _.filter(listado, function(item){
						  //return (item.Descripcion.indexOf(query) > -1 || item.Codigo.indexOf(query));
						  return item.Busqueda.indexOf(query) > -1;
						});
            return array;

       }

       $scope.callbackMethod = function (callback) {
		    // print out the selected item
		    console.log(callback.item); 

		    // print out the selected items if the multiple select flag is set to true and multiple elements are selected
		    //console.log(callback.selectedItems); 
	   }

    load();
	
}])