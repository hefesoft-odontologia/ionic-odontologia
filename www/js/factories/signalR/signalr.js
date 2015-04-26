var app = angular.module('starter');
app.service('signalrService', ['$rootScope','$q', 'urlServicioFactory', 'tokenService', 'users',
    function ($rootScope, q,  urlServicioFactory, tokenService, users) {
	
	var username;
	var self = this;
    var deferred = q.defer();
    var accessToken;
    
    // example of WebAPI call using bearer token
    var bearerToken = tokenService.getTokenDocument();
    var proxy;

    this.inicializarProxy = function(nombreMetodoOir){  
                var token = tokenService.getTokenDocument();

                $.connection.hub.logging = true;               
                //La url a la que nos deseamos conectar
                var connection = $.hubConnection(urlServicioFactory.getUrlWebSocket());

                connection.error(function (error) {
                        console.log('SignalR error: ' + error);
                        deferred.reject(error);
                });

                //Nombre del hub a conectar
                proxy = connection.createHubProxy("chatHub");

                proxy.on("broadcastMessage", function (name, message) {
                console.log(name + ' ' + message);
                $rootScope.$broadcast('signalrOn', name, message);                
            });


            var usuario = users.getCurrentUser();
            connection.qs = { bearer_token: token, usuario: usuario.email};               

            //Se hace con longpoling xq websocket en azure (las cuentas gratis solo soportan 5 conexiones simultaneas)
            connection.start({ transport: 'longPolling', jsonp : true}).done(function(){ 
                    console.log("Proxy inicializado");
                    deferred.resolve('Proxy inicializado');     
                }
            );

            return deferred.promise;
    };
    

    this.getHeaders =   function () {
            var token = tokenService.getTokenDocument();
            if (token) {
                return { "Authorization": "Bearer " + token };
            }
     }

    function error(msg){
        deferred.reject(msg);
    }


    this.sendMessage = function(user, datos){  
        var stringData = JSON.stringify(datos);     
    	proxy.invoke('Send', user, stringData);
    };

}])