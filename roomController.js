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
		// Start with just the 4 corners for now
		let spawnX = spawn.pos.x;
		let spawnY = spawn.pos.y;
		
		//console.log(spawnX+2, spawnY-2, spawnX-2, spawnY+2);
		
		// ToDo: to get range of coords, add inputs coords abs(y1) + abs(y2), and loop down array
		//const terrainArray = spawn.room.lookForAtArea(LOOK_TERRAIN, spawnY-2, spawnX-2, spawnY+2, spawnX+2, {asArray:
		// true});
		//let isAreaClear = _.every(terrainArray, 'terrain', 'plain');
		//console.log(utils.jS(terrainArray));
		//utils.cL(isAreaClear);
		//utils.cL(utils.isAreaAllPlains(spawnY-2, spawnX-2, spawnY+2, spawnX+2));
	},
	/*
	*  Should be upgrading controller? or prioritize building....
	*/
	
	/*
	*  Create extension -- check to make sure proper time to build them
	*/
	buildExtension: function ( room ) {
		const countActiveSites = utils.countConstructionInRoom(room);
		//utils.cL(countActiveSites);
		const spawnX = room.memory.spawnPos.x, spawnY = room.memory.spawnPos.y;
		if (countActiveSites === 0 && room.memory.level >= 2) {
			// first check coordinates to make sure no sites are there
			const isTaken = room.lookForAt(LOOK_CONSTRUCTION_SITES, spawnX, spawnY);
			if (isTaken.length > 0) {
				utils.cL(`This tile is already being built!`);
			}
			const result = room.createConstructionSite(spawnX-2, spawnY, STRUCTURE_EXTENSION);
			if (result === 0) {
				utils.cL(`Con site is working`);
			} else if (result === -7) {
				const result = room.createConstructionSite(spawnX-2, spawnY+2, STRUCTURE_EXTENSION);
			} else {
				utils.cL(` Error!! - ${result}`);
			}
			
		}
		
	}
	
};

module.exports = roomController;


	
	/*
	To get the path to a source from a spawn
	const spawn = Game.getObjectById(room.memory.spawnId);
	let source0 = Game.getObjectById(room.memory.safeSourceIds['source0'].id);
	let fastestPath = spawn.pos.findPathTo(source0);
	
	*/
	
	
	/* do dynamically require files -
	 var moduleName = "task." + task.taskType;
	 var taskModule = require(moduleName);
	 result = taskModule.prototype.doTask(creep, task);
	
	 */
	
	
	/*utils.cL( `Totals - Active Sources: ${activeSourceArr.length}, Spawns: ${spawnArr.length}, Hostile Creeps: ${hostCreepsArr.length}, My Creeps: ${myCreepsArr.length}` );
	utils.cL( `Spawn Energy: ${spawnArr[ 0 ].energy}, Spawning? ${(!spawnArr[ 0 ].spawning ? 'N' : 'Y')}` );*/
