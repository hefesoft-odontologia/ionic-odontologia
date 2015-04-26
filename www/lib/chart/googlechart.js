 (function(){
 	  
 	   // Load the Visualization API and the piechart package.
      google.load('visualization', '1.0', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {
        console.log('Google chart cargado');        
      }
})();


jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, ((this.parent().height() - $(this).outerHeight()) / 2) + 
                                                this.parent().scrollTop()) + "px");
    //this.css("left", Math.max(0, ((this.parent().width() - $(this).outerWidth()) / 2) + this.parent().scrollLeft()) + "px");
    return this;
}