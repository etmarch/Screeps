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
	},
	
	/*
	*  EXTENSION building automated
	*/
	buildExtension: function ( room ) {
		const countActiveSites = utils.countConstructionInRoom(room);
		//utils.cL(countActiveSites);
		const spawnX = room.memory.spawnPos.x, spawnY = room.memory.spawnPos.y;
		if (countActiveSites === 0 && room.memory.level >= 2) {
			// first check coordinates to make sure no sites are there
			const isTaken = room.lookForAt(LOOK_CONSTRUCTION_SITES, spawnX, spawnY); // check if tile taken
			if (isTaken.length > 0) {
				utils.cL(`This tile is already being built!`);
			}
			const result = room.createConstructionSite(spawnX-2, spawnY, STRUCTURE_EXTENSION); // create construction site
			if (result === 0) {
				utils.cL(`Con site is working`);
			} else if (result === -7) {
				const result = room.createConstructionSite(spawnX-2, spawnY+2, STRUCTURE_EXTENSION); // other location site
			} else {
				utils.cL(` Error!! - ${result}`);
			}
		}
	},

	
	/*
	Analyzing the status of room and assign level
	 */
	roomLevelCheck: function ( room ) {
		// Get current memory level
		// get number of harvs
		// get number of construction sites
		// get number of extensions and containers
		// get the controller level
		const contLevel = room.controller.level;
		// if contLevel is 1, means cant build anything anyways starting
		if (contLevel === 1) {
			//utils.cL(contLevel);
			room.memory.level = 1;
		} else if (contLevel === 2) { // controller upgraded, can build stuff now
			room.memory.level = 2;


			//ToDo: place this into the room prototype
			let constructionCount = room.countConstructionSites();
			if (constructionCount === 0) {

				if (!room.memory.initialExtensionsPlaced) {
					//room.placeInitialExtensionSites();
				}

				if (room.memory.initialContainerSitesPlaced === true) { //check flag to see if done already
					return;
				}

				//ToDo Loop through each source and put construction site on the container positions
				let sourcesArray = room.memory.sources;
				//utils.cL(`sources array: ${JSON.stringify(sourcesArray)}`);
				_.forEach(sourcesArray, function ( value, index, collection ) {
					let conSite = value.container.pos; // x and y coords
					//utils.cL(`consite: ${conSite}`);
					const result = room.createConstructionSite(conSite.x, conSite.y, STRUCTURE_CONTAINER);
					if (result === 0) {
						utils.cL(`Con site is working`);
						room.memory.initialContainerSitesPlaced = true;
					} else if (result === -7) {
						utils.cL(`something already here!`);
						room.memory.initialContainerSitesPlaced = true;
						return;
					}
				});
			} else { // already construction sites

			}
		} else { // controller level is higher

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

	/*
	* how to find path into another room
	 var route = Game.map.findRoute(this.room.room, creep.memory.goToRoom)
	 // another way to get terrain
	 Game.map.getTerrainAt()
	 */


	/*utils.cL( `Totals - Active Sources: ${activeSourceArr.length}, Spawns: ${spawnArr.length}, Hostile Creeps: ${hostCreepsArr.length}, My Creeps: ${myCreepsArr.length}` );
	utils.cL( `Spawn Energy: ${spawnArr[ 0 ].energy}, Spawning? ${(!spawnArr[ 0 ].spawning ? 'N' : 'Y')}` );*/
