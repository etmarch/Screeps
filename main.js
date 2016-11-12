var _ = require( 'lodash' );
var initMemory = require('initMemory');
var utils = require('utils');

utils.cL(`----- TICK:START T:(${Game.time}) CPU Used: ${Game.cpu.getUsed()}, %: ${((Game.cpu.getUsed() / Game.cpu.limit) * 100).toFixed(2) }, Bucket: ${Game.cpu.bucket}`);
const room = _.head(_.values( Game.rooms ));
//utils.cL(room);
const mainSpawn = room.find( FIND_MY_SPAWNS )[ 0 ];
//const diagSearchArr = [ 'FIND_SOURCES_ACTIVE', 'FIND_MY_SPAWNS', 'FIND_HOSTILE_CREEPS', 'FIND_MY_CREEPS' ];

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

console.log( `----- TICK:START (${Game.time})` );

roomObjInfo( room );
if ( mainSpawn.energy >= 200 ) {
	var result = utils.debugWrap(mainSpawn.createCreep( [ WORK, CARRY, MOVE ] ));
	//var result = mainSpawn.createCreep( [ WORK, CARRY, MOVE ] );
	utils.cL(typeof result);
	if ( _.isString( result ) ) {
		console.log( 'The name is: ' + result );
	}
	else {
		console.log( 'Spawn error: ' + result );
	}
}



utils.cL(`----- TICK:END T:(${Game.time}) CPU Used: ${Game.cpu.getUsed()}, %: ${((Game.cpu.getUsed() / Game.cpu.limit) * 100).toFixed(2) }, Bucket: ${Game.cpu.bucket}`);

