'use strict';

var samplePoll = {
            head: "CCC",
            timestamp: new Date().getTime() -1,
            items: [{option: "1", vote: 0},{option: "2", vote: 0}],
            totalVote: 0,
            latest: true
        };

var pollsList=[{
            head: "AAA",
            timestamp: new Date().getTime(),
            items: [{option: "1", vote: 0},{option: "2", vote: 0}],
            totalVote: 0,
            latest: true
        },{
            head: "BBB",
            timestamp: 0,
            items: [{option: "1", vote: 2},{option: "2", vote: 1}],
            totalVote: 3,
            latest: false
        },{
            head: "CCC",
            timestamp: new Date().getTime() -1,
            items: [{option: "1", vote: 0},{option: "2", vote: 0}],
            totalVote: 0,
            latest: true
        },{
            head: "DDD",
            timestamp: new Date().getTime()-20,
            items: [{option: "1", vote: 0},{option: "2", vote: 5}],
            totalVote: 5,
            latest: false
        },{
            head: "E",
            timestamp: 0,
            items: [{option: "1", vote: 0},{option: "2", vote: 0}],
            totalVote: 0,
            latest: true
        }];

describe('PollCtrl', function() {
  beforeEach(module('todomvc'));

  describe('pollFilter Testing', function() {
    beforeEach(module(function($provide) {
      $provide.value('version', 'TEST_VER'); //TODO: what is this provide?
      console.log("provide.value: " + $provide.value);
    }));

    it('has a poll filter', inject(function($filter) {
      expect($filter('pollFilter')).not.toBeNull();
    }));
		
		it('Empty list', inject(function(pollFilterFilter) { // need to put Filter suffix
      var filteredList = pollFilterFilter([], 1);
      expect(filteredList).toBe(undefined);
			//console.log(JSON.stringify(filteredList, null, '\t'));

    }));
		

    it('Filter max test', inject(function(pollFilterFilter) { // need to put Filter suffix
      var filteredList = pollFilterFilter(pollsList, 0);
      expect(filteredList.length).toEqual(0);
			//console.log(JSON.stringify(filteredList, null, '\t'));
    }));
		
		it('Filter max test', inject(function(pollFilterFilter) { // need to put Filter suffix
      var filteredList = pollFilterFilter(pollsList, 100);
      expect(filteredList.length).toEqual(5);
			//console.log(JSON.stringify(filteredList, null, '\t'));

    }));
		
		it('Filter max test', inject(function(pollFilterFilter) { // need to put Filter suffix
      var filteredList = pollFilterFilter(pollsList, 1);
      expect(filteredList.length).toEqual(1);
			//console.log(JSON.stringify(filteredList, null, '\t'));

    }));
		it('pollListFilter left', inject(function(pollListFilterFilter) { // need to put Filter suffix
      var filteredList = pollListFilterFilter(pollsList, 0);
      expect(filteredList.length).toEqual(3);
			//console.log(JSON.stringify(filteredList, null, '\t'));

    }));
    it('pollListFilter right', inject(function(pollListFilterFilter) { // need to put Filter suffix
      var filteredList = pollListFilterFilter(pollsList, 1);
      expect(filteredList.length).toEqual(2);
			//console.log(JSON.stringify(filteredList, null, '\t'));

    }));
    it('pollListFilter empty', inject(function(pollListFilterFilter) { // need to put Filter suffix
      var filteredList = pollListFilterFilter([], 99);
      expect(filteredList.length).toEqual(0);
			//console.log(JSON.stringify(filteredList, null, '\t'));

    }));
  });
});
