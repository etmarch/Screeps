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




module.exports.loop = function () {
	
	// Init Memory - Removing all Memory stuff
	/*if (!Memory.init) {
		initMemory.initMemory();
	}*/
	

	const room = Game.rooms['W14N72']; //[Memory.startRoom];
	//utils.cL(`${room} Memory - ${Memory.startRoom}    `);
	const mainSpawn = Game.spawns['Spawn1'];
	
	//utils.cL(`harvsTotal: ${room.memory.maxHarvsTotal}`);
	//log.roomEnergy(room, 5);
	
	
	
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

// population create phase
	let harvCount = utils.countRole( 'harvester' );
	let upgraderCount = utils.countRole( 'upgrader' );
	//utils.cLC(`harv count: ${harvCount}`, `blue`);
	// todo: handle the whole loop in one shot
	if ( harvCount < 5 ) {
		
		pop.spawn( mainSpawn, 'harvester' );
		/*if ( _.isString( result ) ) {
			console.log( '(main.js)The name is: ' + result );
		}
		else {
			console.log( '(main.js)Spawn error: ' + result );
		}*/
		
	} else if ( (harvCount >= 5 && upgraderCount < 1) ) {
		pop.spawn( mainSpawn, 'upgrader' );
		/*if ( _.isString( result ) ) {
			console.log( '(main.js)The name is: ' + result );
		}
		else {
			console.log( '(main.js)Spawn error: ' + result );
		}
		*/
	} else {
		if (utils.countRole( 'builder' ) < 2 && room.controller.level >= 2 && harvCount >= 5) {
			pop.spawn( mainSpawn, 'builder' );
		} /*else if (utils.countRole( 'upgrader' ) < 3){
			pop.spawn( mainSpawn, 'upgrader');
		}*/ else if (harvCount < 5){
			pop.spawn( mainSpawn, 'harvester');
		}
		/*if ( _.isString( result ) ) {
			console.log( '(main.js)The name is: ' + result );
		}
		else {
			console.log( '(main.js)Spawn error: ' + result );
		}*/
		
	}
	
	if (harvCount >= 7 && room.controller.level >= 2 ) {
		roomController.buildExtension(room);
	}
	
	//memoryController.cleanUp(mainSpawn);
	
	/*if (Game.time % 5 === 0) {
		utils.cL( `----- TICK:END T:(${Game.time}) %: ${ Memory.isSim ? `Sim!` : utils.getCPUPercent() }--------------` );
	}*/
};

