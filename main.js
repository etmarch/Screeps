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

const room = _.head( _.values( Game.rooms ) );
const mainSpawn = room.find( FIND_MY_SPAWNS )[ 0 ];

module.exports.loop = function () {
	
	/*if (isNaN(Game.cpu.getUsed() / Game.cpu.limit)) {
		utils.cL('This is a simulation!');
	} else {
		utils.cL( `-------  START T:(${Game.time}) %:${((Game.cpu.getUsed() / Game.cpu.limit) * 100).toFixed( 2 ) } lvl:${room.controller.level} --------` );
	}*/
	if (Memory.init != true) {
		initMemory.initMemory();
	}
	
	
	
	memoryController.cleanUp(mainSpawn);
	
	memoryController.cycle(room);
	
	roomController.getEmptyTilesSpawn(mainSpawn.id);
	//const firstSource = Game.getObjectById(room.memory.safeSourceIds.source0.id);
	utils.countConstructionInRoom(room);
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
	// todo: handle the whole loop in one shot
	if ( harvCount < room.memory.maxHarvsTotal ) {
	
		
		pop.spawn( mainSpawn, 'harvester' );
		/*if ( _.isString( result ) ) {
			console.log( '(main.js)The name is: ' + result );
		}
		else {
			console.log( '(main.js)Spawn error: ' + result );
		}*/
		
	} else if ( (harvCount >= room.memory.maxHarvsTotal && utils.countRole( 'upgrader' ) < 1) ) {
		pop.spawn( mainSpawn, 'upgrader' );
		/*if ( _.isString( result ) ) {
			console.log( '(main.js)The name is: ' + result );
		}
		else {
			console.log( '(main.js)Spawn error: ' + result );
		}
		*/
	} else {
		if (utils.countRole( 'builder' ) < 2 && room.memory.level === 2 && harvCount >= room.memory.maxHarvsTotal) {
			pop.spawn( mainSpawn, 'builder' );
		} /*else if (utils.countRole( 'upgrader' ) < 3){
			pop.spawn( mainSpawn, 'upgrader');
		}*/ else {
			pop.spawn( mainSpawn, 'harvester');
		}
		/*if ( _.isString( result ) ) {
			console.log( '(main.js)The name is: ' + result );
		}
		else {
			console.log( '(main.js)Spawn error: ' + result );
		}*/
		
	}
	
	/*if (Game.time % 5 === 0) {
		utils.cL( `----- TICK:END T:(${Game.time}) %: ${ Memory.isSim ? `Sim!` : utils.getCPUPercent() }--------------` );
	}*/
};

