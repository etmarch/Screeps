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
		if (spawn.energy >= utils.countBodyCost(role) && !spawn.spawning ) {
			if (spawn.canCreateCreep(roles()[role]['parts']) == OK) {
				//Pop.assignHarvToSource();
				//throw new Error('Cant create the creep!')
				//utils.cL(` ${spawn.room}`);
				//utils.cL(` big  - ${utils.jS(spawn)}`);
				// todo: error checking and debugging here - make helper function
				let creepName = `${role}-${Memory[role] + 1}`;
				let creepMemory = {
					role: role,
					assignedSource: Pop.assignHarvToSource(),
					roomName: spawn.room.name
				};
				
				var result = spawn.createCreep( roles()[ role ][ 'parts' ], creepName, creepMemory );
				utils.cL( `Name of new screep - ${result}..... Cost is: ${utils.countBodyCost(role)}` );
				if ( _.isString( result ) ) {
					Memory[ role + 'Current' ]++;
					Memory[ role ]++;
					return result;
				}
			}
		}
	},
	
	//
	assignHarvToSource: function( ) {
		// Get number of harvs in closest source
		let room = Game.rooms[Memory.startRoom];
		//utils.cL(utils.jS(room.memory));
		//utils.cL(_.size(room.memory.safeSourceIds));
		//utils.cL(`${utils.jS(room.memory.safeSourceIds)}`);
		//utils.cL(`size: ${_.size(room.memory.safeSourceIds)}`);
		
		let nameToGo = {};
		
		for (let i = 0; i < _.size(room.memory.safeSourceIds); i++) {
			let nameInd = `source${i}`;
			//utils.cL(` source Id test:  ${utils.jS(room.memory.safeSourceIds[nameInd])}`);
			let sourceCount = _.size(room.memory.safeSourceIds[i]);
			//utils.cL(`source count: ${sourceCount}`);
			if (sourceCount < 3) {
				nameToGo[nameInd] = room.memory.safeSourceIds[nameInd].id;
				//utils.cL(`name: ---  ${nameToGo}`);
				break;
			}
		}
		//utils.cL(`name: ---  ${nameToGo}`);
		return nameToGo;
	},
	
	removeHarvFromSource: function( harvester ) {
		
	}
};
module.exports = Pop;