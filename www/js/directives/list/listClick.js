angular.module('starter').
directive('listClick', ['$parse', 'platformService',
	function ($parse, platformService) {
	return {
		restrict: 'A',
		link: function (scope, el, attrs) {	
			var mostrar = true;			
			var esMobile = platformService.esMobile();

			//Solo se activara para desktop para evitar fallos de rendimiento
			if(!esMobile){
				el.on('click', function(){
					var pading = $(el).attr( "list-click" );
					if(mostrar){
						mostrar = false;
						$(el).find('.item-content').css('-webkit-transform','translate3d(' + pading +', 0px, 0px)');
						$(el).find('.item-content').css('transform','translate3d(' + pading +', 0px, 0px)');
						$(el).find('.item-options').removeClass('invisible');
					}
					else{
						mostrar = true;
						$(el).find('.item-content').removeAttr( 'style' );
						$(el).find('.item-options').addClass('invisible');	
					}				
				})
			}


		}
	};
}])