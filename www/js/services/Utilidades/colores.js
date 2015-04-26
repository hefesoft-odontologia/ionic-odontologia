angular.module('starter').
service('coloresService', [function () {
	
//Converte el color de entero a hexadecimal
this.intToHexColor = function(i) {
    var h = ((i>>24)&0xFF).toString(16) +
            ((i>>16)&0xFF).toString(16) +
            ((i>>8)&0xFF).toString(16) +
            (i&0xFF).toString(16);
    return h.substring(0, 6);
}

	// Hash any string into an integer value
 this.stringToHash =	function (str) {
	    var hash = 0;
	    for (var i = 0; i < str.length; i++) {
	        hash = str.charCodeAt(i) + ((hash << 5) - hash);
	    }
	    return hash;
	}

}])