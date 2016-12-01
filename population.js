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
		if (spawn.energy >= roles()[role]['cost'] && !spawn.spawning ) {
			if (spawn.canCreateCreep(roles()[role]['parts']) == OK) {
				//throw new Error('Cant create the creep!');
				//utils.cL(` ${Memory[role]} Number since start: ${_.size(Memory[role])}`);
				// todo: error checking and debugging here - make helper function
				var result = spawn.createCreep( roles()[ role ][ 'parts' ], (`${role}-${Memory[role] + 1}`), _.merge( { role: role }, roles()[ role ] ) );
				utils.cL( `Name of new screep - ${result}..... Cost is: ${utils.countBodyCost(role)}` );
				if ( _.isString( result ) ) {
					Memory[ role + 'Current' ]++;
					Memory[ role ]++;
					return result;
				}
			}
		}
	}
};
module.exports = Pop;