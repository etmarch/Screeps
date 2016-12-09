/**
 * Created by evanmarchand on 12/9/16.
 */

var _ = require('lodash');
var utils = require('utils');

const memoryController = {
	
	cleanUp: function( spawn ) {
		if ( !spawn.spawning ) {
			for ( var name in Memory.creeps ) {
				//utils.cL(utils.jS((_.keys(Memory.creeps[ name ].assignedSource))));
				if ( !Game.creeps[ name ] ) {
					
					if ( Memory.creeps[ name ].role === 'harvester') {
						utils.cL('harvester dying!');
						// ToDo: Remove this creep from the room.memory source assignment
						let room = Game.rooms[Memory.creeps[ name ].roomName];
						utils.cL(`room info - ${utils.jS(room.memory)}`);
						let sourceName = _.keys(Memory.creeps[ name ].assignedSource);
						utils.cL(sourceName);
						//room.memory.safeSourceIds
					}
					console.log( "DEL: " + name );
					Memory[ Memory.creeps[ name ].role + 'Current' ]--;
					Memory.deathsTotal++;
					delete Memory.creeps[ name ];
				}
			}
		}
	},
	
	cycle: function( room ) {
		room.memory.level = room.controller.level;
		//if (room.memory.level )
	}
	
	
};

module.exports = memoryController;