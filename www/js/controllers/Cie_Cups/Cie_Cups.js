angular.module('starter')
.controller('CieCupsCtrl', ['$scope', 'sharedSignatureHttpHelper', '$q', 
	function ($scope, sharedSignatureHttpHelper, $q) {

		var listado = [];
		$scope.listado = [];

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
				listado.push({Codigo : item.PartitionKey, Descripcion: item.RowKey, Tipo : "Cie"});

			};
		}

		function procesarCups(data){
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				listado.push({Codigo : item.PartitionKey, Descripcion: item.RowKey, Tipo : "Cup"});

			};
		}
	


    load();
	
}])