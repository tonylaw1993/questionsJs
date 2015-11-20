/*global todomvc, angular, Firebase */
'use strict';

todomvc.controller('pollCtrl',
['$scope', '$location', '$firebaseArray', '$sce', '$localStorage', '$window', '$sanitize',
function ($scope, $location, $firebaseArray, $sce, $localStorage, $window, $sanitize) {
    $scope.$storage = $localStorage;
    
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
    var url = firebaseURL + roomId + "/polls/";
    var echoRef = new Firebase(url);
    $scope.polls = $firebaseArray(echoRef);
		
		$scope.rightBegin = 0;
		
    // Basic new poll layout
    $scope.choices = [2,3,4,5];
    $scope.numOfChoice = 5;
    $scope.options = ["", "", "", "", ""]
    $scope.getOptions = function(n){
        return new Array(n);
    };
    $scope.head = "";
    $scope.postable = true;
    $scope.editedPoll = null;
    
    // pre-precessing for collection
    $scope.$watchCollection('polls', function () {
        var total = 0;
        $scope.polls.forEach(function (poll) {
        // Skip invalid entries so they don't break the entire app.
        if (!poll || !poll.head ) {
            return;
            }
        if ($scope.$storage[poll.$id] == undefined){
            $scope.$storage[poll.$id] = {
                voted: false
                };
            }
        total++;
		
        if (poll.timestamp <= new Date().getTime() - 180000) { // 3min
            poll.latest = false;
            }
	    });
    }, true);
    
    $scope.addPoll = function(){
        if ($scope.head == undefined || $scope.head.length < 3){
            $scope.postable = false;
            return;
        }
        var i = 0;
        var temp = [];
        for (; i<$scope.numOfChoice; i++){
            if ($scope.options[i] == "" || $scope.options[i].length < 3){
                $scope.postable = false;
                return;
            }
        }
        for (i = 0; i<$scope.numOfChoice; i++){
            temp[i] = {option: $scope.options[i], vote:0};
            $scope.options[i] = "";
        }
        var title = $scope.head.trim();
        $scope.polls.$add({
            head: title,
            timestamp: new Date().getTime(),
            items: temp,
            totalVote: 0,
            latest: true
        }).then(function(ref){
            var id = ref.key();
            $scope.$storage[id] = {
                owner: true,
                voted: false
            };
        });
        $scope.postable = true;
        // Remove the things added
        $scope.head = "";
    }
    
    $scope.addVote = function(){
        if ($scope.$storage[this.$parent.poll.$id].voted == true){
            return;
        } else {
            this.item.vote = this.item.vote + 1;
            this.$parent.poll.totalVote = this.$parent.poll.totalVote + 1;
            $scope.$storage[this.$parent.poll.$id].voted = true;
            }
        $scope.polls.$save(this.$parent.poll);
    };

}]);
