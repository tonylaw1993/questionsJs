//created by Tony
'use strict';
describe('Test Poll Controller', function (){
	
	var controller;
  var scope;
  var location;
  var firebaseArray;
  var sce;
  var localStorage;
  var window;
	
	var pollsList=[{
            head: "AAA",
            timestamp: new Date().getTime(),
            items: [{option: "1", vote: 0},{option: "2", vote: 0}],
            totalVote: 0,
            latest: true
        },{
            head: "BBB",
            timestamp: new Date().getTime(),
            items: [{option: "1", vote: 0},{option: "2", vote: 0}],
            totalVote: 0,
            latest: false
        },{
            head: "CCC",
            timestamp: new Date().getTime() -1,
            items: [{option: "1", vote: 0},{option: "2", vote: 0}],
            totalVote: 0,
            latest: true
        },{
            head: "DDD",
            timestamp: new Date().getTime()-20,
            items: [{option: "1", vote: 0},{option: "2", vote: 0}],
            totalVote: 0,
            latest: false
        },{
            head: "E",
            timestamp: new Date().getTime(),
            items: [{option: "1", vote: 0},{option: "2", vote: 0}],
            totalVote: 0,
            latest: true
        }];
	
	beforeEach(module('todomvc'));
	
	beforeEach(inject(function($location,
    $rootScope,
    $controller,
    $firebaseArray,
    $localStorage,
    $sce,
    $window
		){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      scope = $rootScope.$new();
      location = $location;
      controller = $controller;
      firebaseArray = $firebaseArray;
      sce = $sce;
      localStorage = $localStorage;
      window = $window;
    }));
	
	describe('Test polls', function(){
		it('With polls',function(){
			var $scope = {};
			var ctrl = controller('pollCtrl', {$scope: scope});
			scope.polls = pollsList;
			scope.$digest();
		});
		it('Polls with an invalid entries',function(){
			var $scope = {};
			var ctrl = controller('pollCtrl', {$scope: scope});
			scope.todos = pollsList;
			scope.todos[0].head = null;
			scope.$digest();
		});
		
		it('Polls with an invalid entries',function(){
			var $scope = {};
			var ctrl = controller('pollCtrl', {$scope: scope});
			scope.todos = pollsList;
			scope.todos[0] = null;
			scope.$digest();
		});
		
		it('Add polls',function(){
			var $scope = {};
			var ctrl = controller('pollCtrl', {$scope: scope});
			scope.input = {};
			scope.head = "Abc"
			scope.options = ["abc","bcd","","",""];
			scope.addPoll();
		});
		
		it('Add polls invalid head',function(){
			var $scope = {};
			var ctrl = controller('pollCtrl', {$scope: scope});
			scope.input = {};
			scope.head = ""
			scope.options = ["abc","bcd","","",""];
			scope.addPoll();
		});
		
		it('Add polls invalid option',function(){
			var $scope = {};
			var ctrl = controller('pollCtrl', {$scope: scope});
			scope.input = {};
			scope.head = "ABC"
			scope.options = ["a","bcd","","",""];
			scope.addPoll();
		});
		
		it('Add vote',function(){
			var $scope = {};
			var ctrl = controller('pollCtrl', {$scope: scope, $localStorage: localStorage});
			var samplePoll = {
            head: "CCC",
            timestamp: new Date().getTime() -1,
            items: [{option: "1", vote: 0},{option: "2", vote: 0}],
            totalVote: 0,
            latest: true
        };
		   scope.addVote();
		});
		
	})
	
})
