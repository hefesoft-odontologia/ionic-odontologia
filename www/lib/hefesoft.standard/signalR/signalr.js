var app = angular.module('starter');
app.service('signalrService', ['$rootScope','$q', 'urlServicioFactory', 'tokenService', 'users', 'varsFactoryService', 'procesarMensajes',
    function ($rootScope, q,  urlServicioFactory, tokenService, users, varsFactoryService, procesarMensajes) {
	
	var username;
	var self = this;
    var deferred = q.defer();
    var accessToken;
    var tryingToReconnect = false;
    
    
    // example of WebAPI call using bearer token
    var bearerToken = tokenService.getTokenDocument();
    var proxy;

   

    this.inicializarProxy = function(nombreMetodoOir){
                varsFactoryService.setproxyInicializado(true);
                var token = tokenService.getTokenDocument();

                $.connection.hub.logging = true;               
                //La url a la que nos deseamos conectar
                var connection = $.hubConnection(urlServicioFactory.getUrlWebSocket());

                connection.error(function (error) {
                        console.log('SignalR error: ' + error);
                        deferred.reject(error);
                        varsFactoryService.setproxyInicializado(false);
                });

                //Nombre del hub a conectar
                proxy = connection.createHubProxy("chatHub");

            proxy.on("broadcastMessage", function (name, message) {
                procesarMensajes.tipoMensaje(name, message);                             
            });


            var usuario = users.getCurrentUser();
            connection.qs = { bearer_token: token, usuario: usuario.email}; 
           
            //Se hace con longpoling xq websocket en azure (las cuentas gratis solo soportan 5 conexiones simultaneas)
            connection.start({ transport: 'longPolling', jsonp : true}).done(function(){ 
                        console.log("Proxy inicializado");
                        deferred.resolve('Proxy inicializado'); 
                        varsFactoryService.setproxyEnLinea(true);
                    }
                );

            connection.reconnecting(function() {
                tryingToReconnect = true;
                console.log("Reconectando");
            });

            connection.reconnected(function() {
                tryingToReconnect = false;
                console.log("Reconectado");
            });

            connection.disconnected(function() {
                if(tryingToReconnect) {
                    setTimeout(function() {
                        
                        /****************************************/
                        //Se hace con longpoling xq websocket en azure (las cuentas gratis solo soportan 5 conexiones simultaneas)
                        connection.start({ transport: 'longPolling', jsonp : true}).done(function(){ 
                                    console.log("Proxy inicializado");
                                    deferred.resolve('Proxy inicializado'); 
                                    varsFactoryService.setproxyEnLinea(true);
                            }
                        );
                        /******************************************/


                    }, 5000); // Restart connection after 5 seconds.
                }
            });

         

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