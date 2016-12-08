/**
 * Created by evanmarchand on 11/11/16.
 */
/* UTILS
 *
 * Helper functions used everywhere
 */

var _ = require( 'lodash' );
var roles = require( 'roles' );


let cL = ( out ) => console.log( out );

const partsCosts = {
	"move": 50,
	"work": 100,
	"attack": 80,
	"carry": 50,
	"heal": 250,
	"ranged_attack": 150,
	"tough": 10,
	"claim": 600
};

const Utils = {
	countRole: ( creepRole ) => {
		var total = _.filter( Game.creeps, {
			memory: { role: creepRole }
		} );
		return _.size( total );
	},
	countBodyCost: ( roleName ) => {
		const parts = roles()[ roleName ][ 'parts' ];
		//const partNames = _.keysIn( partsCosts );
		//const costs = _.values(partsCosts);
		let sumCost = 0;
		//cL( `parts - ${parts}, names - ${partNames} - ${costs}` );
		_.forEach( parts, function ( part ) {
			//cL( `part - ${part}, ${partsCosts[part]}` );
			sumCost += partsCosts[part];
		} );
		return sumCost;
	},
	
	cL: ( out ) => {
		return cL( out );
	},
	jS: (out) => {
		return JSON.stringify(out);
	},
	
	findEnemies: (obj) => {
		let target = obj.room.find(FIND_HOSTILE_CREEPS, {
			filter: function(object) {
				return (object.getActiveBodyparts(ATTACK) == 0 || object.getActiveBodyparts(RANGED_ATTACK) == 0);
			}
		});
		if (target.length) {
			utils.cL(`target from findEnemies: ${target}`);
			return target;
		} else {
			return -1;
		}
	},
	
	enemiesInRange: (obj, distance) => {
		// Get the room pos of the object being checked
		cL(obj.pos);
		cL(Game.getObjectById(obj));
		let target = obj.pos.findInRange(FIND_HOSTILE_CREEPS, distance);
		utils.cL(`target in enemiesInRange: ${target}`);
		if (target.length) {
			return target;
		}
	},
	// ToDo: Suicide checker and function
	
	
	// Attach action functions to this wrapper (ex attack, move, etc...)
	debugWrap: ( fnToExec ) => {
		cL( fnToExec );
		let result = fnToExec;
		cL( `${typeof result} result: ${result}` );
		// Debugging Helper function
		if ( result != OK ) {
			return console.log( `Error code: ${result} returned!` );
		}
		return result;
	},
	
	getCPUPercent: () => {
		return (((Game.cpu.getUsed() / Game.cpu.limit) * 100).toFixed( 2 ));
	},
	
	
	
};

module.exports = Utils;


// Return array of friendly creeps that can attack in range, excluding the source Keeper
module.exports.fightersInRange = function ( creep, range, bodyParts ) {
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


const errorConstList = {
	OK: 0,
	ERR_NOT_OWNER: -1,
	ERR_NO_PATH: -2,
	ERR_NAME_EXISTS: -3,
	ERR_BUSY: -4,
	ERR_NOT_FOUND: -5,
	ERR_NOT_ENOUGH_ENERGY: -6,
	ERR_NOT_ENOUGH_RESOURCES: -6,
	ERR_INVALID_TARGET: -7,
	ERR_FULL: -8,
	ERR_NOT_IN_RANGE: -9,
	ERR_INVALID_ARGS: -10,
	ERR_TIRED: -11,
	ERR_NO_BODYPART: -12,
	ERR_NOT_ENOUGH_EXTENSIONS: -6,
	ERR_RCL_NOT_ENOUGH: -14,
	ERR_GCL_NOT_ENOUGH: -15
};

/*
 *
 * IDEAS
 *
 *
 * */