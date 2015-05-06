angular.module('starter')
.controller('missuscripcionesCtrl', ['$scope', 'dataTableStorageFactory', 'users', 
	function ($scope, dataTableStorageFactory, users) {
	
	$scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true
	$scope.items = [];

	$scope.eliminar = function(item){
		var item = _.findIndex($scope.items, function(chr) {
		  return chr.RowKey == item.RowKey;
	   });

	   if(item >= 0){
	   		$scope.items = $scope.items.slice(1, item);
	   }
	}

	function load(){
		var username = users.getCurrentUser().username;
		dataTableStorageFactory.getTableByPartition('TmStripeSubscription', username) 
		.success(success)
        .error(error);
	}

	function success(data){
		/*
		for (var i = data.length - 1; i >= 0; i--) {
			data[i].card =  JSON.parse(data[i].card);
		};
		*/

		$scope.items = data;
	}

	function error(error){
		console.log(error);
	}

	load();

	
}])