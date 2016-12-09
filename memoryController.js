/**
 * Created by evanmarchand on 12/9/16.
 */

let _ = require('lodash');
let utils = require('utils');

const memoryController = {
	
	cleanUp: function( spawn ) {
		if ( !spawn.spawning ) {
			for ( var name in Memory.creeps ) {
				if ( !Game.creeps[ name ] ) {
					
					if ( Memory.creeps[ name ].role === 'harvester') {
						utils.cL('harvester dying!');
						// ToDo: Remove this creep from the room.memory source assignment
						let room = Game.rooms[Memory.creeps[ name ].roomName];
						utils.cL(`room info - ${utils.jS(room.memory)}`);
						// room.memory.safeSourceIds
					}
					console.log( "DEL: " + name );
					Memory[ Memory.creeps[ name ].role + 'Current' ]--;
					Memory.deathsTotal++;
					delete Memory.creeps[ name ];
				}
			}
		}
	}
	
};

module.exports = memoryController;