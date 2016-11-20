/**
 * Created by evanmarchand on 11/20/16.
 */

var _ = require('lodash');
var utils = require('utils');

let x = 28;
let y = 39;


var guard = {
	
	run: function(creep) {
		/*if ( creep.getActiveBodyparts( MOVE ) == 0 || creep.getActiveBodyparts( CARRY ) == 0 || creep.getActiveBodyparts( WORK ) == 0 ) {
			utils.cL( `Fareweel brothers, I am useless! ${creep.name}` );
			creep.suicide();
		}*/
		
		//utils.cL(` ${creep.pos.findClosestByRange( FIND_SOURCES_ACTIVE )} `);
		
		/*if(creep.carry.energy < creep.carryCapacity) {
			var sources = creep.room.find(FIND_SOURCES);
			if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0]);
			}
		}
		else if(Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity) {
			if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(Game.spawns['Spawn1']);
			}
		}*/
		creep.moveTo(x,y);
		
	}
	
	
	//}
};

module.exports = guard;