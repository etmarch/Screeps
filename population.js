/**
 * Population Manager File.
 *
 * Purpose: Spawn actual creeps, add them to memory
 *  -Eventually: calculate the math for what to spawn...
 */

var _ = require('lodash');
var roles = require('roles');
var utils = require( 'utils' );

const Pop = {
	spawn: function ( spawn, role ) {
		// first, check both are good
		//if (/*check that role is string and spawn is object*/) {
		//
		//}
		// check theres enough energy at spawn, and spawn can do it
		if (spawn.energy >= roles()[role]['cost'] && spawn.canCreateCreep(roles()[role]['parts']) == OK ) {
			// todo: error checking and debugging here - make helper function
			var result = spawn.createCreep(roles()[role]['parts'], (`name-${Game.cpu.getUsed()}`), roles()[role]);
			utils.cL(result);
		}
	}
};
module.exports = Pop;