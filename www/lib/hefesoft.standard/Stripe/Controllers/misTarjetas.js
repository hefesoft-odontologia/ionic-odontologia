angular.module('starter')
.controller('mistarjetasCtrl', ['$scope', 'dataTableStorageFactory', 'users', 'stripeService', '$ionicLoading',
	function ($scope, dataTableStorageFactory, users, stripeService, $ionicLoading) {
	
	$scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true
	$scope.items = [];
	var item;

	$scope.eliminar = function(m){
		var data = {customerId: m.id, cardId : m.card.id};
		item = m;

		$ionicLoading.show();
		stripeService.cancelCard(data)
		.success(suscripcionCancelada)
        .error(error);		
	}

	function load(){
		var username = users.getCurrentUser().username;
		dataTableStorageFactory.getTableByPartition('TmStripeUserCard', username) 
		.success(success)
        .error(error);
	}

	function success(data){
		
		for (var i = data.length - 1; i >= 0; i--) {
			data[i].card =  JSON.parse(data[i].card);			
		};
		

		$scope.items = data;
	}

	function suscripcionCancelada(data){
 	  $ionicLoading.hide();
	  
	  if(data.status == "canceled"){
	  	 eliminar();			  
	    }
	}

	function eliminar(){
		dataTableStorageFactory.deleteFromStorage(item);
		var index = _.findIndex($scope.items, function(chr) {
			  return chr.RowKey == item.RowKey;
		   });

		   if(index >= 0){
		   		$scope.items = $scope.items.slice(1, index);
		   }
	}

	function error(error){
		console.log(error);
	}

	load();

	
}])