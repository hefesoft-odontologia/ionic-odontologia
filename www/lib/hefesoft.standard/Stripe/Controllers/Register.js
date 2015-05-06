angular.module('starter')
.controller('StripeCtrl', ['$scope', 'dataTableStorageFactory', 'users' , 'messageService', 
	function ($scope, dataTableStorageFactory, users, messageService) {
	
	Stripe.setPublishableKey('pk_test_Pp9SiIClea7o9guzbv6qHlFD');
	$scope.MesAnioNoValido = true;	
	$scope.tarjetaNoValida = true;
	var mes = 0;
	var anio = 0;

	$scope.submit = function(){
		var $form = $('#payment-form');	

		$form.find('button').prop('disabled', true);

	    Stripe.card.createToken($form, stripeResponseHandler);

	    // Prevent the form from submitting with the default action
	    return false;
	}

	function stripeResponseHandler(status, response) {
	  var $form = $('#payment-form');

	  if (response.error) {
	    // Show the errors on the form
	    $form.find('.payment-errors').text(response.error.message);
	    $form.find('button').prop('disabled', false);
	    messageService.showMessage(response.error.message);
	  } 
	  else {
	    // response contains id and card, which contains additional card details
	    var token = response.id;
	    // Insert the token into the form so it gets submitted to the server
	    $form.append($('<input type="hidden" name="stripeToken" />').val(token));

	    //el token que llega se debe enviar a el backend

	    // and submit
	    //$form.get(0).submit();
	    var data = response;
	    data.PartitionKey = users.getCurrentUser().username;
	    data.nombreTabla = "TmStripeUser";
	    data.RowKey = response.id;
	    data.card = JSON.stringify(response.card);
	    dataTableStorageFactory.saveStorage(data).then(success);
	  }
	};

	function success(data){
		messageService.showMessage("Se ha inscrito satisfactoriamente");
	}

	$scope.month = function(m){		
		mes = m;
		$scope.MesAnioNoValido = !(Stripe.card.validateExpiry(mes, anio));		
	}

	$scope.year = function(m){
		anio = m;
		$scope.MesAnioNoValido = !(Stripe.card.validateExpiry(mes, anio)); 		
	}

	$scope.validateCard = function(card){
		try{
			if(card.length > 0){
				$scope.cardType = Stripe.card.cardType(card);

				if($scope.cardType == "Unknown"){
					$scope.cardType = "";
				}

				$scope.tarjetaNoValida = !(Stripe.card.validateCardNumber(card)); 
			}
		}
		catch(ex){

		}	
	}
	
}])