//created by Tony
'use strict';
describe('Test Todo Controller', function (){
	
	var controller;
  var scope;
  var location;
  var firebaseArray;
  var sce;
  var localStorage;
  var window;
	
	var questionList=[{
  wholeMsg: "newTodo",
  head: "head",
  headLastChar: "?",
  desc: "desc",
  linkedDesc: "linkedDesc",
  completed: false,
  timestamp: 0,
  tags: "...",
  echo: 3,
  order: 3
	},{
  wholeMsg: "newTodo",
  head: "head",
  headLastChar: "?",
  desc: "desc",
  linkedDesc: "linkedDesc",
  completed: false,
  timestamp: 0,
  tags: "...",
  echo: 2,
  order: 4
	},{
  wholeMsg: "newTodo",
  head: "head",
  headLastChar: "?",
  desc: "desc",
  linkedDesc: "linkedDesc",
  completed: false,
  timestamp: 0,
  tags: "...",
  echo: 2,
  order: 5
	},{
  wholeMsg: "newTodo",
  head: "head",
  headLastChar: "?",
  desc: "desc",
  linkedDesc: "linkedDesc",
  completed: false,
  timestamp: 0,
  tags: "...",
  echo: 2,
  order: 6
	},{
  wholeMsg: "newTodo",
  head: "head",
  headLastChar: "?",
  desc: "desc",
  linkedDesc: "linkedDesc",
  completed: false,
  timestamp: new Date().getTime(), //new
  tags: "...",
  echo: 2,
  order: 0
	},{
  wholeMsg: "newTodo",
  head: "head",
  headLastChar: "?",
  desc: "desc",
  linkedDesc: "linkedDesc",
  completed: false,
  timestamp: new Date().getTime()-1, //new
  tags: "...",
  echo: 0,
  order: 2
	},{
  wholeMsg: "newTodo",
  head: "head",
  headLastChar: "?",
  desc: "desc",
  linkedDesc: "linkedDesc",
  completed: false,
  timestamp: new Date().getTime(), // latest
  tags: "...",
  echo: 0,
  order: 1
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
	
	describe('Test todos', function(){
		it('With todos',function(){
			var $scope = {};
			var ctrl = controller('TodoCtrl', {$scope: scope});
			scope.todos = questionList;
			scope.$digest();
		});
		it('Todos with an invalid entries',function(){
			var $scope = {};
			var ctrl = controller('TodoCtrl', {$scope: scope});
			scope.todos = questionList;
			scope.todos[0].head = '';
			scope.$digest();
		});
		it('With todos completed',function(){
			var $scope = {};
			var ctrl = controller('TodoCtrl', {$scope: scope});
			scope.todos = questionList;
			scope.todos.forEach(function(todo){
				todo.completed = true;
			})
			scope.$digest();
		});
		
	})
	
})