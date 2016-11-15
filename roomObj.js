/*
 * Room Object Stuff.
 */

var _ = require( 'lodash' );
var utils = require( 'utils' );

module.exports.roomInfo = function ( roomObj ) {
	const activeSourceArr = roomObj.find( FIND_SOURCES_ACTIVE );
	const spawnArr = roomObj.find( FIND_MY_SPAWNS );
	const hostCreepsArr = roomObj.find( FIND_HOSTILE_CREEPS );
	const myCreepsArr = roomObj.find( FIND_MY_CREEPS );
	
	utils.cL( `Totals - Active Sources: ${activeSourceArr.length}, Spawns: ${spawnArr.length}, Hostile Creeps: ${hostCreepsArr.length}, My Creeps: ${myCreepsArr.length}` );
	utils.cL( `Spawn Energy: ${spawnArr[ 0 ].energy}, Spawning? ${(!spawnArr[ 0 ].spawning ? 'N' : 'Y')}` );
};