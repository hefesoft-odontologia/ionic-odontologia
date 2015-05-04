angular.module('starter')
.service('messageService', [function () {

	var dataFactory = {};
	var deviceInformation = ionic.Platform.device();

    var isWebView = ionic.Platform.isWebView();
    var isIPad = ionic.Platform.isIPad();
    var isIOS = ionic.Platform.isIOS();
    var isAndroid = ionic.Platform.isAndroid();
    var isWindowsPhone = ionic.Platform.isWindowsPhone();

    var currentPlatform = ionic.Platform.platform();
    var currentPlatformVersion = ionic.Platform.version();


	dataFactory.showMessage = function(message){
		browser(message);
	}

	function browser(message){
	 if (!("Notification" in window)) {
	    toastr.info(message);
	  }
	  else{
	  	sendNotifyBrowser(message);
	  }
	}

	function sendNotifyBrowser(message) {
	  // Let's check if the browser supports notifications
	  if (!("Notification" in window)) {
	    alert("This browser does not support desktop notification");
	  }

	  // Let's check if the user is okay to get some notification
	  else if (Notification.permission === "granted") {
	    // If it's okay let's create a notification
	    var notification = new Notification('Odontologia', {
			    icon: 'img/icon.png',
			    body: message,
			  });
	  }

	  // Otherwise, we need to ask the user for permission
	  else if (Notification.permission !== 'denied') {
	    Notification.requestPermission(function (permission) {
	      // If the user is okay, let's create a notification
	      if (permission === "granted") {
	        var notification = new Notification('Odontologia', {
			    icon: 'img/icon.png',
			    body: message,
			  });
	      }
	    });
	  }
	 }

	return dataFactory;
	
}])