/*
 * Created by evanmarchand on 11/11/16.
 */

var _ = require( 'lodash' );
var utils = require( 'utils' );


// first check to see if memory has been initiated
module.exports.initMemory = function () {
	//utils.cL( `initMem function: ${JSON.stringify( Memory )}, ${_.size( Game.spawns )}` );
	//utils.cL( _.size( Game.rooms ) );
	//utils.cL(JSON.stringify(Game.rooms)); // body info, energy avail, energy capacity
	//utils.cL(JSON.stringify(Game.spawns));
	//utils.cL(JSON.stringify(Game));
	
	
	if ( !Memory.init ) { // Initializer
		utils.cL('STARTING MEMORY INIT!!')
		
		// Store the rooms in memory
		for ( var room in Game.rooms ) {
			var roomI = Game.rooms[room];
			Memory.firstRoom = roomI.name;
			roomI.memory = roomI.name;
		}
		
		// only start with 1 spawn...
		for ( var name in Game.spawns ) {
			var firstSpawn = Game.spawns[ name ];
			//firstSpawn.memory = firstSpawn.name;
			//Memory.firstSpawn = firstSpawn.id;
			
			// list of sources in that room
			
			
			
			// automatically pull out closest
			
			
			// need other source too
			
			
			var firstSource = firstSpawn.pos.findInRange( FIND_SOURCES_ACTIVE );
			//console.log(firstSource + ' position '+firstSource.pos);
			firstSpawn.memory.firstSourceId = firstSource.id;
			var sourceIds = [];
			_.forEach( firstSpawn.room.find( FIND_SOURCES_ACTIVE ), function ( source ) {
				sourceIds.push( source );
			} );
			var filteredIds = _.pull( sourceIds, firstSource );
			var secondSource = firstSpawn.pos.findInRange( filteredIds );
			
			firstSpawn.memory.secondSourceId = secondSource.id;
			
			Memory.firstSpawn = Game.spawns[ name ].id; // store main spawn in memory*/
			
			
			
		}
		
		
		// ToDo: This needs to be cleaned up, reused from another module or config file...
		Memory.harvester = 0,
				//Memory.builder = 0,
				//Memory.guard = 0,
				//Memory.ranger = 0,
				//Memory.healer = 0;
				Memory.harvesterCurrent = 0,
				//Memory.builderCurrent = 0,
				//Memory.guardCurrent = 0,
				//Memory.rangerCurrent = 0,
				//Memory.healerCurrent = 0;
				//Memory.source1Harvs = [],
				//Memory.source2Harvs = [],
				//Memory.source3Harvs = [];
				Memory.deathsTotal = 0;
		
		Memory.init = true;
	}
};
