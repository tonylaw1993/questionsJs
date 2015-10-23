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
    var sortedCount = 0;
		
		var maxEcho = 0;
		
    angular.forEach(input, function (todo) {
			if (todo.latest == true){
				newQuestions.unshift(todo);
			} else if (todo.timestamp > new Date().getTime() - 180000) { // 3min
        //todo.new = true;
        newQuestions.push(todo);
      } else if (todo.echo > maxEcho){
				maxEcho = todo.echo;
				newQuestions.push(todo);
			} else if (sortedCount++<=max){  // show top n only.
        todo.latest = false;
        sorted.push(todo);
      }

      // sorting new questions based on the time if echo is the same.
      // Newer ones are on the top
      newQuestions.sort(function(a, b) {
        if (a.echo == b.echo) {
          return b.timestamp - a.timestamp;
        }
        return b.echo - a.echo;
      });
			//the leftover needs to be sorted also
			sorted.sort(function(a, b) {
        if (a.echo == b.echo) {
          return b.timestamp - a.timestamp;
        }
        return b.echo - a.echo;
      });
    });

    // Combined list
    return newQuestions.concat(sorted);
  };
});
