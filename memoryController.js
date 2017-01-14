/**
 * Created by evanmarchand on 12/9/16.
 */

var _ = require( 'lodash' );
var utils = require( 'utils' );
require( 'prototype.source' );


const memoryController = {
	cleanUp: function ( spawn ) {
		//utils.cL(` ${spawn} spawning? ${spawn.spawning}`);
		if ( !spawn.spawning ) {
			for ( var name in Memory.creeps ) {
				//utils.cL((_.keys(Memory.creeps[ name ].assignedSource)[0]));
				if ( !Game.creeps[ name ] ) {
					if ( Memory.creeps[ name ].role === 'harvester' ) { // only for harvester
						//utils.cL('harvester dying!');
						let room = spawn.room;
						//debugging
						if ( room.memory ) {
							//utils.cL(JSON.stringify(room.memory));
							//utils.cL(`room info - ${utils.jS(room.memory)}`);
							let sourceId = ( Memory.creeps[ name ].assignedSource );
							//utils.cL( sourceId );
							if ( sourceId !== undefined ) {
								//utils.cL( sourceName );
								//utils.cL( `Before:  ${utils.jS( room.memory.sources[ sourceId ].harvs )}`);
								//room.memory.sources[ sourceId ].harvs = _.pull( room.memory.sources[ sourceId ].harvs, name );
								//utils.cL( `After:  ${utils.jS( room.memory.sources[ sourceId ].harvs )}`);
							}
							
							
							// clean any dead harvs from the source memory
							/*for( let source in room.memory.sources) {
							 let sourceObj = Game.getObjectById(source);
							 utils.cL(
							 `cleaning source memory now!: ${(sourceObj)}`
							 );
							 sourceObj.cleanHarvMemory();
							 }*/
						}
					} // Otherwise, not harvester
					console.log( "DEL: " + name );
					delete Memory.creeps[ name ];
				}
			}
		}
		
		for ( let room in Memory.rooms ) {
			if ( !Game.rooms[ room ] ) {
				delete Memory.rooms[ room ];
			}
		}
	},
	
	/*
	 * Any memory stuff that needs to be updated in real time
	 */
	cycle: function ( room ) {
		room.memory.level = room.controller.level;
		//if (room.memory.level )
		
		// get room total capacity for storage
		let totalEnergyCapacity = room.energyCapacityAvailable;
		
		
		//todo check that all sources full, if not, assign an idle harv
	}
	
	
};

module.exports = memoryController;


/*
 *  Handles removing dead creeps
 
 */
							