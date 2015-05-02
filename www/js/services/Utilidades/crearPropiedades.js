angular.module('starter')
.service('crearPropiedades', [function () {
	
	/*Toma un elemento y lo usa para crear propiedades en el otro*/
	this.fill = function(elemento1, elemento2){
		for(var propertyName in elemento1) {

			if( propertyName != "nombreTabla" 
				&& propertyName != "Estado_Entidad" 
				&& propertyName != "generarIdentificador" 
				&& propertyName != "RowKey" 
				&& propertyName != "PartitionKey" 
				&& propertyName != "rowkey" 
				&& propertyName != "partitionkey" 
				&& propertyName != "rowKey" 
				&& propertyName != "partitionKey" 
				){
				elemento2[propertyName] = elemento1[propertyName];
			}
		}
	}

}])