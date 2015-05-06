angular.module('starter')
.controller('StripeCtrl', ['$scope', function ($scope) {
	
	Stripe.setPublishableKey('pk_test_Pp9SiIClea7o9guzbv6qHlFD');

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
	  } else {
	    // response contains id and card, which contains additional card details
	    var token = response.id;
	    // Insert the token into the form so it gets submitted to the server
	    $form.append($('<input type="hidden" name="stripeToken" />').val(token));

	    //el token que llega se debe enviar a el backend

	    // and submit
	    //$form.get(0).submit();
	  }
	};
	
}])