angular.module('starter').
directive('listClick', ['$parse',function ($parse) {
	return {
		restrict: 'A',
		link: function (scope, el, attrs) {	
			var mostrar = true;			
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
	};
}])