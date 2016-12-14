/*
 * Room Object Stuff.
 */

var _ = require( 'lodash' );
var utils = require( 'utils' );

const roomController = {
	getEmptyTilesSpawn: function ( spawnId ) {
		let spawn = Game.getObjectById(spawnId);
		if (spawn === null) {
			utils.cL(`No Spawn found!!`);
			throw new Error(`No Spawn found for ID: ${spawnId}`);
		}
		// get the tiles around the spawn, check if they are empty
	}
	
};

module.exports = roomController;


	
	/*
	To get the path to a source from a spawn
	const spawn = Game.getObjectById(room.memory.spawnId);
	let source0 = Game.getObjectById(room.memory.safeSourceIds['source0'].id);
	let fastestPath = spawn.pos.findPathTo(source0);
	
	*/
	
	/*utils.cL( `Totals - Active Sources: ${activeSourceArr.length}, Spawns: ${spawnArr.length}, Hostile Creeps: ${hostCreepsArr.length}, My Creeps: ${myCreepsArr.length}` );
	utils.cL( `Spawn Energy: ${spawnArr[ 0 ].energy}, Spawning? ${(!spawnArr[ 0 ].spawning ? 'N' : 'Y')}` );*/
