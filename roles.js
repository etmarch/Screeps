/**
 * Roles
 *
 *
 */

const partsCosts = {
	[MOVE]: 50,
	[WORK]: 100,
	[ATTACK]: 80,
	[CARRY]: 50,
	[HEAL]: 250,
	[RANGED_ATTACK]: 150,
	[TOUGH]: 10,
	[CLAIM]: 600
};

module.exports = function () {
	return {
		'harvester': {
			"parts": [ WORK, CARRY, MOVE, MOVE ],
			"partExtensions": [WORK],
			"fighter": false
		},
		'builder': {
			"parts": [ MOVE, MOVE, CARRY, WORK ],
			"fighter": false
		},
		'guard': {
			"parts": [ TOUGH, ATTACK, ATTACK, MOVE, MOVE ],
			"fighter": true
		},
		'ranger': {
			"parts": [ TOUGH, TOUGH, TOUGH, RANGED_ATTACK, MOVE ],
			"fighter": true
		},
		'healer': {
			"parts": [ TOUGH, TOUGH, HEAL, MOVE ],
			"fighter": true
		},
		'upgrader': {
			"parts": [ WORK, CARRY, MOVE, MOVE ],
			"fighter": false
		},
		
	};
}