var _ = require( 'lodash' );
var initMemory = require( 'initMemory' );
var utils = require( 'utils' );
var roles = require( 'roles' );
var harv = require( 'tasks.harvester' );
var upgrader = require( 'tasks.upgrader' );
let guard = require( 'roles.guard' );
let builder = require( 'roles.builder' );
var roomController = require( 'roomController' );
var pop = require( 'population' );
var memoryController = require('memoryController');
var log = require('logger');
require('prototype.room')();
require('prototype.source');

if (Memory.initialSpawnId !== Game.spawns['Spawn1'].id) {
	utils.cL(`Memory not updated, restarting!`);
	Memory.init = false;
}


module.exports.loop = function () {
	
	// Hopefully fix the spawning start issue
	if (Memory.initialSpawnId !== Game.spawns['Spawn1'].id) {
		utils.cL(`Memory not updated, restarting!`);
		Memory.init = false;
	}
	
	// Init Memory - Removing all Memory stuff
	if (!Memory.init) {
		initMemory.initMemory();
	}
	
	const mainSpawn = Game.spawns['Spawn1'];
	const room = mainSpawn.room;
	
	//utils.cL(`All construction sites: ${JSON.stringify(Game.constructionSites)}`);
	
	memoryController.cleanUp(mainSpawn);
	//utils.cL(`room level: ${room.getRoomlevel()}`);
	//ToDo: check if need to update the room level yet based on params
	roomController.roomLevelCheck(room);
	
	
	//utils.cL(`memory debugging: ${JSON.stringify(room.memory.sourceArray)}`);
	//utils.cL(`memory more debugging: ${Object.keys(room.memory.sourceArray[0])}`);
//	let memId = room.memory.safeSourceIds['source1'].id;
	//let source = Game.getObjectById(memId);
	//utils.cL(`source, mem Id:   ${memId}    ${source}`);
	//utils.getSourceInitialContainerCoords( source, mainSpawn);
	//roomController.getEmptyTilesSpawn(mainSpawn.id);
	//const firstSource = Game.getObjectById(room.memory.safeSourceIds.source0.id);
	//utils.countConstructionInRoom(room);
	//utils.getTilesCloseToSpawn(mainSpawn, 2);
	//utils.cL(utils.countPlainsAroundSource(firstSource));
	
	let constructionCount = room.countConstructionSites();
	for ( let i in Game.creeps ) {
		let creep = Game.creeps[ i ];
		//ToDo: Check if creep actually has memory, if not, set memory.
		//ToDo for now, auto assign to harvester
		if (_.isEmpty(creep.memory)) {
			creep.say(' I got no memory, ah shit!');
			creep.memory.role = 'harvester';
		}
		if ( creep.memory.role == 'harvester' ) {
				harv.run( creep );
		}
		else if ( creep.memory.role == 'upgrader' ) {
			upgrader.run( creep );
		}
		else if ( creep.memory.role == 'guard' ) {
				guard.run( creep );
		}
		else if ( creep.memory.role == 'builder' ) {
			if (constructionCount > 0) { // if no construction sites, just make upgrader
				builder.run( creep );
			} else {
				upgrader.run(creep);
			}
		}
	}

	// pop loop
	if (Memory.init === true) {
		pop.mainPopLoop( room );
		log.roomEnergy( room, 20 );
		log.roleCount( room, 20);
		
		// ToDo: count enemy creeps in room, if any, activate the safe mode
		if (room.find(FIND_HOSTILE_CREEPS) > 0) {
			if (room.controller.safeModeAvailable && !room.controller.safeMode) { // check to make sure not already in safe
				room.controller.activateSafeMode();
			}
		}
	}
	/*if (room.controller.level >= 2 ) {
		roomController.buildExtension(room);
	}*/
	
};

