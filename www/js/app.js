// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'winjs', 'ngjsColorPicker', 'ngCordova'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {    
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    
    /*
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    */

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(function($compileProvider,$stateProvider, $urlRouterProvider, $httpProvider) {
   
   $httpProvider.defaults.withCredentials = true;
   $httpProvider.interceptors.push('authInterceptorService');

   $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);
   // // Use $compileProvider.urlSanitizationWhitelist(...) for Angular 1.2
   $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|ms-appx|x-wmapp0):|data:image\//);


  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menus/principal.html",
    controller: 'AppCtrl'
  }) 

  .state('app.parametrizartratamientos', {
    url: "/parametrizartratamientos",
    views: {
      'menuContent': {
        templateUrl: "templates/views/tratamientos/TpTratamientos.html"
      }
    }
  })

.state('app.listadotratamientos', {
    url: "/listadotratamientos",
    views: {
      'menuContent': {
        templateUrl: "templates/views/tratamientos/Listado.html"
      }
    }
  })  
    
   
.state('app.odontograma', {
    url: "/odontograma/:pacienteId",
    views: {
        'menuContent': {
            templateUrl: "templates/views/Odontograma/odontograma.html",            
        }       
        }
    })


.state('app.odontogramaimprimir', {
    url: "/odontogramaimprimir",
    views: {
        'menuContent': {
            templateUrl: "templates/views/Odontograma/impresion.html",
            controller : "impresionOdontogramaCtrl",
        }       
        }
    })



.state('app.periodontograma', {
    url: "/periodontograma/:pacienteId",
    views: {
        'menuContent': {
            templateUrl: "templates/views/Periodontograma/Periodontograma.html",            
        }       
        }
    })

.state('app.editarPacientes', {
    url: "/editarPacientes",
    views: {
        'menuContent': {
            templateUrl: "templates/views/Pacientes/editar.html",            
        }       
        }
    })


.state('app.pacientes', {
    url: "/pacientes",
    views: {
        'menuContent': {
            templateUrl: "templates/views/Pacientes/Listado.html",            
        }       
        }
    })

.state('app.citas', {
    url: "/citas",
    views: {
        'menuContent': {
            templateUrl: "templates/views/Citas/Listado.html", 
            controller: 'citasCtrl'           
        }       
        }
    })

.state('sigin', {
  url: '/sigin',
  templateUrl: 'templates/views/Sign/SignIn.html'  
})

.state('signup', {
  url: '/signup',
  templateUrl: 'templates/views/Sign/SignUp.html'  
})


.state('app.prestador', {
    url: "/prestador",
    views: {
        'menuContent': {
            templateUrl: "templates/views/Prestador/misDatos.html",            
        }       
        }
    });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/sigin');
})
