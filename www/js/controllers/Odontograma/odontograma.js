angular.module('starter')
.controller('odontogramaController', [ '$scope', '$rootScope', '$state','validarNavegacionService', 'piezasService', '$ionicLoading','users', 'dataTableStorageFactory', '$q', '$timeout',
	function($scope, $rootScope, $state, validarNavegacionService, piezasService, $ionicLoading, users, dataTableStorageFactory, $q, $timeout){
	
	var i = 0;
	var hubCtrl;	
	$scope.width = 40;
	$scope.height = 40;
	$scope.mostrarImprimir = true;

	var pacienteId = $state.params.pacienteId;   
	
	validarNavegacionService.validarCaptcha();
	validarNavegacionService.validarPacienteSeleccionado();

	function platform(){
		var deviceInformation = ionic.Platform.device();
		var isAndroid = ionic.Platform.isAndroid();
		var isIPad = ionic.Platform.isIPad();
        var isIOS = ionic.Platform.isIOS();

        

	if(isAndroid){
			$scope.width = 10;
			$scope.height = 10;
			$scope.mostrarImprimir = false;		
		}
		else if(isIPad){
			$scope.width = 20;
			$scope.height = 20;
			$scope.mostrarImprimir = false;		
		}
		
	}

	$scope.$on('$ionicView.leave', function(){        
        guardar();
    });

    function guardar(){
    	var deferred = $q.defer();
    	var items = piezasService.getModifiedPiezas();

        if(items.length > 0){
            $ionicLoading.show({
                template: "Guardando odontograma..."
            })

            var usuario = users.getCurrentUser();
            //Datos, Nombre tabla, partition key, y campo que servira como row key
            dataTableStorageFactory.postTableArray(items, 'TmOdontograma',  usuario.username+'paciente'+pacienteId, 'codigo')
            .success(function (data) {
               $ionicLoading.hide();
               deferred.resolve(data);
            })
            .error(function (error) {
                $ionicLoading.hide();
                console.log(error);
                deferred.reject(data);                
            });
        }
        else{
        	$timeout(function(){deferred.resolve();}, 1000);
        }

        return deferred.promise;
    }


	$scope.$on("elemento-dental-seleccionado", function(event, args){		
		goToSection(1);	
	});

	$scope.imprimir = function(){
		var usuario = users.getCurrentUser();
		guardar().then(function(){
			$state.go('app.odontogramaimprimir', {userId: usuario.username, pacienteId: pacienteId });
		});		
	}

	$scope.goToState = function(item){
		goToSection(item);
	}
	 
	$scope.setCtrl = function(ctrl){
		hubCtrl = ctrl;
	}

	//va hacia la izquierda
	$scope.onSwipeRight = function(){
		
		if(i > 0){
			i = i -1;
			goToSection(i);
		}		
	}

	//va hacia la derecha
	$scope.onSwipeLeft = function(){
		
		if(i < 3){
			i = i +1;
			goToSection(i);
		}
	}
	
    function goToSection(index){
    	hubCtrl._scrollToSection(index, true);
    }

    platform();

}]);