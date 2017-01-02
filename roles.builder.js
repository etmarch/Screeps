/**
 * Created by evanmarchand on 11/20/16.
 */

let utils = require( 'utils' );

const builder = {
	/** @param {Creep} creep **/
	run: function ( creep ) {
		if ( utils.countRole( 'harvester' ) < creep.room.memory.maxHarvsTotal ) {
			//creep.say( 'Waiting' );
			//utils.cL( `need more harvs before resume building` );
			//ToDo: Set the memory status to waiting
		} else {
			if ( creep.memory.building && creep.carry.energy == 0 ) {
				creep.memory.building = false;
				creep.say( 'harvesting' );
			}
			if ( !creep.memory.building && creep.carry.energy == creep.carryCapacity ) {
				creep.memory.building = true;
				creep.say( 'building' );
			}
			
			if ( creep.memory.building ) {
				var targets = creep.room.find( FIND_CONSTRUCTION_SITES );
				if ( targets.length ) {
					if ( creep.build( targets[ 0 ] ) == ERR_NOT_IN_RANGE ) {
						creep.moveTo( targets[ 0 ] );
					}
				}
			}
			else {
				//var sources = creep.room.find( FIND_SOURCES );
				let spawn = Game.getObjectById( Memory.initialSpawnId );
				if ( creep.withdraw( spawn, RESOURCE_ENERGY ) == ERR_NOT_IN_RANGE ) {
					//if ( creep.harvest( sources[ 0 ] ) == ERR_NOT_IN_RANGE ) {
					creep.moveTo( spawn );
				}
			}
		}
	}
};

module.exports = builder;