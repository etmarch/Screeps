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
				//throw new Error('Cant create the creep!')
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
	},
	
	//
	assignHarvToSource: function( creep ) {
		// Get number of harvs in closest source
		let room = Game.rooms[creep.room];
		utils.cL(`${_.size(room.memory.source1Harvs)}`);
		
		// loop through each of the sources
		_.forEach(room.memory.safeSourceIds, function(sourceId, index) {
			let sourceCount = _.size();
		});
		let firstSourceCount = _.size(Game.rooms[creep.room].memory.source1Harvs);
		if (firstSourceCount < 3) {
			creep.memory.assignedSourceId = Game.rooms[creep.room].memory.source1Id;
			Game.rooms[creep.room].memory.source1Harvs.push(creep.id);
		}
		//    else check if second closest source has 4
		
		//      if not, assign to second closest
		
		// repeat process until all sources are accounted for
		
	},
	
	removeHarvFromSource: function( harvester ) {
		
	}
};
module.exports = Pop;