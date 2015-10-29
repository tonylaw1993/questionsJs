'use strict';

describe('sorting the list of users', function() {
  it('sorts in descending order by default', function() {
    var users = ['jack', 'igor', 'jeff'];
    //    var sorted = sortUsers(users);
    //    expect(sorted).toEqual(['jeff', 'jack', 'igor']);
  });
});

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
			it('addTodo Test Null Msg', function() {
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
				scope.input.head="";
				scope.input.wholeMsg = "";
				scope.addTodo();
				
				//expect(scope.todos.length).toBe(0);
			});
			//added by Tony
			it('addTodo Test Undefined Msg', function() {
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
				scope.input.head = undefined;
				scope.input.wholeMsg = undefined;
				scope.addTodo();
				//expect(scope.todos.length).toBe(0);
			});
			//added by Tony
			it('addTodo Test Normal Msg', function() {
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
				scope.input.head = "Hello?";
				scope.input.wholeMsg = "Hello";
				scope.addTodo();
				//console.log(scope.todos);
				//expect(scope.todos.length).toBe(1);
			});
			
			//added by Tony
			it('editTodo Test', function() {
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
				scope.input.head = "Hello?"
				scope.input.wholeMsg = "Hello";
				var toDo = scope.addTodo();
				scope.editTodo(toDo);
			});
			
			//added by Tony
			/*
			it('addEcho Test', function() {
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
				scope.input.head = "Hello?";
				scope.input.wholeMsg = "Hello";
				var toDo = scope.addTodo();
				var dum_todo = {
					echo: 0,
					order: 0
				};
				//scope.addEcho(dum_todo);
				//expect(scope.todos).not.toBe(undefined);
			});
			*/
			it('doneEditing Test Null', function() {
				var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window,
        });
				//scope.$digest();
				scope.input = {};
				scope.input.head = "Hello?"
				scope.input.wholeMsg = "Hello";
				var toDo = scope.addTodo();
				var dum_todo = {
					echo: 0,
					order: 0,
					wholeMsg: ""
				};
				scope.doneEditing(dum_todo);
			});
			
			it('doneEditing Test Normal', function() {
				var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window,
        });
				//scope.$digest();
				scope.input = {};
				scope.input.head = "Hello?"
				scope.input.wholeMsg = "Hello";
				var toDo = scope.addTodo();
				var dum_todo = {
					echo: 0,
					order: 0,
					wholeMsg: "ABC"
				};
				scope.doneEditing(dum_todo);
				//expect(scope.todos[0].wholeMsg).toEqual("ABC");
			});
			
			it('removeTodo Test', function() {
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
				scope.input.wholeMsg = "Hello";
				var dum_todo = {
					echo: 0,
					order: 0,
					wholeMsg: "ABC"
				};
				scope.removeTodo(dum_todo);
			});
			
			//added by Tony
			it('FBLogin Test', function() {
				var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
				scope.FBLogin();
			});
			
			//added by Tony
			it('FBLogout Test', function() {
				var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
				scope.FBLogout();
			});
			
			//added by Tony
			it('increaseMax Test Normal', function() {
				var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
				scope.maxQuestion = 4;
				scope.totalCount = 5;
				scope.increaseMax();
			});
			
			//added by Tony
			it('increaseMax Test Fail', function() {
				var ctrl = controller('TodoCtrl', {
          $scope: scope,
          $location: location,
          $firebaseArray: firebaseArray,
          $sce: sce,
          $localStorage: localStorage,
          $window: window
        });
				scope.maxQuestion = 5;
				scope.totalCount = 4;
				scope.increaseMax();
			});
			
    });
  });
