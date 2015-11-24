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
var firebaseURL = "https://android-questions.firebaseio.com/";


$scope.roomId = roomId;
var url = firebaseURL + roomId + "/questions/";
var replyUrl = firebaseURL + roomId + "/replies/";
var echoRef = new Firebase(url);
var replyRef = new Firebase(replyUrl);

var query = echoRef.orderByChild("order");
var replyQuery = replyRef.orderByChild("order");
// Should we limit?
//.limitToFirst(1000);
$scope.todos = $firebaseArray(query);
$scope.replies = $firebaseArray(replyQuery);

$scope.input = {};
$scope.input.photos = [];

$scope.editedTodo = null;
$scope.editedReply = null;
// checker for posting
$scope.postable = true;
$scope.replyable = true;

$scope.imageUploaded = false;


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
                
            if ($scope.$storage[todo.$id] == undefined){
                $scope.$storage[todo.$id] = {
                        liked: false,
                        disliked: false
                        }
                } 
		// set time
		
		//todo.dateString = new Date(todo.timestamp).toString();
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
}, true);

// pre-precessing for collection of replies
$scope.$watchCollection('replies', function () {
	$scope.replies.forEach(function (reply) {
		// Skip invalid entries so they don't break the entire app.
		 if (!reply || reply.replyMsg == "") {
			return;
		}
		if ($scope.$storage[reply.$id] == undefined){
                $scope.$storage[reply.$id] = {
                        liked: false,
                        disliked: false
                        }
                } 
    });
}, true);

// Foul language filter
$scope.foulLangFilter = function(string){
    var wordList = [
        {bad: "fuck", good: "love"},
        {bad: "shit", good: "oh my shirt"},
        {bad: "damn", good: "oh my god"},
        {bad: "dick", good: "dragon"},
        {bad: "cocky", good: "lovely"},
        {bad: "pussy", good: "badlady"},
        {bad: "gayfag", good: "handsome boy"},
        {bad: "asshole", good:"myfriend"},
        {bad: "bitch", good: "badgirl"}
    ];
    for (var item in wordList){
        var regex = new RegExp(wordList[item].bad, "ig");
        string = string.replace(regex, wordList[item].good);
    }
    return string;
};

// Add a Question (todo)
$scope.addTodo = function () {
   if ($scope.input == undefined || $scope.input.wholeMsg == undefined || $scope.input.head == undefined){
        $scope.postable = false;
        return;
    }
	var inputMsg = $scope.input.wholeMsg.trim();
   var title = $scope.foulLangFilter($scope.input.head.trim());
	// If there is only emoji or no message is input, just do nothing
	if (inputMsg === undefined || inputMsg == ""){
	    $scope.postable = false;
		return;
	}
   
	var newTodo = $scope.foulLangFilter(inputMsg);
	/*
	// No input, so just do nothing
	if (!newTodo.length) {
		return;
	}
	*/
		
	$scope.todos.$add({
		wholeMsg: newTodo,
		head: title,
		headLastChar: title.slice(-1),
		desc: 0,
		linkedDesc: Autolinker.link(newTodo, {newWindow: true, stripPrefix: false}),
		completed: false,
		timestamp: new Date().getTime(),
		tags: "...",
		echo: 0,
		dislike: 0,
		order: 0,
		latest: true,
		numReply: 0,
		photos: $scope.input.photos
        }).then(function(ref){
                var id = ref.key();
                $scope.$storage[id] = {
                       liked: false,
                       disliked: false
                      };
        });
	// remove the posted question in the input
   $scope.postable = true;
	$scope.input.head = '';
	$scope.input.wholeMsg = '';
	$scope.input.photos = [];
	$("#photoUploader").val('');
	$scope.imageUploaded = false;
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

$scope.addDislike = function (todo) {		// +1 dislike
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

$scope.minDislike = function (todo) {		// -1 dislike
	$scope.editedTodo = todo;
	todo.dislike = todo.dislike - 1;
	$scope.todos.$save(todo);
	// Change the dislike button
	$scope.$storage[todo.$id].disliked = false;
};

// Add reply
$scope.addReply = function (todo){
    if ($scope.input == undefined || $scope.input.replyMsg == undefined || $scope.input.replyMsg == ""){
        $scope.replyable = false;
        return;
    }
    
    var tempMsg = $scope.input.replyMsg.trim();
    tempMsg = $scope.foulLangFilter(tempMsg);
    $scope.editedTodo = todo;
    todo.numReply = todo.numReply + 1;
    $scope.todos.$save(todo);
    
    $scope.replies.$add({
        replyMsg: tempMsg,
        like: 0,
        dislike: 0,
        timestamp: new Date().getTime(),
        parentid: todo.$id
    }).then(function(ref){
        var id = ref.key();
        $scope.$storage[id] = {
               liked: false,
               disliked: false
                 };
    });
    $scope.replyable = true;
    $scope.input.replyMsg = "";
}; 

$scope.addReplyLike = function (reply) {
        $scope.editedReply = reply;
        // Initial Stage
        if ($scope.$storage[reply.$id].liked == false){
                if ($scope.$storage[reply.$id].disliked == false){
                        // This user like this question
                        reply.like = reply.like + 1;
                        // Change the Like button
	                  $scope.$storage[reply.$id].liked = true;
                } else {
                        // From Dislike to Like
                        reply.dislike = reply.dislike - 1;
                        reply.like = reply.like + 1;
                        $scope.$storage[reply.$id].liked = true;
                        $scope.$storage[reply.$id].disliked = false;
                        }
        } else {
                // Do nothing
                return;
                }
      // Save the result
	$scope.replies.$save(reply);
};

$scope.addReplyDislike = function (reply) {		// +1 dislike
        $scope.editedReply = reply;
        //Initial Stage
        if ($scope.$storage[reply.$id].disliked == false){
                if ($scope.$storage[reply.$id].liked == false){
                        //This user dislike this question
                        reply.dislike = reply.dislike + 1;
                        // change the dislike button
	                  $scope.$storage[reply.$id].disliked = true;
                } else {
                        //From Like to dislike
                        reply.like = reply.like - 1;
                        reply.dislike = reply.dislike + 1;
                        $scope.$storage[reply.$id].liked = false;
                        $scope.$storage[reply.$id].disliked = true;
                        }
        } else {
                // Do nothing
                return;
                }
      // Save the result
	$scope.replies.$save(reply);
};

$scope.minReplyLike = function (reply) {
	$scope.editedReply = reply;
	reply.like = reply.like - 1;
	$scope.replies.$save(reply);
	// Change the like button
	$scope.$storage[reply.$id].liked = false;
};

$scope.minReplyDislike = function (reply) {		// -1 dislike
	$scope.editedReply = reply;
	reply.dislike = reply.dislike - 1;
	$scope.replies.$save(reply);
	// Change the dislike button
	$scope.$storage[reply.$id].disliked = false;
};

// Other function
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

$scope.FBLogin = function () {
	var ref = new Firebase(firebaseURL);
	ref.authWithOAuthPopup("facebook", function(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
		} else {
			$scope.$apply(function() {
				$scope.$authData = authData;
				//$scope.isAdmin = true;
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

// photo upload
// http://stackoverflow.com/questions/23402187/multiple-files-upload-and-using-file-reader-to-preview
function readImage(event) {
/*
    if ( this.files && this.files[0] ) {
        var FR= new FileReader();
        FR.onload = function(e) {
			$scope.input.photo = e.target.result;
			$scope.$apply();
        };
        FR.readAsDataURL( this.files[0] );
    }
    */
    if (window.File && window.FileList && window.FileReader) {
        event = event || window.event;
        var files = event.target.files; //FileList object
		
        for (var i = 0; i < files.length && i < 5; i++) {
            var file = files[i];
            //Only pics
            if (!file.type.match('image')) continue;

            var picReader = new FileReader();
            picReader.onload = function(e) {
                $scope.input.photos.push(e.target.result);
                $scope.$apply();
            };

            //Read the image
            picReader.readAsDataURL(file);
			$scope.imageUploaded = true;
        }
    } else {
        console.log("Your browser does not support File API");
    }
}
$("#photoUploader").on("change", readImage);
//document.getElementById("photoUploader").addEventListener("change", readImage, false);

}]);
