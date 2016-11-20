var _ = require( 'lodash' );
var initMemory = require( 'initMemory' );
var utils = require( 'utils' );
var roles = require( 'roles' );
var harv = require( 'tasks.harvester' );
var upgrader = require( 'tasks.upgrader' );

var roomObj = require( 'roomObj' );
var pop = require( 'population' );


module.exports.loop = function () {
	
	utils.cL( `-------  START T:(${Game.time}) USED%: ${((Game.cpu.getUsed() / Game.cpu.limit) * 100).toFixed( 2 ) } --------` );
	
	const room = _.head( _.values( Game.rooms ) );
	const mainSpawn = room.find( FIND_MY_SPAWNS )[ 0 ];
//utils.cL( `Testing Memory (before): ${Memory.init} typeOf: ${typeof Memory.init}` );
	
	initMemory.initMemory();
	
	for ( var i in Game.creeps ) {
		var creep = Game.creeps[ i ];
		if ( creep.memory.role == 'harvester' ) {
			harv.run( creep );
		}
		else if ( creep.memory.role == 'upgrader' ) {
			upgrader.run( creep );
		}
		/*else if (creep.memory.role == "guard") {
		 guard(creep);
		 } else if (creep.memory.role == "ranger") {
		 ranger(creep);
		 } else if (creep.memory.role == "healer") {
		 healer(creep);
		 }*/
	}

//utils.cL( `Testing Memory: ${Memory.init}` );

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
	
	
	roomObj.roomInfo( room );

// population create phase
	if ( utils.countRole( 'harvester' ) < 4 ) {
		if ( mainSpawn.energy >= roles()[ 'harvester' ].cost && !mainSpawn.spawning ) {
			let result = pop.spawn( mainSpawn, 'harvester' );
			//var result = mainSpawn.createCreep( [ WORK, CARRY, MOVE ] );
			if ( _.isString( result ) ) {
				console.log( '(main.js)The name is: ' + result );
			}
			else {
				console.log( '(main.js)Spawn error: ' + result );
			}
		}
	} else if ( utils.countRole( 'harvester' ) >= 4 && utils.countRole( 'upgrader' ) < 2 ) {
		if ( mainSpawn.energy >= roles()[ 'upgrader' ].cost && !mainSpawn.spawning ) {
			let result = pop.spawn( mainSpawn, 'upgrader' );
			//var result = mainSpawn.createCreep( [ WORK, CARRY, MOVE ] );
			if ( _.isString( result ) ) {
				console.log( '(main.js)The name is: ' + result );
			}
			else {
				console.log( '(main.js)Spawn error: ' + result );
			}
		}
	}
	
	
	utils.cL( `----- TICK:END T:(${Game.time}) %: ${((Game.cpu.getUsed() / Game.cpu.limit) * 100).toFixed( 2 ) }--------------` );
};

