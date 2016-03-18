'use strict';

class Rule {
	constructor(choices, rounds) {
		this.choices = choices;
		this.rounds = rounds;
	}

	compute() {
		var res;
		var p1c = this.rounds[0];
		var p2c = this.rounds[1];
		console.log("player1 choice:" + p1c)
		console.log("player2 choice:" + p2c)
		this.choices.map(function(choice) {
			var choiceid = choice.id;
			var choicename = choice.name;
			var beats = choice.beats;
			if(p1c === choiceid) {
				if(beats.includes(p2c)) {
					res = {winner : 1, choicename : choicename};
				} 
			}
			if(p2c === choiceid) {
				if(beats.includes(p1c)) {
					res = {winner : 2, choicename : choicename};
				} 
			}
			if(p1c === p2c) {
				res = {winner : 0, choicename : choicename};
			}
		});
		return res;
	}
}
module.exports = Rule;