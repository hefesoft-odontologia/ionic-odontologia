angular.module('starter').
directive('odontogramaUserControl', [function () {
	return {
		restrict: 'E',
		controller : 'odontogramaCtrl',
		templateUrl : 'templates/directives/odontogramaUserControl.html'
	};
}]);

angular.module('starter')
.controller("odontogramaCtrl", ['$scope', 'dataTableStorageFactory', 'dataBlobStorageFactory', 'sharedDataService', 'dataTableStorageFactory','leerOdontogramaServices','users','$state','$ionicLoading', '$q', 'indicesServices','piezasService', '$rootScope',

    function ($scope, dataTableStorageFactory, dataBlobStorageFactory, sharedDataService, dataTableStorageFactory,leerOdontogramaServices, users, $state, $ionicLoading, $q, indicesServices, piezasService, $rootScope) {
    
     var usuario = users.getCurrentUser();
     var i = 0;
     var index = 0;
     var pacienteId = $state.params.pacienteId; 
     $scope.items = [];  
     $scope.numeroPiezasPresentes = 1;


     $scope.$on('supernumerario', function(event, args){      
        var seleccionado = args.seleccionado;
        var direccion = args.direccion;
        var index = _.indexOf($scope.items, seleccionado);
         

        if(direccion === "derecha"){
            index = index+1;
        }

        i = i+1;

        var supernumerarioAgregar = {numeroPiezaDental: 'S' + i, esSupernumerario : true, _numeroSuperNumerario : i, parte: seleccionado.parte};
        $scope.items.splice(index,0, supernumerarioAgregar);

        supernumerarioAgregar.nombreTabla = 'TmOdontogramaSupernumerario';
        supernumerarioAgregar.RowKey = i;
        supernumerarioAgregar.PartitionKey = usuario.username + 'paciente' + pacienteId;
        supernumerarioAgregar.index = index;
        supernumerarioAgregar.direccion = direccion;
        supernumerarioAgregar.numeroPiezaDentalReferencia = seleccionado.numeroPiezaDental;
        dataTableStorageFactory.saveStorage(supernumerarioAgregar);
    });

    $scope.$on('idice placa bacteriana', function(event, args){      
        var indice = args.indice;
        $scope.indicePlacaBacteriana = round((indice * 100) / $scope.numeroPiezasPresentes, 2);
    });

    $scope.$on('CEO-COP', function(event, args){      
        $scope.CEO = args.indiceCEO;
        $scope.COP = args.indiceCOP;
    });

     $scope.$on('eliminar-supernumerario', function(event, args){      
        var seleccionado = args.seleccionado;
        var index = _.indexOf($scope.items, seleccionado);        
        
        $scope.items.splice(index, 1);
        dataTableStorageFactory.deleteFromStorage(seleccionado);
        
    }); 
    

    $scope.numeroPiezasDentales = function(){
        var numeroPiezas = {};
        numeroPiezas.nombreTabla = 'TmIndicesPacientes';
        numeroPiezas.RowKey = 'numeropiezasdentales';
        numeroPiezas.PartitionKey = usuario.username + 'paciente' + pacienteId;        
        numeroPiezas.numeroPiezas = $scope.numeroPiezasPresentes;
        dataTableStorageFactory.saveStorage(numeroPiezas);
    }   

    function round(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

    function leerNumeroPiezasDentales(data){
        //Input numero de piezas dentales
        if(data[0].data !=null && !angular.isUndefined(data[0].data[0])){
            var numeroPiezasDentales = data[0].data[0].numeroPiezas;
            $scope.numeroPiezasPresentes = numeroPiezasDentales;
        }
    }

    function leerIndices(){
        var partition = usuario.username + 'paciente' + pacienteId;
        var p2 = dataTableStorageFactory.getTableByPartition('TmIndicesPacientes', partition);
        $q.all([p2]).then(function(data){
            leerNumeroPiezasDentales(data);            
        });
    }     

    $ionicLoading.show();
    leerOdontogramaServices.load(usuario, pacienteId).then(function(data){       
        $scope.items = [];
        $scope.items = data;
        $ionicLoading.hide();
    });

    leerIndices();
    
    
}]);
