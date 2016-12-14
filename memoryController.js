/**
 * Created by evanmarchand on 12/9/16.
 */

var _ = require('lodash');
var utils = require('utils');

const memoryController = {
	/*
	*  Handles removing dead creeps
	*/
	cleanUp: function( spawn ) {
		if ( !spawn.spawning ) {
			for ( var name in Memory.creeps ) {
				//utils.cL((_.keys(Memory.creeps[ name ].assignedSource)[0]));
				if ( !Game.creeps[ name ] ) {
					
					if ( Memory.creeps[ name ].role === 'harvester') {
						utils.cL('harvester dying!');
						// ToDo: Remove this creep from the room.memory source assignment
						let room = Game.rooms[Memory.creeps[ name ].roomName];
						//utils.cL(`room info - ${utils.jS(room.memory)}`);
						let sourceName = _.keys(Memory.creeps[ name ].assignedSource)[0];
						if (sourceName !== undefined) {
							utils.cL( sourceName );
							room.memory.safeSourceIds[ sourceName ].harvs = _.pull( room.memory.safeSourceIds[ sourceName ].harvs, name );
						}
					}
					console.log( "DEL: " + name );
					Memory[ Memory.creeps[ name ].role + 'Current' ]--;
					Memory.deathsTotal++;
					delete Memory.creeps[ name ];
				}
			}
		}
	},
	/*
	* Any memory stuff that needs to be updated in real time
	*/
	cycle: function( room ) {
		room.memory.level = room.controller.level;
		//if (room.memory.level )
		
		// get room total capacity for storage
		let totalEnergyCapacity = room.energyCapacityAvailable;
		
		
		
	}
	
	
};

module.exports = memoryController;