!function(){var sh=angular.module("sh",["ui.router","ngAnimate"]);sh.run(["$rootScope","$state","$timeout",function($rootScope){$rootScope.$on("$stateChangeSuccess",function(event,to,toParams,from){$rootScope.previousState=from.name?from.name:"root.home",$rootScope.toTop=to.data.resetScroll,(1==$rootScope.toTop||void 0==$rootScope.toTop)&&scroll(0,0)})}])}(),function(){angular.module("sh").config(["$stateProvider","$urlRouterProvider","$locationProvider","$logProvider",function($stateProvider,$urlRouterProvider,$locationProvider){$locationProvider.html5Mode(!0).hashPrefix("!"),$urlRouterProvider.when("","/"),$urlRouterProvider.rule(function($injector,$location){var path=$location.path(),hasTrailingSlash="/"===path[path.length-1];if(hasTrailingSlash){var newPath=path.substr(0,path.length-1);return newPath}});$stateProvider.state("root",{url:"","abstract":!0,data:{pageTitle:"Home"},views:{header:{templateUrl:"Pages/Header/views/Header.index.html"},footer:{templateUrl:"Pages/Footer/views/Footer.index.html"}}})}])}(),function(){angular.module("sh").config(["$stateProvider",function($stateProvider){var defaultTitle=" // Shane Howell";$stateProvider.state("root.home",{url:"/",data:{pageTitle:"Home"+defaultTitle},views:{"pages@":{templateUrl:"Pages/Home/views/Home.index.html"}}})}])}();