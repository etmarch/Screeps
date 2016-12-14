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
						utils.cL(sourceName);
						room.memory.safeSourceIds[sourceName].harvs = _.pull(room.memory.safeSourceIds[sourceName].harvs, name);
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
		const spawnCoords = {
			x: room.memory.spawnPos.x,
			y: room.memory.spawnPos.y
		};
		
		const spawn = Game.getObjectById(room.memory.spawnId);
		// use findPath(fromPos, toPos, [opts]) to map out paths to sources
		let fastestPath = spawn.pos.findPathTo(room.memory.safeSourceIds['source0'].pos);
		let fastestPathSerial = room.findPath(spawn.pos, room.memory.safeSourceIds['source0'].pos, {serialize:true});
		utils.cL(`fastest path: ${fastestPath}`);
		utils.cL(`fastest path serial: ${fastestPathSerial}`);
		utils.cL(`serialized:  ${Room.serializePath(fastestPath)}`);
		
	}
	
	
};

module.exports = memoryController;