angular.module('starter')
.controller('IndicesCtrl', ['$scope', 'dataTableStorageFactory', '$state', 'users', '$q',
	function ($scope, dataTableStorageFactory, $state, users, $q) {
	
	 var pacienteId = $state.params.pacienteId;
	 var usuario = users.getCurrentUser();
	 $scope.numeroPiezasPresentes = 1;

	$scope.$on('idice placa bacteriana', function(event, args){      
        var indice = args.indice;
        $scope.indicePlacaBacteriana = round((indice * 100) / $scope.numeroPiezasPresentes, 2);
    });

    $scope.$on('CEO-COP', function(event, args){      
        $scope.CEO = args.indiceCEO;
        $scope.COP = args.indiceCOP;
    });

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

    leerIndices();
}])