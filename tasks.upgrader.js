/**
 * Upgrader Logic
 */

var _ = require( 'lodash' );
var utils = require( 'utils' );

var upgrader = {
	/** @param {Creep} creep **/
	run: function ( creep ) {
		if ( creep.getActiveBodyparts( MOVE ) == 0 || creep.getActiveBodyparts( CARRY ) == 0 || creep.getActiveBodyparts( WORK ) == 0 ) {
			utils.cL( `Fareweel brothers, I am useless! ${creep.name}` );
			creep.say( 'Im too old, bye!' );
			creep.suicide();
		}
		
		//utils.cL(` ${creep.pos.findClosestByRange( FIND_SOURCES_ACTIVE )} `);
		
		if ( creep.carry.energy < creep.carryCapacity ) {
			var sources = creep.room.find( FIND_SOURCES );
			if ( creep.harvest( sources[ 0 ] ) == ERR_NOT_IN_RANGE ) {
				creep.moveTo( sources[ 0 ] );
			}
		}
		else if ( creep.upgradeController( creep.room.controller ) == ERR_NOT_IN_RANGE ) {
			creep.moveTo( creep.room.controller );
		}
	}
	
	
	//}
};

module.exports = upgrader;