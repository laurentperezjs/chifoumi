var assert = require('assert');
var Rule = require('../src/client/app/Rule.jsx');

const choices = [
{id: 1, name: "lizard", beats: [2,4]},
{id: 2, name: "spock", beats: [3,5]},
{id: 3, name: "scissors", beats: [4,1]},
{id: 4, name: "paper", beats: [5,2]},
{id: 5, name: "rock", beats: [1,3]}
];

describe('Game rules', function() {
	describe('Rule#compute()', function () {
		it('lizard should beat spock', function () {
			var r = new Rule(choices, [1,2])
			var res = r.compute();
			assert.equal(1,res.winner);
		});
		it('lizard should beat paper', function () {
			var r = new Rule(choices, [1,4])
			var res = r.compute();
			assert.equal(1,res.winner);
		});
		it('spock should beat scissors', function () {
			var r = new Rule(choices, [2,3])
			var res = r.compute();
			assert.equal(1,res.winner);
		});
		it('spock should beat rock', function () {
			var r = new Rule(choices, [2,5])
			var res = r.compute();
			assert.equal(1,res.winner);
		});
		it('scissors should beat paper', function () {
			var r = new Rule(choices, [3,4])
			var res = r.compute();
			assert.equal(1,res.winner);
		});
		it('scissors should beat lizard', function () {
			var r = new Rule(choices, [3,1])
			var res = r.compute();
			assert.equal(1,res.winner);
		});

		it('paper should beat rock', function () {
			var r = new Rule(choices, [4,5])
			var res = r.compute();
			assert.equal(1,res.winner);
		});

		it('paper should beat spock', function () {
			var r = new Rule(choices, [4,2])
			var res = r.compute();
			assert.equal(1,res.winner);
		});

		it('rock should beat lizard', function () {
			var r = new Rule(choices, [5,1])
			var res = r.compute();
			assert.equal(1,res.winner);
		});
		it('rock should beat scissors', function () {
			var r = new Rule(choices, [5,3])
			var res = r.compute();
			assert.equal(1,res.winner);
		});
		
	});
});