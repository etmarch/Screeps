/**
 * Roles
 *
 *
 */

let pop = require('population');

module.exports = function () {
	return {
		'harvester': { "parts": [ WORK, CARRY, MOVE, MOVE ], "fighter": false, assignedSource: pop.assignHarvToSource() },
		'builder': { "parts": [ MOVE, MOVE, CARRY, WORK ], "fighter": false },
		'guard': { "parts": [ TOUGH, ATTACK, ATTACK, MOVE, MOVE ], "fighter": true },
		'ranger': { "parts": [ TOUGH, TOUGH, TOUGH, RANGED_ATTACK, MOVE ],  "fighter": true },
		'healer': { "parts": [ TOUGH, TOUGH, HEAL, MOVE ],  "fighter": true },
		'upgrader': { "parts": [ WORK, CARRY, MOVE, MOVE ], "fighter": false },
		
	};
}