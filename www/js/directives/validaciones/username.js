angular.module('starter')
.directive('username', ['$q', '$timeout', 'dataTableStorageFactory', function($q, $timeout, dataTableStorageFactory) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      ctrl.$asyncValidators.username = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty model valid
          return $q.when();
        }

        var def = $q.defer();

        dataTableStorageFactory.existeUsuario('validateUser', {name: modelValue})
          .success(function (data) {
              if(data){
                def.reject();  
               }
              else{
                def.resolve();  
               }
            })
            .error(function (error) {
               def.reject();   
            });

        return def.promise;
      };
    }
  };
}]);