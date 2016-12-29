/**
 * Population Manager File.
 *
 * Purpose: Spawn actual creeps, add them to memory
 *  -Eventually: calculate the math for what to spawn...
 */

var _ = require( 'lodash' );
var roles = require( 'roles' );
var utils = require( 'utils' );

const Pop = {
	// will be called each tick, checks to make sure suitable for spawning
	mainPopLoop: function (  ) {
		
	},
	
	spawn: function ( spawn, role ) {
		if ( (spawn.canCreateCreep( roles()[ role ][ 'parts' ] ) == OK) && !spawn.spawning ) {
			
			let creepName = `${role}-${Game.time}`;//`${role}-${Memory[ role ] + 1}`;
			let creepMemory = {
				role: role,
				roomName: spawn.room.name
			};
			
			if ( role === 'harvester' ) {
				creepMemory = _.merge( creepMemory, { assignedSource: Pop.assignHarvToSource( creepName, spawn ) } );
			}
			
			var result = spawn.createCreep( roles()[ role ][ 'parts' ], creepName, creepMemory );
			utils.cL( `Name of new screep - ${result}..... Cost is: ${utils.countBodyCost( role )}` );
			if ( _.isString( result ) ) {
				//Memory[ role + 'Current' ]++;
				//Memory[ role ]++;
				return result;
			}
		}
		
	},
	
	//
	assignHarvToSource: function ( name, spawn ) {
		// Get number of harvs in closest source
		let room = spawn.room;
		//utils.cL(room);
		//utils.cL(utils.jS(room.memory));
		//utils.cL(_.size(room.memory.safeSourceIds));
		//utils.cL(`${utils.jS(room.memory.safeSourceIds)}`);
		//utils.cL(`size: ${_.size(room.memory.safeSourceIds)}`);
		
		let nameToGo = {};
		
		for ( let i = 0; i < _.size( room.memory.safeSourceIds ); i++ ) {
			let nameInd = `source${i}`;
			utils.cL(` source Id test:  ${utils.jS(room.memory.safeSourceIds[nameInd])}`);
			let harvCount = _.size( room.memory.safeSourceIds[ nameInd ].harvs );
			//utils.cL( `source count: ${harvCount}` );
			if ( harvCount < room.memory.safeSourceIds[ nameInd ].maxHarvs ) {
				//utils.cL( `Assigning Harv ti souurce!` );
				nameToGo[ nameInd ] = room.memory.safeSourceIds[ nameInd ].id;
				room.memory.safeSourceIds[ nameInd ].harvs.push( name );
				break;
			}
		}
		//utils.cL(`name: ---  ${utils.jS(nameToGo)}`);
		return nameToGo;
	},
	//ToDo: Count through all creeps and return object with key:role val:count
	getAllCounts: function () {
		
	},
	
	removeHarvFromSource: function ( harvester ) {
		
	}
};
module.exports = Pop;