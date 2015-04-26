/**
Implementa como se convierte un tratamiento seleccionado en algo que se pinta dentro del odontograma
*/
angular.module('starter')
.service('aplicarTratamientoService', ['sharedDataService', function (sharedDataService) {	
	
	this.aplicar = function(elemento, parte ){
		//Hay un servicio donde se gurada el procedimiento o diagnostico que actualmente se ha seleccionado
		var tratamientoSeleccionado = sharedDataService.getTratamientoSeleccionado();
	    //Se valida que se haya seleccionado algo
		if(tratamientoValido(elemento)){

			 //Aplica a pieza completa
			 if(tratamientoSeleccionado.AplicaTratamiento == 1){
				elemento = diente(tratamientoSeleccionado, parte);	
			 }

			 //Aplica a superficie
			 else if(tratamientoSeleccionado.AplicaTratamiento == 2){
			    elemento = superficie(tratamientoSeleccionado, parte);
			 }
			 else if(tratamientoSeleccionado.AplicaTratamiento == 3){
			    console.log('Boca');
			 }
			 else{
			 	console.log('No parametrizado campo AplicaTratamiento');
			 }

			 elemento['valido'] = true;	   	
	   }
	   else{
			
			elemento['valido'] = false;	   	
	   }

		return elemento;
	}

	//Revierte el elemento a un estado anterior por ejemplo cuando se elimina un procedimiento de una superficie
	this.revertir = function(elemento, parte ){
		//Hay un servicio donde se gurada el procedimiento o diagnostico que actualmente se ha seleccionado
		var tratamientoSeleccionado = elemento;
		//Aplica a pieza completa
		 if(tratamientoSeleccionado.AplicaTratamiento == 1){
			elemento = diente(tratamientoSeleccionado, parte);	
		 }

		 //Aplica a superficie
		 else if(tratamientoSeleccionado.AplicaTratamiento == 2){
		    elemento = superficie(tratamientoSeleccionado, parte);
		 }
		 else if(tratamientoSeleccionado.AplicaTratamiento == 3){
		    console.log('Boca');
		 }
		 else{
		 	console.log('No parametrizado campo AplicaTratamiento');
		 }
		return elemento;
	}

	this.limpiar = function(superficie){
		var elemento = new Object();
		elemento["texto" + superficie] = '';
		elemento["texto" + superficie + "FuenteColor"] = 'transparent';
		elemento["texto" + superficie + "Fuente"] = 'Arial';
		elemento[superficie] = "Transparent";
		return elemento;
	}

	function diente(tratamientoSeleccionado, parte){
		elemento = tratamientoToSuperficie(tratamientoSeleccionado, 'piezacompleta');
		elemento.esPiezaCompleta = true;
		return elemento;
	}

	function superficie(tratamientoSeleccionado, parte){
		switch (parte) {
			    case 'central':
			        elemento = tratamientoToSuperficie(tratamientoSeleccionado, 'central');
			        break;
			    case 'izquierda':
			        elemento =  tratamientoToSuperficie(tratamientoSeleccionado, 'izquierda');
			        break;
			    case 'derecha':
			        elemento = tratamientoToSuperficie(tratamientoSeleccionado, 'derecha');
			        break;
			    case 'abajo':
			        elemento = tratamientoToSuperficie(tratamientoSeleccionado, 'abajo');
			        break;
			    case 'arriba':
			        elemento = tratamientoToSuperficie(tratamientoSeleccionado, 'arriba');
			        break;
			    case 'inferior':
			        elemento = tratamientoToSuperficie(tratamientoSeleccionado, 'inferior');
			        break;
			    case 'superior':
			        elemento = tratamientoToSuperficie(tratamientoSeleccionado, 'superior');
			        break;
			    }

	    return elemento;
	}

	function tratamientoToSuperficie(tratamiento, superficie){
		var elemento= new Object();
		
		if(!S(tratamiento.Simbolo).isEmpty()){

			elemento["texto" + superficie] = tratamiento.Simbolo;
			elemento["texto" + superficie + "FuenteColor"] = tratamiento.ColorAdicional;
			elemento["texto" + superficie + "Fuente"] = tratamiento.Fuente;
			elemento[superficie] = "Transparent";
		}
		else if(!S(tratamiento.Letra).isEmpty()){

			elemento["texto" + superficie] = tratamiento.Letra;
			elemento["texto" + superficie + "FuenteColor"] = tratamiento.ColorAdicional;
			elemento["texto" + superficie + "Fuente"] = 'Arial';
			elemento[superficie] = "Transparent";
		}
		else{

			elemento["texto" + superficie] = '';
			elemento["texto" + superficie + "FuenteColor"] = 'Black';
			elemento["texto" + superficie + "Fuente"] = 'Arial';
			elemento[superficie] = tratamiento.Color;
		}

		return elemento;
	}

	function tratamientoValido(elemento){
		//Hay un servicio donde se gurada el procedimiento o diagnostico que actualmente se ha seleccionado
		var tratamientoSeleccionado = sharedDataService.getTratamientoSeleccionado();
			//Se valida que se haya seleccionado algo
			return (typeof tratamientoSeleccionado != 'undefined' && elemento.numeroPiezaDental !== "Pieza seleccionada" 
				 && !angular.isUndefined(tratamientoSeleccionado.AplicaTratamiento)
				 && tratamientoSeleccionado.AplicaTratamiento !== null)
	}


}])