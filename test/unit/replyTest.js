'use strict';

describe('sorting the list of users', function() {
  it('sorts in descending order by default', function() {
    var users = ['jack', 'igor', 'jeff'];
    //    var sorted = sortUsers(users);
    //    expect(sorted).toEqual(['jeff', 'jack', 'igor']);
  });
});

var sampleReply = {
        replyMsg: "",
        like: 0,
        dislike: 0,
        timestamp: new Date().getTime(),
        parentId: 0
    };

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
  order: 3,
  latest: false,
  numReply: 0
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
  order: 4,
  latest: false,
  numReply: 0
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
  order: 5,
  latest: false,
  numReply: 0
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
  order: 6,
  latest: false,
  numReply: 0
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
  order: 0,
  latest: false,
  numReply: 0
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
  order: 2,
  latest: false,
  numReply: 0
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
  order: 1,
  latest: false,
  numReply: 0
}];

describe('TodoCtrl', function() {
  beforeEach(module('todomvc'));
  // variables for injection
  var controller;
  var scope;
  var location;
  var firebaseArray;
  var sce;
  var localStorage;
  var window;
	var todo;

  // Injecting variables
  // http://stackoverflow.com/questions/13664144/how-to-unit-test-angularjs-controller-with-location-service
  beforeEach(inject(function($location,
    $rootScope,
    $controller,
    $firebaseArray,
    $localStorage,
    $sce,
    $window
		){
      // The injector unwraps the underscores (_) from around the parameter names when matching
			//MockFirebase.override();
      scope = $rootScope.$new();

      location = $location;
      controller = $controller;
      firebaseArray = $firebaseArray;
      sce = $sce;
      localStorage = $localStorage;
      window = $window;
			// TODO: Please change this URL for your app
			scope.storage = localStorage;
			var firebaseURL = "https://scorching-inferno-6291.firebaseio.com/";

			scope.roomId = "testing";
			var url = firebaseURL + scope.roomId + "/questions/";
			var echoRef = new Firebase(url);

			var query = echoRef.orderByChild("order");
			// Should we limit?
			//.limitToFirst(1000);
			scope.todos = $firebaseArray(query);
    }));

    describe('TodoCtrl Testing', function() {
      
      it('RoomId', function() {
        location.path('/new/path');

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location
        });

        expect(scope.roomId).toBe("new");
      });

      it('toTop Testing', function() {

        var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });

        scope.toTop();
        expect(window.scrollX).toBe(0);
        expect(window.scrollY).toBe(0);
      });
			//added by Tony
			it('addReply Test Null Msg', function() {
				var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
				//scope.$digest();
				scope.iput = {};
				scope.todos = questionList;
				scope.input.replyMsg = null;
				scope.addReply(scope.todos[0]);
				expect(scope.replyable).toBe(false);
			});
			//added by Tony
			it('addReply Test Undefined Msg', function() {
				var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
				//scope.$digest();
				scope.input = {};
				scope.todos = questionList;
				scope.input.replyMsg = undefined;
				scope.addReply(scope.todos[0]);
				expect(scope.replyable).toBe(false);
			});
			//added by Tony
			it('addReply Test Normal Msg', function() {
				var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
				//scope.$digest();
				scope.input = {};
				scope.todos = questionList;
				scope.input.replyMsg = "Yes";
            scope.addReply(scope.todos[0]);
				//expect(scope.todos[0].numReply).toBe(1);
			});
			
	
    });
  });
