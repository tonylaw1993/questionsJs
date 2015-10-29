'use strict';

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
		latest: false
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
	dislike: 0,
  order: 0,
	latest: false
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
	dislike: 0,
  order: 4,
	latest: false
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
	dislike: 0,
  order: 5,
	latest: false
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
	dislike: 2,
  order: 0,
	latest: false
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
	dislike: 2,
  order: 0,
	latest: false
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
	dislike: 3,
  order: 2,
	latest: false
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
	dislike: 0,
  order: 1,
	latest: true
}];

describe('TodoCtrl', function() {
  beforeEach(module('todomvc'));

  describe('questionFilter Testing', function() {
    beforeEach(module(function($provide) {
      $provide.value('version', 'TEST_VER'); //TODO: what is this provide?
      console.log("provide.value: " + $provide.value);
    }));

    it('has a question filter', inject(function($filter) {
      expect($filter('questionFilter')).not.toBeNull();
    }));
		
		it('Empty list', inject(function(questionFilterFilter) { // need to put Filter suffix
      var filteredList = questionFilterFilter([], 1);
      expect(filteredList).toBe(undefined);
			//console.log(JSON.stringify(filteredList, null, '\t'));

    }));
		

    it('Filter max test', inject(function(questionFilterFilter) { // need to put Filter suffix
      var filteredList = questionFilterFilter(questionList, 0);
      expect(filteredList.length).toEqual(0);
			//console.log(JSON.stringify(filteredList, null, '\t'));
    }));
		
		it('Filter max test', inject(function(questionFilterFilter) { // need to put Filter suffix
      var filteredList = questionFilterFilter(questionList, 100);
      expect(filteredList.length).toEqual(7);
			//console.log(JSON.stringify(filteredList, null, '\t'));

    }));
		
		it('Filter max test', inject(function(questionFilterFilter) { // need to put Filter suffix
      var filteredList = questionFilterFilter(questionList, 1);
      expect(filteredList.length).toEqual(1);
			//console.log(JSON.stringify(filteredList, null, '\t'));

    }));
		
  });
});
