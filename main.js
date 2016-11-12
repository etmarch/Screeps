var _ = require( 'lodash' );
var initMemory = require('initMemory');
var utils = require('utils');
var roles = require('roles');

utils.cL(`--START T:(${Game.time}) CPU: ${Game.cpu.getUsed()}, %: ${((Game.cpu.getUsed() / Game.cpu.limit) * 100).toFixed(2) }, Bucket: ${Game.cpu.bucket}, 60fps:${Game.time % 60}`);
const room = _.head(_.values( Game.rooms ));
//utils.cL(room);
const mainSpawn = room.find( FIND_MY_SPAWNS )[ 0 ];
//const diagSearchArr = [ 'FIND_SOURCES_ACTIVE', 'FIND_MY_SPAWNS', 'FIND_HOSTILE_CREEPS', 'FIND_MY_CREEPS' ];


initMemory.initMemory();


utils.cL(`initM: ${JSON.stringify(initMemory)}   ${_.keys(initMemory)}`);
// todo turn this into own module
//to do wrapper function for find, anything that returns result!
let roomObjInfo = ( roomObj ) => {
	const activeSourceArr = roomObj.find( FIND_SOURCES_ACTIVE );
	const spawnArr = roomObj.find( FIND_MY_SPAWNS );
	const hostCreepsArr = roomObj.find( FIND_HOSTILE_CREEPS );
	const myCreepsArr = roomObj.find( FIND_MY_CREEPS );
	
	utils.cL( `Totals - Active Sources: ${activeSourceArr.length}, Spawns: ${spawnArr.length}, Hostile Creeps: ${hostCreepsArr.length}, My Creeps: ${myCreepsArr.length}` );
	utils.cL( `Spawn Energy: ${spawnArr[ 0 ].energy}, Spawning? ${(!spawnArr[ 0 ].spawning ? 'N' : 'Y')}` );
};


// Assigning roles loop
for (var i in Game.creeps) {
	var creep = Game.creeps[i];
/*	if (creep.memory.role == "harvester") {
		harvester(creep);
	} else if (creep.memory.role == "builder") {
		builder(creep);
	} else if (creep.memory.role == "guard") {
		guard(creep);
	} else if (creep.memory.role == "ranger") {
		ranger(creep);
	} else if (creep.memory.role == "healer") {
		healer(creep);
	}*/
}


roomObjInfo( room );

utils.cL(` roles: ${JSON.stringify(roles()['harvester'])}, cost: ${roles()['harvester'].cost}`);

// population create phase
if ( mainSpawn.energy >= roles()['harvester'].cost ) {
	var result = utils.debugWrap(mainSpawn.createCreep( roles()['harvester'].parts ));
	//var result = mainSpawn.createCreep( [ WORK, CARRY, MOVE ] );
	utils.cL(result);
	if ( _.isString( result ) ) {
		console.log( '(main.js)The name is: ' + result );
	}
	else {
		console.log( '(main.js)Spawn error: ' + result );
	}
}



utils.cL(`----- TICK:END T:(${Game.time}) CPU Used: ${Game.cpu.getUsed()}, %: ${((Game.cpu.getUsed() / Game.cpu.limit) * 100).toFixed(2) }, Bucket: ${Game.cpu.bucket}`);

