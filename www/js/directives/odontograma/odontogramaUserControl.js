angular.module('starter').
directive('odontogramaUserControl', [function () {
	return {
		restrict: 'E',
		controller : 'odontogramaCtrl',
		templateUrl : 'templates/directives/odontogramaUserControl.html'
	};
}]);

angular.module('starter')
.controller("odontogramaCtrl", ['$scope', 'dataTableStorageFactory', 'dataBlobStorageFactory', 'sharedDataService', 'dataTableStorageFactory','leerOdontogramaServices','users','$state','$ionicLoading', '$q', 'indicesServices','piezasService',

    function ($scope, dataTableStorageFactory, dataBlobStorageFactory, sharedDataService, dataTableStorageFactory,leerOdontogramaServices, users, $state, $ionicLoading, $q, indicesServices, piezasService) {
    
     var usuario = users.getCurrentUser();
     var i = 0;
     var index = 0;
     var pacienteId = $state.params.pacienteId;   
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

        

    function obtenerSupernumerarios(){
        $ionicLoading.show();
        dataTableStorageFactory.getTableByPartition('TmOdontogramaSupernumerario', usuario.username + 'paciente' + pacienteId)
        .success(function(data){

            if(data != null && data.length > 0){
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];

                    var index = _.findIndex($scope.items, function(chr) {
                      return chr.numeroPiezaDental == item.numeroPiezaDentalReferencia;
                    });

                    if(item.direccion === "derecha"){
                        index = index+1;
                    }

                    $scope.items.splice(index, 0, item);
                };                
            }           

        }).error(function(error){

        })
    }

    $scope.numeroPiezasDentales = function(){
        var numeroPiezas = {};
        numeroPiezas.nombreTabla = 'TmIndicesPacientes';
        numeroPiezas.RowKey = 'numeropiezasdentales';
        numeroPiezas.PartitionKey = usuario.username + 'paciente' + pacienteId;        
        numeroPiezas.numeroPiezas = $scope.numeroPiezasPresentes;
        dataTableStorageFactory.saveStorage(numeroPiezas);
    }

    function load(){
        indicesServices.inicializar();
        var partition = usuario.username + 'paciente' + pacienteId;
        var p1 = dataTableStorageFactory.getTableByPartition('TmOdontograma', usuario.username+'paciente'+pacienteId);
        var p2 = dataTableStorageFactory.getTableByPartition('TmIndicesPacientes', partition);

        $ionicLoading.show();
        $q.all([p1, p2]).then(function(data){
            
            leerOdontograma(data);
            leerNumeroPiezasDentales(data);
            $ionicLoading.hide();
        });        
    }

    function round(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

    function leerNumeroPiezasDentales(data){
        //Input numero de piezas dentales
        if(data[1].data !=null && !angular.isUndefined(data[1].data[0])){
            var numeroPiezasDentales = data[1].data[0].numeroPiezas;
            $scope.numeroPiezasPresentes = numeroPiezasDentales;
        }
    }

    function leerOdontograma(data){
        var odontograma = data[0].data;
        if(odontograma != null && odontograma.length > 0){  
            
            //Ordenarlos deacuerdo al codigo como en la nube se guardan en string no los ordena bien
            odontograma = _.sortBy(odontograma, function(item) {
               return parseInt(item.codigo);
            });

            piezasService.setPiezas(odontograma);
            $scope.items = odontograma;            
            obtenerSupernumerarios();
        }
        else{
            obtenerOdontogramaBase();
        }
    }

    //Mockup del odontograma
    function obtenerOdontogramaBase(){
        dataTableStorageFactory.getJsonData('Odontograma.json')
        .success(function (data) {
            save(data, true);            
        })
        .error(function (error) {
            console.log(error);           
        });
    }

    function save(data, recargar){
        var usuario = users.getCurrentUser();      
        $ionicLoading.show();
        //Datos, Nombre tabla, partition key, y campo que servira como row key
        dataTableStorageFactory.postTableArray(data, 'TmOdontograma',  usuario.username+'paciente'+pacienteId, 'codigo')
        .success(function (data) {
           $ionicLoading.hide();
           if(recargar){
             load();
           }
        })
        .error(function (error) {
            $ionicLoading.hide();
            console.log(error);                
        });
    }

    load();
    
}]);
