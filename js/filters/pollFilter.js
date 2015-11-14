/*global todomvc, angular, Firebase */
'use strict';

/**
* The questionFilter
* Show the new questions on the top and show only max questions 
*
*/
todomvc.filter('pollFilter', function () {
  return function (input, max) {
    var sorted = [];
    var newPolls = [];
	 var recentPolls = [];
    var sortedCount = 0;
		
    var maxResponse = 0;
		var x;
		if (input.length == 0)
			return;
		for (x in input){
			if (input[x].latest == true){ // a newly posted question
					newPolls.push(input[x]);
					sortedCount++;
        } else if (input[x].timestamp > new Date().getTime() - 180000) { // 3min
          //todo.new = true;
          recentPolls.push(input[x]);
        } else if (input[x].totalVote > maxResponse){
					maxResponse = input[x].totalVote;
					recentPolls.push(input[x]);
        } else if (sortedCount++<=max){  // show top n only.
           input[x].latest = false;
           sorted.push(input[x]);
        }
			
			recentPolls.sort(function(a, b) {
        if (a.totalVote == b.totalVote) {
          return b.timestamp - a.timestamp;
        }
        return b.totalVote - a.totalVote;
      });
			//the leftover needs to be sorted also
			sorted.sort(function(a, b) {
        if (a.totalVote == b.totalVote) {
          return b.timestamp - a.timestamp;
        }
        return b.totalVote - a.totalVote;
      });
		}
    // Combined list
		var qL = newPolls.concat(recentPolls).concat(sorted);
		if (qL.length <= max)
			return qL;
		else
			return qL.splice(0,max);
  };
});
