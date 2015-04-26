angular.module('starter').
filter('widthSvg', function () {
  return function (item) {      
  		if(item === "{{width}}" || item == "{{height}}" ){
  			return "0";
  		}
  		else{
  			return item;
  		}
  };
});