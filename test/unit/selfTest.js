'use strict'

describe('TodoCtrl Like or Dislike Test', function() {
  beforeEach(module('todomvc'));

  var ctrl, scope, firebaseArray;
	
  beforeEach(inject(function($controller, $rootScope, $firebaseArray, $localStorage){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    //$controller = _$controller_;
		//MockFirebase.override();
		scope = $rootScope.$new();
		//var firebaseURL = "https://scorching-inferno-6291.firebaseio.com/";

	  scope.roomId = "testing";
		
		
		
		/*
		$firebaseArray = _$firebaseArray_;
		$localStorage = _$localStorage_;
		*/
		ctrl = $controller('TodoCtrl', {$scope: scope});
		//console.log(scope.todos);
  }));
	
  it('new like', function() {
    //var $scope = {};
    //var controller = $controller('TodoCtrl', { $scope: scope });
		
		//spyOn(scope, 'addTodo').and.callThrough();
		//scope.todos = [];
		var sampleTodo = {
			wholeMsg: "",//newTodo
			head: "",//title
			headLastChar: "",//title.slice(-1)
			desc: 0,
			linkedDesc: Autolinker.link("", {newWindow: false, stripPrefix: false}),
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			dislike: 0,
			order: 0,
			latest: true
		};
		/* Direct Do Test on add/min like/dislike */
		/*
    scope.input = {};
	  scope.input.head = "Hello?";
		scope.input.wholeMsg = "Hello";
		var test1 = { input: "BBB"};
		*/
		sampleTodo.$id = 1;
		scope.$storage[sampleTodo.$id] = {liked: false, disliked: false};
		scope.addEcho(sampleTodo);
		//console.log(scope.todos);
		//scope.$digest();
		//expect(scope.addTodo).toHaveBeenCalled();
		expect(sampleTodo.echo).toBe(1);
		expect(scope.$storage[sampleTodo.$id].liked).toBe(true);
   });
	 
	 it('new dislike', function() {
    //var $scope = {};
    //var controller = $controller('TodoCtrl', { $scope: scope });
		
		//spyOn(scope, 'addTodo').and.callThrough();
		//scope.todos = [];
		var sampleTodo = {
			wholeMsg: "",//newTodo
			head: "",//title
			headLastChar: "",//title.slice(-1)
			desc: 0,
			linkedDesc: Autolinker.link("", {newWindow: false, stripPrefix: false}),
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			dislike: 0,
			order: 0,
			latest: true
		};
		/* Direct Do Test on add/min like/dislike */
		/*
    scope.input = {};
	  scope.input.head = "Hello?";
		scope.input.wholeMsg = "Hello";
		var test1 = { input: "BBB"};
		*/
		sampleTodo.$id = 1;
		scope.$storage[sampleTodo.$id] = {liked: false, disliked: false};
		scope.addDislike(sampleTodo);
		//console.log(scope.todos);
		//scope.$digest();
		//expect(scope.addTodo).toHaveBeenCalled();
		expect(sampleTodo.dislike).toBe(1);
		expect(scope.$storage[sampleTodo.$id].disliked).toBe(true);
   });
	 
	 it('like to dislike', function() {
    //var $scope = {};
    //var controller = $controller('TodoCtrl', { $scope: scope });
		
		//spyOn(scope, 'addTodo').and.callThrough();
		//scope.todos = [];
		var sampleTodo = {
			wholeMsg: "",//newTodo
			head: "",//title
			headLastChar: "",//title.slice(-1)
			desc: 0,
			linkedDesc: Autolinker.link("", {newWindow: false, stripPrefix: false}),
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 1,
			dislike: 0,
			order: 0,
			latest: true
		};
		/* Direct Do Test on add/min like/dislike */
		/*
    scope.input = {};
	  scope.input.head = "Hello?";
		scope.input.wholeMsg = "Hello";
		var test1 = { input: "BBB"};
		*/
		sampleTodo.$id = 1;
		scope.$storage[sampleTodo.$id] = {liked: true, disliked: false};
		scope.addDislike(sampleTodo);
		//console.log(scope.todos);
		//scope.$digest();
		//expect(scope.addTodo).toHaveBeenCalled();
		expect(sampleTodo.echo).toBe(0);
		expect(sampleTodo.dislike).toBe(1);
		expect(scope.$storage[sampleTodo.$id].liked).toBe(false);
		expect(scope.$storage[sampleTodo.$id].disliked).toBe(true);
   });
	 
	 it('dislike to like', function() {
    //var $scope = {};
    //var controller = $controller('TodoCtrl', { $scope: scope });
		
		//spyOn(scope, 'addTodo').and.callThrough();
		//scope.todos = [];
		var sampleTodo = {
			wholeMsg: "",//newTodo
			head: "",//title
			headLastChar: "",//title.slice(-1)
			desc: 0,
			linkedDesc: Autolinker.link("", {newWindow: false, stripPrefix: false}),
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			dislike: 1,
			order: 0,
			latest: true
		};
		/* Direct Do Test on add/min like/dislike */
		/*
    scope.input = {};
	  scope.input.head = "Hello?";
		scope.input.wholeMsg = "Hello";
		var test1 = { input: "BBB"};
		*/
		sampleTodo.$id = 1;
		scope.$storage[sampleTodo.$id] = {liked: false, disliked: true};
		scope.addEcho(sampleTodo);
		//console.log(scope.todos);
		//scope.$digest();
		//expect(scope.addTodo).toHaveBeenCalled();
		expect(sampleTodo.echo).toBe(1);
		expect(sampleTodo.dislike).toBe(0);
		expect(scope.$storage[sampleTodo.$id].liked).toBe(true);
		expect(scope.$storage[sampleTodo.$id].disliked).toBe(false);
   });
	 
	 it('invalid state dislike', function() {
    //var $scope = {};
    //var controller = $controller('TodoCtrl', { $scope: scope });
		
		//spyOn(scope, 'addTodo').and.callThrough();
		//scope.todos = [];
		var sampleTodo = {
			wholeMsg: "",//newTodo
			head: "",//title
			headLastChar: "",//title.slice(-1)
			desc: 0,
			linkedDesc: Autolinker.link("", {newWindow: false, stripPrefix: false}),
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			dislike: 0,
			order: 0,
			latest: true
		};
		/* Direct Do Test on add/min like/dislike */
		/*
    scope.input = {};
	  scope.input.head = "Hello?";
		scope.input.wholeMsg = "Hello";
		var test1 = { input: "BBB"};
		*/
		sampleTodo.$id = 1;
		scope.$storage[sampleTodo.$id] = {liked: true, disliked: true};
		scope.addDislike(sampleTodo);
		//console.log(scope.todos);
		//scope.$digest();
		//expect(scope.addTodo).toHaveBeenCalled();
		expect(sampleTodo.dislike).toBe(0);
		expect(scope.$storage[sampleTodo.$id].disliked).toBe(true);
		
		scope.addEcho(sampleTodo);
		expect(sampleTodo.echo).toBe(0);
		expect(scope.$storage[sampleTodo.$id].liked).toBe(true);
		
   });
	 
	 it('min Echo', function() {
    //var $scope = {};
    //var controller = $controller('TodoCtrl', { $scope: scope });
		
		//spyOn(scope, 'addTodo').and.callThrough();
		//scope.todos = [];
		var sampleTodo = {
			wholeMsg: "",//newTodo
			head: "",//title
			headLastChar: "",//title.slice(-1)
			desc: 0,
			linkedDesc: Autolinker.link("", {newWindow: false, stripPrefix: false}),
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 1,
			dislike: 0,
			order: 0,
			latest: true
		};
		/* Direct Do Test on add/min like/dislike */
		/*
    scope.input = {};
	  scope.input.head = "Hello?";
		scope.input.wholeMsg = "Hello";
		var test1 = { input: "BBB"};
		*/
		sampleTodo.$id = 1;
		scope.$storage[sampleTodo.$id] = {liked: false, disliked: false};
		//console.log(scope.todos);
		//scope.$digest();
		//expect(scope.addTodo).toHaveBeenCalled();
		
		scope.minEcho(sampleTodo);
		expect(sampleTodo.echo).toBe(0);
		expect(scope.$storage[sampleTodo.$id].liked).toBe(false);
	 });
	 
	 it('min Dislike', function() {
    //var $scope = {};
    //var controller = $controller('TodoCtrl', { $scope: scope });
		
		//spyOn(scope, 'addTodo').and.callThrough();
		//scope.todos = [];
		var sampleTodo = {
			wholeMsg: "",//newTodo
			head: "",//title
			headLastChar: "",//title.slice(-1)
			desc: 0,
			linkedDesc: Autolinker.link("", {newWindow: false, stripPrefix: false}),
			completed: false,
			timestamp: new Date().getTime(),
			tags: "...",
			echo: 0,
			dislike: 1,
			order: 0,
			latest: true
		};
		/* Direct Do Test on add/min like/dislike */
		/*
    scope.input = {};
	  scope.input.head = "Hello?";
		scope.input.wholeMsg = "Hello";
		var test1 = { input: "BBB"};
		*/
		sampleTodo.$id = 1;
		scope.$storage[sampleTodo.$id] = {liked: false, disliked: true};
		//console.log(scope.todos);
		//scope.$digest();
		//expect(scope.addTodo).toHaveBeenCalled();
		
		scope.minDislike(sampleTodo);
		expect(sampleTodo.dislike).toBe(0);
		expect(scope.$storage[sampleTodo.$id].disliked).toBe(false);
	 });
	 
	 it('add Reply Like', function() {
		var sampleReply = {
			replyMsg: "",
        like: 0,
        dislike: 0,
        timestamp: new Date().getTime(),
        parentId: 0
		};
		/* Direct Do Test on add/min like/dislike */
		sampleReply.$id = 1;
		scope.$storage[sampleReply.$id] = {liked: false, disliked: false};
		scope.addReplyLike(sampleReply);
		expect(sampleReply.like).toBe(1);
		expect(scope.$storage[sampleReply.$id].liked).toBe(true);
	 });
	 
	 it('min Reply Like', function() {
		var sampleReply = {
			replyMsg: "",
        like: 1,
        dislike: 0,
        timestamp: new Date().getTime(),
        parentId: 0
		};
		/* Direct Do Test on add/min like/dislike */
		sampleReply.$id = 1;
		scope.$storage[sampleReply.$id] = {liked: true, disliked: false};
		scope.minReplyLike(sampleReply);
		expect(sampleReply.like).toBe(0);
		expect(scope.$storage[sampleReply.$id].liked).toBe(false);
	 });
	 
	 it('add Reply DisLike', function() {
		var sampleReply = {
			replyMsg: "",
        like: 0,
        dislike: 0,
        timestamp: new Date().getTime(),
        parentId: 0
		};
		/* Direct Do Test on add/min like/dislike */
		sampleReply.$id = 1;
		scope.$storage[sampleReply.$id] = {liked: false, disliked: false};
		scope.addReplyDislike(sampleReply);
		expect(sampleReply.dislike).toBe(1);
		expect(scope.$storage[sampleReply.$id].disliked).toBe(true);
	 });
	 
	 it('min Reply DisLike', function() {
		var sampleReply = {
			replyMsg: "",
        like: 0,
        dislike: 1,
        timestamp: new Date().getTime(),
        parentId: 0
		};
		/* Direct Do Test on add/min like/dislike */
		sampleReply.$id = 1;
		scope.$storage[sampleReply.$id] = {liked: false, disliked: true};
		scope.minReplyDislike(sampleReply);
		expect(sampleReply.dislike).toBe(0);
		expect(scope.$storage[sampleReply.$id].disliked).toBe(false);
	 });
	 
	 it('Reply like to dislike', function() {
    //var $scope = {};
    //var controller = $controller('TodoCtrl', { $scope: scope });
		
		//spyOn(scope, 'addTodo').and.callThrough();
		//scope.todos = [];
		var sampleReply = {
			replyMsg: "",
        like: 1,
        dislike: 0,
        timestamp: new Date().getTime(),
        parentId: 0
		};
		/* Direct Do Test on add/min like/dislike */

		sampleReply.$id = 1;
		scope.$storage[sampleReply.$id] = {liked: true, disliked: false};
		scope.addReplyDislike(sampleReply);

		expect(sampleReply.like).toBe(0);
		expect(sampleReply.dislike).toBe(1);
		expect(scope.$storage[sampleReply.$id].liked).toBe(false);
		expect(scope.$storage[sampleReply.$id].disliked).toBe(true);
   });
   
   it('Reply dislike to like', function() {

		var sampleReply = {
			replyMsg: "",
        like: 0,
        dislike: 1,
        timestamp: new Date().getTime(),
        parentId: 0
		};
		/* Direct Do Test on add/min like/dislike */

		sampleReply.$id = 1;
		scope.$storage[sampleReply.$id] = {liked: false, disliked: true};
		scope.addReplyLike(sampleReply);

		expect(sampleReply.like).toBe(1);
		expect(sampleReply.dislike).toBe(0);
		//expect(scope.$storage[sampleReply.$id].liked).toBe(true);
		//expect(scope.$storage[sampleReply.$id].disliked).toBe(false);
   });
   
   it('Reply invalid state', function() {

		var sampleReply = {
			replyMsg: "",
        like: 0,
        dislike: 0,
        timestamp: new Date().getTime(),
        parentId: 0
		};
		/* Direct Do Test on add/min like/dislike */

		sampleReply.$id = 1;
		scope.$storage[sampleReply.$id] = {liked: true, disliked: true};
		scope.addReplyLike(sampleReply);

		expect(sampleReply.like).toBe(0);
		expect(sampleReply.dislike).toBe(0);
		//expect(scope.$storage[sampleReply.$id].liked).toBe(true);
		//expect(scope.$storage[sampleReply.$id].disliked).toBe(false);
		
		scope.addReplyDislike(sampleReply);
		expect(sampleReply.like).toBe(0);
		expect(sampleReply.dislike).toBe(0);
   });
	 
});
