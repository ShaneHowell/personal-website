!function(){var sh=angular.module("sh",["ui.router","ngAnimate","viewhead"]);sh.run(["$rootScope","$state","$timeout",function($rootScope){$rootScope.$on("$stateChangeSuccess",function(event,to,toParams,from){$rootScope.previousState=from.name?from.name:"root.home"})}])}(),function(){angular.module("sh").filter("currentyear",["$filter",function($filter){return function(){return $filter("date")(new Date,"yyyy")}}])}(),function(){angular.module("sh").config(["$stateProvider","$urlRouterProvider","$locationProvider","$logProvider",function($stateProvider,$urlRouterProvider,$locationProvider){$locationProvider.html5Mode(!0).hashPrefix("!"),$urlRouterProvider.when("","/"),$urlRouterProvider.rule(function($injector,$location){var path=$location.path(),hasTrailingSlash="/"===path[path.length-1];if(hasTrailingSlash){var newPath=path.substr(0,path.length-1);return newPath}});$stateProvider.state("root",{url:"","abstract":!0,resolve:{projects:function(ProjectsApiService){return ProjectsApiService.getProjects()},init:function(ProjectsService,projects){return ProjectsService.init(projects.data.projects)}},views:{header:{templateUrl:"Pages/Header/views/Header.index.html"},footer:{templateUrl:"Pages/Footer/views/Footer.index.html"}}}).state("root.home",{url:"/",views:{"pages@":{templateUrl:"Pages/Home/views/Home.index.html"}}}).state("root.home.details",{url:"projects/:slug",views:{"pages@":{templateUrl:"Pages/Details/views/Details.index.html"}}}).state("root.about",{url:"/about",resolve:{about:function(AboutApiService){return AboutApiService.getAbout()},init:function(AboutService,about){return AboutService.init(about.data.about)}},views:{"pages@":{templateUrl:"Pages/About/views/About.index.html"}}})}])}(),function(){angular.module("sh").factory("ApiService",["$http","$q","$log",function($http,$q,$log){var Service={makeRequest:function(config){var response=$q.defer();return $http(config).then(function(data){$log.debug({url:data.config.url,response:data}),response.resolve(data)},function(error){$log.debug({url:error.config.url,response:error}),response.reject(error)}),response.promise}};return Service}])}(),function(){angular.module("sh").controller("AboutController",["$scope","AboutService",function($scope,AboutService){$scope.about=AboutService.about,console.log($scope.about)}])}(),function(){angular.module("sh").factory("AboutApiService",["ApiService",function(ApiService){var Service={getAbout:function(){return ApiService.makeRequest({method:"GET",url:"Data/about.json"})}};return Service}])}(),function(){angular.module("sh").factory("AboutService",["AboutApiService",function(){var Service={about:null,init:function(about){Service.about=about}};return Service}])}(),function(){angular.module("sh").controller("DetailsController",["$scope","$filter","$stateParams","ProjectsService",function($scope,$filter,$stateParams,ProjectsService){$scope.project=$filter("filter")(ProjectsService.projects,{slug:$stateParams.slug},!0)[0],$scope.np={next:ProjectsService.getNext($scope.project),prev:ProjectsService.getPrev($scope.project)},$scope.pageTitle=ProjectsService.getTitle($scope.project)}])}(),function(){angular.module("sh").controller("ProjectController",["$scope","ProjectsService",function($scope,ProjectsService){$scope.projects=ProjectsService.projects}])}(),function(){angular.module("sh").factory("ProjectsApiService",["ApiService",function(ApiService){var Service={getProjects:function(){return ApiService.makeRequest({method:"GET",url:"Data/projects.json"})}};return Service}])}(),function(){angular.module("sh").factory("ProjectsService",["ProjectsApiService",function(){var Service={projects:null,init:function(projects){Service.projects=projects},getTitle:function(projects){var index=Service.projects.indexOf(projects);return Service.projects[index].title},getPrev:function(projects){var index=Service.projects.indexOf(projects);return index>0?Service.projects[index-1].slug:null},getNext:function(projects){var index=Service.projects.indexOf(projects);return index<Service.projects.length-1?Service.projects[index+1].slug:null}};return Service}])}();