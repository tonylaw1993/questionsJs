/*global todomvc, angular, Firebase */
'use strict';

/**
* The main controller for the app. The controller:
* - retrieves and persists the model via the $firebaseArray service
* - exposes the model to the template and provides event handlers
*/
todomvc.controller('TodoCtrl',
['$scope', '$location', '$firebaseArray', '$sce', '$localStorage', '$window', '$sanitize',
function ($scope, $location, $firebaseArray, $sce, $localStorage, $window, $sanitize) {
	// set local storage
	$scope.$storage = $localStorage;

	var scrollCountDelta = 10;
	$scope.maxQuestion = scrollCountDelta;

           /*
        $(window).scroll(function(){
        if($(window).scrollTop() > 0) {
        $("#btn_top").show();
        } else {
        $("#btn_top").hide();
        }
        });
        */

        if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                $scope.mobile = true;
           }
var splits = $location.path().trim().split("/");
var roomId = angular.lowercase(splits[1]);
if (!roomId || roomId.length === 0) {
	roomId = "all";
}

// TODO: Please change this URL for your app
var firebaseURL = "https://scorching-inferno-6291.firebaseio.com/";


$scope.roomId = roomId;
var url = firebaseURL + roomId + "/questions/";
var echoRef = new Firebase(url);

var query = echoRef.orderByChild("order");
// Should we limit?
//.limitToFirst(1000);
$scope.todos = $firebaseArray(query);

//$scope.input.wholeMsg = '';
$scope.editedTodo = null;

// pre-precessing for collection
$scope.$watchCollection('todos', function () {
	var total = 0;
	var remaining = 0;
	$scope.todos.forEach(function (todo) {
		// Skip invalid entries so they don't break the entire app.
		if (!todo || !todo.head ) {
			return;
		}

		total++;
		if (todo.completed === false) {
			remaining++;
		}

		// set time
		todo.dateString = new Date(todo.timestamp).toString();
		todo.tags = todo.wholeMsg.match(/#\w+/g);

		//todo.trustedDesc = $sce.trustAsHtml(todo.linkedDesc); //To be removed
		if (todo.timestamp <= new Date().getTime() - 180000) { // 3min
        todo.latest = false;
		}
	});

	$scope.totalCount = total;
	$scope.remainingCount = remaining;
	$scope.completedCount = total - remaining;
	$scope.allChecked = remaining === 0;
	$scope.absurl = $location.absUrl();
}, true);

// Get the first sentence and rest, to be removed, use autolinker to create links for Android
$scope.getFirstAndRestSentence = function($string) {
	var head = $string;
	var desc = "";

	var separators = ['. ', '? ', '! ', '\n'];

	var firstIndex = -1;
	for (var i in separators) {
		var index = $string.indexOf(separators[i]);
		if (index == -1) continue;
		if (firstIndex == -1) {firstIndex = index; continue;}
		if (firstIndex > index) {firstIndex = index;}
	}

	if (firstIndex !=-1) {
		head = $string.slice(0, firstIndex+1);
		desc = $string.slice(firstIndex+1);
	}
	return [head, desc];
};

$scope.addTodo = function () {
	var inputMsg = $scope.input.wholeMsg;
	// If there is only emoji or no message is input, just do nothing
	if (inputMsg === undefined){
		return;
	}
	var newTodo = inputMsg.trim();
	/*
	// No input, so just do nothing
	if (!newTodo.length) {
		return;
	}
	*/
	/*var firstAndLast = $scope.getFirstAndRestSentence(newTodo);
	var head = firstAndLast[0];
	var desc = firstAndLast[1];
	*/
	var title = $scope.input.head.trim();
	
	$scope.todos.$add({
		wholeMsg: newTodo,
		head: title,
		headLastChar: title.slice(-1),
		desc: 0,
		linkedDesc: Autolinker.link(newTodo, {newWindow: false, stripPrefix: false}),
		completed: false,
		timestamp: new Date().getTime(),
		tags: "...",
		echo: 0,
		dislike: 0,
		order: 0,
		latest: true
        }).then(function(ref){
                var id = ref.key();
                $scope.$storage[id] = {
                       liked: false,
                       disliked: false
                      };
        });
	// remove the posted question in the input
	$scope.input.head = '';
	$scope.input.wholeMsg = '';
};

$scope.editTodo = function (todo) {
	$scope.editedTodo = todo;
	$scope.originalTodo = angular.extend({}, $scope.editedTodo);
};

$scope.addEcho = function (todo) {
        $scope.editedTodo = todo;
        // Initial Stage
        if ($scope.$storage[todo.$id].liked == false){
                if ($scope.$storage[todo.$id].disliked == false){
                        // This user like this question
                        todo.echo = todo.echo + 1;
                        // Change the Like button
	                  $scope.$storage[todo.$id].liked = true;
                } else {
                        // From Dislike to Like
                        todo.dislike = todo.dislike - 1;
                        todo.echo = todo.echo + 1;
                        $scope.$storage[todo.$id].liked = true;
                        $scope.$storage[todo.$id].disliked = false;
                        }
        } else {
                // Do nothing
                return;
                }
      // Save the result
	$scope.todos.$save(todo);
};

$scope.addDislike = function (todo) {
        $scope.editedTodo = todo;
        //Initial Stage
        if ($scope.$storage[todo.$id].disliked == false){
                if ($scope.$storage[todo.$id].liked == false){
                        //This user dislike this question
                        todo.dislike = todo.dislike + 1;
                        // change the dislike button
	                  $scope.$storage[todo.$id].disliked = true;
                } else {
                        //From Like to dislike
                        todo.echo = todo.echo - 1;
                        todo.dislike = todo.dislike + 1;
                        $scope.$storage[todo.$id].liked = false;
                        $scope.$storage[todo.$id].disliked = true;
                        }
        } else {
                // Do nothing
                return;
                }
      // Save the result
	$scope.todos.$save(todo);
};

$scope.minEcho = function (todo) {
	$scope.editedTodo = todo;
	todo.echo = todo.echo - 1;
	$scope.todos.$save(todo);
	// Change the like button
	$scope.$storage[todo.$id].liked = false;
};

$scope.minDislike = function (todo) {
	$scope.editedTodo = todo;
	todo.dislike = todo.dislike - 1;
	$scope.todos.$save(todo);
	// Change the dislike button
	$scope.$storage[todo.$id].disliked = false;
};

$scope.doneEditing = function (todo) {
	$scope.editedTodo = null;
	var wholeMsg = todo.wholeMsg.trim();
	if (wholeMsg) {
		$scope.todos.$save(todo);
	} else {
		$scope.removeTodo(todo);
	}
};

$scope.revertEditing = function (todo) {
	todo.wholeMsg = $scope.originalTodo.wholeMsg;
	$scope.doneEditing(todo);
};

$scope.removeTodo = function (todo) {
	$scope.todos.$remove(todo);
};

$scope.clearCompletedTodos = function () {
	$scope.todos.forEach(function (todo) {
		if (todo.completed) {
			$scope.removeTodo(todo);
		}
	});
};

$scope.toggleCompleted = function (todo) {
	todo.completed = !todo.completed;
	$scope.todos.$save(todo);
};

$scope.markAll = function (allCompleted) {
	$scope.todos.forEach(function (todo) {
		todo.completed = allCompleted;
		$scope.todos.$save(todo);
	});
};

$scope.FBLogin = function () {
	var ref = new Firebase(firebaseURL);
	ref.authWithOAuthPopup("facebook", function(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
		} else {
			$scope.$apply(function() {
				$scope.$authData = authData;
				$scope.isAdmin = true;
			});
			console.log("Authenticated successfully with payload:", authData);
		}
	});
};

$scope.FBLogout = function () {
	var ref = new Firebase(firebaseURL);
	ref.unauth();
	delete $scope.$authData;
	$scope.isAdmin = false;
};

$scope.increaseMax = function () {
	if ($scope.maxQuestion < $scope.totalCount) {
		$scope.maxQuestion+=scrollCountDelta;
	}
};

$scope.toTop =function toTop() {
	$window.scrollTo(0,0);
};


// Not sure what is this code. Todel
if ($location.path() === '') {
	$location.path('/');
}
$scope.location = $location;

// autoscroll
angular.element($window).bind("scroll", function() {
	if ($window.innerHeight + $window.scrollY >= $window.document.body.offsetHeight) {
		console.log('Hit the bottom2. innerHeight' +
		$window.innerHeight + "scrollY" +
		$window.scrollY + "offsetHeight" + $window.document.body.offsetHeight);

		// update the max value
		$scope.increaseMax();

		// force to update the view (html)
		$scope.$apply();
	}
});

}]);
