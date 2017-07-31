/**
 * Created by evanmarchand on 11/20/16.
 */

let utils = require( 'utils' );

const builder = {
	/** @param {Creep} creep **/
	run: function ( creep ) {
		
		let mainSpawn = Game.getObjectById( Memory.initialSpawnId );
		
		// ToDo: move this check out of the behavior, also make them do stuff helpful rather than just nothing and waiting
		// ToDo: Use role count in memory instead of checking again
		if ( (utils.countRole( 'harvester' ) < creep.room.memory.maxHarvsTotal) && creep.carry.energy === 0 ) {
			//ToDo: function to check if enough energy to build missing harvs, if so, continue back to work
			creep.say( 'Waiting' );
			creep.memory.waiting = true;
			return;
		}
		
		
		// ToDo: Section this off -
		
		if ( creep.memory.building && creep.carry.energy == 0 ) {
			creep.memory.building = false;
			//creep.say( 'harvesting' );
		}
		if ( !creep.memory.building && creep.carry.energy == creep.carryCapacity ) {
			creep.memory.building = true;
			//creep.say( 'building' );
		}
		
		if ( creep.memory.building ) {
			var targets = creep.room.find( FIND_CONSTRUCTION_SITES );
			if ( targets.length ) {
				if ( creep.build( targets[ 0 ] ) == ERR_NOT_IN_RANGE ) {
					creep.moveTo( targets[ 0 ] );
				}
			}
		} else {
			if ( creep.withdraw( mainSpawn, RESOURCE_ENERGY ) == ERR_NOT_IN_RANGE ) {
				//if ( creep.harvest( sources[ 0 ] ) == ERR_NOT_IN_RANGE ) {
				creep.moveTo( mainSpawn );
			}
		}
	}
};

module.exports = builder;