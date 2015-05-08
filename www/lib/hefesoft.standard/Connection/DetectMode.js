angular.module('starter')
.service('connectionMode', [function () {
  var dataFactory = {};
	
  document.body.addEventListener("offline", function () {
         updateOnlineStatus("offline")
       }, false);
       document.body.addEventListener("online", function () {
         updateOnlineStatus("online")
       }, false);

      function updateOnlineStatus(msg) {
       $rootScope.$broadcast("Cambio de conexion", {Online : navigator.onLine});       
     }

      dataFactory.conexionStatus = function(){
        return navigator.onLine;
      }      

     return dataFactory;
	
}])