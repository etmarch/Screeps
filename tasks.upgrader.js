/**
 * Upgrader Logic
 */

var _ = require( 'lodash' );
var utils = require( 'utils' );

var upgrader = {
	/** @param {Creep} creep **/
	run: function ( creep ) {
		
		creep.suicideCheck(creep, 'upgrader'); // check to see if creep needs to die
		
		/*if ( creep.getActiveBodyparts( MOVE ) == 0 || creep.getActiveBodyparts( CARRY ) == 0 || creep.getActiveBodyparts( WORK ) == 0 ) {
			utils.cL( `Bad parts, creep: ${creep.name} going to commit suicide` );
			creep.suicide();
		}*/
		
		const mainSpawn = Game.getObjectById( Memory.initialSpawnId );
		
		// ToDo: Replace countRole with the number from memory
		if ( (utils.countRole( 'harvester' ) < creep.room.memory.maxHarvsTotal) && creep.carry.energy === 0 ) {
			//TODO: Check if spawn has more energy than 250
			creep.say('NeedHarvs');
			return;
		}
		if ( creep.memory.upgrading && creep.carry.energy == 0 ) { // if upgrading but no energy left
			creep.memory.upgrading = false;
			creep.say( 'harvesting' );
		}
		if ( !creep.memory.upgrading && creep.carry.energy == creep.carryCapacity ) { // not upgrading, full energy
			creep.memory.upgrading = true;
			creep.say( 'upgrading' );
		}
		
		if ( creep.memory.upgrading ) {
			if ( creep.upgradeController( creep.room.controller ) == ERR_NOT_IN_RANGE ) { // not in range, move to cont
				creep.moveTo( creep.room.controller );
			}
		}
		else {
			// go to spawn to collect energy
			//ToDo: if a container is closer by to the controller with energy, go to that instead.
			if ( creep.withdraw( mainSpawn, RESOURCE_ENERGY ) == ERR_NOT_IN_RANGE ) {
				creep.moveTo( mainSpawn );
			}
		}
		
	}
	
	//}
};

module.exports = upgrader;