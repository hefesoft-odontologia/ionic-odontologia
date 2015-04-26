
angular.module('starter').
filter('tratamientoIsNull', function () {
  return function (item) {      
  		if(angular.isUndefined(item)){
    	return 'Transparent'; 
    }
    else{
    	return item;
    }
  };
});