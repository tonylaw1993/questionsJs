/*global todomvc, angular, Firebase */
'use strict';

/**
* The questionFilter
* Show the new questions on the top and show only max questions 
*
*/
todomvc.filter('questionFilter', function () {
  return function (input, max) {
    var sorted = [];
    var newQuestions = [];
		var recentQuestions = [];
    var sortedCount = 0;
		
    var maxResponse = 0;
		var x;
		for (x in input){
			if (input[x].latest == true){ // a newly posted question
					newQuestions.push(input[x]);
					sortedCount++;
        } else if (input[x].timestamp > new Date().getTime() - 180000) { // 3min
          //todo.new = true;
          recentQuestions.push(input[x]);
        } else if (input[x].echo + input[x].dislike > maxResponse){
					maxResponse = input[x].echo + input[x].dislike;
					recentQuestions.push(input[x]);
        } else if (sortedCount++<=max){  // show top n only.
           input[x].latest = false;
           sorted.push(input[x]);
        }
			
			recentQuestions.sort(function(a, b) {
        if ((a.echo + a.dislike) == (b.echo + b.dislike)) {
          return b.timestamp - a.timestamp;
        }
        return (b.echo + b.dislike) - (a.echo + a.dislike);
      });
			//the leftover needs to be sorted also
			sorted.sort(function(a, b) {
        if ((a.echo + a.dislike) == (b.echo + b.dislike)) {
          return b.timestamp - a.timestamp;
        }
        return (b.echo + b.dislike) - (a.echo + a.dislike);
      });
		}
		/*
    angular.forEach(input, function (todo) {
        if (todo.latest == true){ // a newly posted question
					newQuestions.push(todo);
					sortedCount++;
        } else if (todo.timestamp > new Date().getTime() - 180000) { // 3min
          //todo.new = true;
          newQuestions.push(todo);
        } else if (todo.echo + todo.dislike > maxResponse){
						maxResponse = todo.echo + todo.dislike;
						newQuestions.push(todo);
        } else if (sortedCount++<=max){  // show top n only.
            todo.latest = false;
            sorted.push(todo);
        } else {
					return;
				}
        //sortedCount++; 

      // sorting new questions based on the time if echo is the same.
      // Newer ones are on the top
      newQuestions.sort(function(a, b) {
        if ((a.echo + a.dislike) == (b.echo + b.dislike)) {
          return b.timestamp - a.timestamp;
        }
        return (b.echo + b.dislike) - (a.echo + a.dislike);
      });
			//the leftover needs to be sorted also
			sorted.sort(function(a, b) {
        if ((a.echo + a.dislike) == (b.echo + b.dislike)) {
          return b.timestamp - a.timestamp;
        }
        return (b.echo + b.dislike) - (a.echo + a.dislike);
      });
    });
		*/
    // Combined list
		var qL = newQuestions.concat(recentQuestions).concat(sorted);
		if (qL.length <= max)
			return qL;
		else
			return qL.splice(0,max);
  };
});
