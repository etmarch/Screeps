/*
 * Created by evanmarchand on 11/11/16.
 */

var _ = require( 'lodash' );
var utils = require( 'utils' );


// first check to see if memory has been initiated
module.exports.initMemory = function () {
	//utils.cL( `initMem function: ${JSON.stringify( Memory )}, ${_.size( Game.spawns )}` );
	utils.cL( _.size( Game.rooms ) );
	
	if ( !Memory.init ) { // Initializer
		utils.cL('STARTING MEMORY INIT!!')
		for ( var name in Game.spawns ) {
			var mainSpawn = Game.spawns[ name ];
			Memory.mainSpawn = mainSpawn.id;
			/*var firstSource = mainSpawn.pos.findClosest( FIND_SOURCES_ACTIVE );
			//console.log(firstSource + ' position '+firstSource.pos);
			mainSpawn.memory.firstSourceId = firstSource.id;
			var sourceIds = [];
			_.forEach( mainSpawn.room.find( FIND_SOURCES_ACTIVE ), function ( source ) {
				sourceIds.push( source );
			} );
			var filteredIds = _.pull( sourceIds, firstSource );
			var secondSource = mainSpawn.pos.findClosest( filteredIds );
			
			mainSpawn.memory.secondSourceId = secondSource.id;
			
			Memory.mainSpawn = Game.spawns[ name ].id; // store main spawn in memory*/
			
			
			utils.cL( `mainSpawn: ${mainSpawn}, Game.spawns: ${Game.spawns}` );
		}
		
		// Store the rooms in memory
		for ( var room in Game.rooms ) {
			var roomI = Game.rooms[room];
			Memory[room] = roomI.id;
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
