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


//Memory.init = false;

module.exports.loop = function () {
	
	// Init Memory - Removing all Memory stuff
	if (!Memory.init) {
		initMemory.initMemory();
	}
	

	//const room = Game.rooms['W14N72']; //[Memory.startRoom];
	//utils.cL(`${room} Memory - ${Memory.startRoom}    `);
	const mainSpawn = Game.spawns['Spawn1'];
	const room = mainSpawn.room;
	//utils.cL(`harvsTotal: ${room.memory.maxHarvsTotal}`);
	//log.roomEnergy(room, 5);
	
	memoryController.cleanUp(mainSpawn);
	//memoryController.cycle(room);
	
	//roomController.getEmptyTilesSpawn(mainSpawn.id);
	//const firstSource = Game.getObjectById(room.memory.safeSourceIds.source0.id);
	//utils.countConstructionInRoom(room);
	//utils.getTilesCloseToSpawn(mainSpawn, 2);
	//utils.cL(utils.countPlainsAroundSource(firstSource));
	
	for ( var i in Game.creeps ) {
		var creep = Game.creeps[ i ];
		//utils.cL(`room: ${creep.room.name}   or   ${JSON.stringify(Memory.rooms[creep.room.name])}`);
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
			builder.run( creep );
		}
		/*else if (creep.memory.role == "healer") {
		 healer(creep);
		 }*/
	}

	// pop loop
	pop.mainPopLoop(room);
	
	if (harvCount >= 7 && room.controller.level >= 2 ) {
		roomController.buildExtension(room);
	}
	

	
	/*if (Game.time % 5 === 0) {
		utils.cL( `----- TICK:END T:(${Game.time}) %: ${ Memory.isSim ? `Sim!` : utils.getCPUPercent() }--------------` );
	}*/
};

