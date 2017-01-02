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
		if ( utils.countRole( 'harvester' ) < creep.room.memory.maxHarvsTotal ) {
			//do nothing
		} else {
			if ( creep.memory.upgrading && creep.carry.energy == 0 ) {
				creep.memory.upgrading = false;
				creep.say( 'harvesting' );
			}
			if ( !creep.memory.upgrading && creep.carry.energy == creep.carryCapacity ) {
				creep.memory.upgrading = true;
				creep.say( 'upgrading' );
			}
			
			if ( creep.memory.upgrading ) {
				if ( creep.upgradeController( creep.room.controller ) == ERR_NOT_IN_RANGE ) {
					creep.moveTo( creep.room.controller );
				}
			}
			else {
				//var sources = creep.room.find( FIND_SOURCES );
				let spawn = Game.getObjectById( Memory.initialSpawnId );
				if ( creep.withdraw( spawn, RESOURCE_ENERGY ) == ERR_NOT_IN_RANGE ) {
					creep.moveTo( spawn );
				}
			}
		}
	}
	
	//}
};

module.exports = upgrader;