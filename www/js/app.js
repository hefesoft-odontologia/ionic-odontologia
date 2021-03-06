
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'winjs', 'ngjsColorPicker', 'ngCordova', 'ion-autocomplete', 'ion-google-place'])

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

  .state('stripe', {
    url: "/stripe",
    abstract: true,
    templateUrl: "lib/hefesoft.standard/Stripe/menu/menu.html",
    controller: 'AppCtrl'
  })

  .state('stripe.mistarjetas', {
    url: "/mistarjetas",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "lib/hefesoft.standard/Stripe/Views/misTarjetas.html",
        controller : 'mistarjetasCtrl'
      }
    }
  })

  .state('stripe.misuscripcion', {
    url: "/misuscripcion",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "lib/hefesoft.standard/Stripe/Views/misSuscripciones.html",
        controller : 'missuscripcionesCtrl'
      }
    }
  })

  

  .state('stripe.register', {
    url: "/register",
    cache: false,
    views: {
        'menuContent': {
            templateUrl: "lib/hefesoft.standard/Stripe/Views/Register.html", 
            controller : "StripeCtrl"
        }       
        }
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

.state('app.listadociecups', {
    url: "/listadociecups",
    views: {
      'menuContent': {
        templateUrl: "templates/views/tratamientos/Cie_Cups.html"
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


/********** Historia ************/

.state('historia', {
    url: "/historia",
    abstract: true,
    templateUrl: "templates/menus/historial.html",
    controller: 'AppCtrl'
  }) 

.state('historia.editarPacientes', {    
    url: "/editarPacientes",
    cache: false,
    views: {
        'menuContent': {
            templateUrl: "templates/views/Pacientes/editar.html",            
        }       
        }
    })

.state('historia.add', {
    url: "/add",
    cache: false,
    views: {
        'menuContent': {
            templateUrl: "templates/views/Historia/historia.html",
            controller: "historiaCtrl"
        }       
        }
    })

 .state('historia.upload', {
    url: "/upload",
    cache: false,
    views: {
        'menuContent': {
            templateUrl: "lib/hefesoft.standard/upload/views/upload.html",           
        }       
        }
    })

 .state('historia.listadoadjuntos', {
    url: "/listadoadjuntos",
    cache: false,
    views: {
        'menuContent': {
            templateUrl: "lib/hefesoft.standard/upload/views/List.html",           
        }       
        }
    })

/***********************************/


/*************** Odontograma  *************************/

 .state('odontograma', {
    url: "/odontograma",
    abstract: true,
    templateUrl: "/templates/menus/odontograma.html",
    controller: 'AppCtrl'
  })


.state('odontograma.odontogramaControl', {
    url: "/odontogramaControl/:pacienteId",
    cache: false,
    views: {
        'menuContent': {
            templateUrl: "templates/views/Odontograma/odontograma.html",            
        }       
        }
    })


.state('app.odontogramaimprimir', {
    url: "/odontogramaimprimir/:pacienteId/:userId",
    cache: false,
    views: {
        'menuContent': {
            templateUrl: "templates/views/Odontograma/impresion.html",
            controller : "impresionOdontogramaCtrl",
        }       
        }
    })

.state('odontograma.listado', {
    url: "/odontograma/listado",
    cache: false,
    views: {
        'menuContent': {
            templateUrl: "templates/views/Odontograma/Listado.html",
        }       
        }
    })


/******************************************************/

.state('app.pacientes', {
    url: "/pacientes",
    cache: false,
    views: {
        'menuContent': {
            templateUrl: "templates/views/Pacientes/Listado.html",            
        }       
        }
    })

.state('app.citas', {
    url: "/citas",
    cache: false,
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

.state('captcha', {
  cache: false,
  url: '/captcha',
  templateUrl: 'lib/hefesoft.standard/Directivas/recaptcha/Vista/captcha.html'  
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
  $urlRouterProvider.otherwise('/captcha');
})
