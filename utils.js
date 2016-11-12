/**
 * Created by evanmarchand on 11/11/16.
 */
/* UTILS
 *
 * Helper functions used everywhere
 */

var _ = require('lodash');
//var roles = require('roles');

// check if value is a real number
function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

let cL = ( out ) => console.log( out );

Utils = {
	countRole: (creepRole) => {
		var total = _.filter(Game.creeps, {
			memory: {role: creepRole}
		});
		return _.size(total);
	},
	
	cL: ( out ) => {
		return cL(out);
	},
	// Attach action functions to this wrapper (ex attack, move, etc...)
	debugWrap: (fnToExec) => {
		let result = (function(){ fnToExec() });
		cL(`${typeof result} input: ${fnToExec}  result: ${result}`);
		// Debugging Helper function
		if(result != OK) {
			return console.log(`Error code: ${result} returned!`);
		}
	}
	
};

module.exports = Utils;

// Helper function to count amount of creeps of certain role, return number of creeps
/*
module.exports.countRole = function(creepRole) {
	var total = _.filter(Game.creeps, {
		memory: {role: creepRole}
	});
	return _.size(total);
};
*/



// Return array of enemy creeps in range, excluding the source Keeper
module.exports.enemiesInRange = function(creep, range) {
	
};

// Return array of friendly creeps that can attack in range, excluding the source Keeper
module.exports.fightersInRange = function(creep, range, bodyParts) {
	/*if (!isNumber(range)) {
		return "ERR: Range must be number!";
	} else {
		
		
		
		return creep.pos.findInRange(FIND_MY_CREEPS, range, {
			filter: function(c) {
				return (c.memory.fighter === true);
			}
		});
	}*/
};







/*
*
* IDEAS
*
* 1. Build umbrella pseudo game (gme) class, containing custom built commands corresponding to functions...
* */