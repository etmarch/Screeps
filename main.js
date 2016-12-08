var _ = require( 'lodash' );
var initMemory = require( 'initMemory' );
var utils = require( 'utils' );
var roles = require( 'roles' );
var harv = require( 'tasks.harvester' );
var upgrader = require( 'tasks.upgrader' );
let guard = require( 'roles.guard' );
let builder = require( 'roles.builder' );
var roomObj = require( 'roomObj' );
var pop = require( 'population' );

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

// Memory Management
	if ( !mainSpawn.spawning ) {
		for ( var name in Memory.creeps ) {
			if ( !Game.creeps[ name ] ) {
				console.log( "DEL: " + name );
				Memory[ Memory.creeps[ name ].role + 'Current' ]--;
				Memory.deathsTotal++;
				delete Memory.creeps[ name ];
			}
		}
	}
	
	for ( var i in Game.creeps ) {
		var creep = Game.creeps[ i ];
		utils.cL(`room: ${creep.room.name}   or   ${Memory.rooms[creep.room]}`);
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
	
	
	roomObj.roomInfo( room );

// population create phase
	// todo: handle the whole loop in one shot
	if ( utils.countRole( 'harvester' ) < 3 ) {
	
		
		pop.spawn( mainSpawn, 'harvester' );
		/*if ( _.isString( result ) ) {
			console.log( '(main.js)The name is: ' + result );
		}
		else {
			console.log( '(main.js)Spawn error: ' + result );
		}*/
		
	} else if ( (utils.countRole( 'harvester' ) >= 3 && utils.countRole( 'upgrader' ) < 2) ) {
		pop.spawn( mainSpawn, 'upgrader' );
		/*if ( _.isString( result ) ) {
			console.log( '(main.js)The name is: ' + result );
		}
		else {
			console.log( '(main.js)Spawn error: ' + result );
		}
		*/
	} else {
		if (utils.countRole( 'builder' ) < 2) {
			pop.spawn( mainSpawn, 'builder' );
		} else {
			pop.spawn( mainSpawn, 'upgrader');
		}
		/*if ( _.isString( result ) ) {
			console.log( '(main.js)The name is: ' + result );
		}
		else {
			console.log( '(main.js)Spawn error: ' + result );
		}*/
		
	}
	
	//Testing Dog!
	
	if (Game.time % 5 === 0) {
		utils.cL( `----- TICK:END T:(${Game.time}) %: ${ Memory.isSim ? `Sim!` : utils.getCPUPercent() }--------------` );
	}
};

