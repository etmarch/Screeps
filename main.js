var _ = require( 'lodash' );
var initMemory = require('initMemory');
var utils = require('utils');
var roles = require('roles');
var harvester = require('tasks.harvester');
var roomObj = require('roomObj');
var pop = require('population');



module.exports.loop = function() {
	
	utils.cL( `-------  START T:(${Game.time}) USED%: ${((Game.cpu.getUsed() / Game.cpu.limit) * 100).toFixed( 2 ) } --------` );
	
	const room = _.head( _.values( Game.rooms ) );
	const mainSpawn = room.find( FIND_MY_SPAWNS )[ 0 ];
	//utils.cL( `Testing Memory (before): ${Memory.init} typeOf: ${typeof Memory.init}` );
	
	initMemory.initMemory();
	
	
	//utils.cL( `Testing Memory: ${Memory.init}` );


// Assigning roles loop
	for ( var i in Game.creeps ) {
		var creep = Game.creeps[ i ];
		if ( creep.memory.role == "harvester" ) {
			harvester( creep );
		}
		/* else if (creep.memory.role == "builder") {
		 builder(creep);
		 } else if (creep.memory.role == "guard") {
		 guard(creep);
		 } else if (creep.memory.role == "ranger") {
		 ranger(creep);
		 } else if (creep.memory.role == "healer") {
		 healer(creep);
		 }*/
	}

	
	roomObj.roomInfo( room );

// population create phase
	if ( mainSpawn.energy >= roles()[ 'harvester' ].cost ) {
		var result = pop.spawn(mainSpawn, 'harvester');
		//var result = mainSpawn.createCreep( [ WORK, CARRY, MOVE ] );
		if ( _.isString( result ) ) {
			console.log( '(main.js)The name is: ' + result );
		}
		else {
			console.log( '(main.js)Spawn error: ' + result );
		}
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
	
	utils.cL( `----- TICK:END T:(${Game.time}) %: ${((Game.cpu.getUsed() / Game.cpu.limit) * 100).toFixed( 2 ) }--------------` );
};

