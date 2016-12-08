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
				//utils.cL(` ${Memory[role]} Number since start: ${_.size(Memory[role])}`);
				// todo: error checking and debugging here - make helper function
				let name = `${role}-${Memory[role] + 1}`;
				let creepMemory = {
					role: role,
					assignedSource: Pop.assignHarvToSource()
				};
				
				var result = spawn.createCreep( roles()[ role ][ 'parts' ], name, creepMemory );
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
		
		// loop through each of the sources
		let nameToGo = '';
		/*_.forEach(room.memory.safeSourceIds, function(sourceId, index, collection) {
			let sourceCount = _.size(collection[index].harvs);
			utils.cL(utils.jS(sourceId));
			utils.cL(sourceCount+'  '+index);
			utils.cL(`index: ${utils.jS(room.memory.safeSourceIds[index])} and whole: ${utils.jS(collection)}`);
			if (sourceCount < 3) {
				//room.memory.safeSourceIds[`source${index}`].harvs.push(creep.id);
				let nameToGo = index;
				//return nameToGo;
			}
			
			
		});*/
		
		for (let i = 0; i < _.size(room.memory.safeSourceIds); i++) {
			utils.cL(` source Id test:  ${utils.jS(room.memory.safeSourceIds[i])}`);
			let sourceCount = _.size(room.memory.safeSourceIds[i]);
			utils.cL(`source count: ${sourceCount}`);
			if (sourceCount < 3) {
				nameToGo = room.memory.safeSourceIds[i];
				utils.cL(`name: ---  ${nameToGo}`);
				//return nameToGo;
				break;
			}
		}
		
		utils.cL(`name: ---  ${nameToGo}`);
		return nameToGo;
		/*let firstSourceCount = _.size(Game.rooms[creep.room].memory.source1Harvs);
		if (firstSourceCount < 3) {
			creep.memory.assignedSourceId = Game.rooms[creep.room].memory.source1Id;
			Game.rooms[creep.room].memory.source1Harvs.push(creep.id);
		}*/
		//    else check if second closest source has 4
		
		//      if not, assign to second closest
		
		// repeat process until all sources are accounted for
		
		// return sourceId.
		
	},
	
	removeHarvFromSource: function( harvester ) {
		
	}
};
module.exports = Pop;