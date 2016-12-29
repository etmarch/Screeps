/**
 * Created by evanmarchand on 11/12/16.
 */
var _ = require('lodash');
var utils = require('utils');

var harv = {
	
		run: function(creep) {
			// ToDo: helper function for Suicides
			if ( creep.getActiveBodyparts( MOVE ) == 0 || creep.getActiveBodyparts( CARRY ) == 0 || creep.getActiveBodyparts( WORK ) == 0 ) {
				utils.cL( `Fareweel brothers, I am useless! ${creep.name}` );
				creep.suicide();
			}
			//utils.cL(_.size(Game.flags));
			if (_.size(creep.memory.assignedSource) < 1) { // no sources assigned!
				
				if (creep.carry['RESOURCE_ENERGY'] > 0) {
					if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(Game.spawns['Spawn1']);
					}
				}
				//creep.say('I got no job!!');
				const droppedEnergy = creep.room.find(FIND_DROPPED_ENERGY);
				//utils.cL(droppedEnergy);
				if (_.size(droppedEnergy) >= 1) {
					const target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
					if(target) {
						if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
							creep.moveTo(target);
						}
					}
					
				} else if (_.size(Game.flags) > 0) {
					creep.moveTo(Game.flags['Flag1']);
				}
			}
			
			// Check for any dropped energy on floor
			
			// first check what level the room is
			
			// level 1 = standard delivery
			
			// level 2 = drop energy in place, spawn miners to come and gather
			
			//utils.cL(` ${creep.pos.findClosestByRange( FIND_SOURCES_ACTIVE )} `);
			utils.cL(creep.memory.assignedSource);
			//let sourceId = Object.values(creep.memory.assignedSource)[0];
			//utils.cL(utils.jS(Object.values(creep.memory.assignedSource)[0]));
			let sourceTarget = Game.getObjectById('5864a5e1c04c074e4f18d869');
			//utils.cL(utils.jS(sourceTarget));
			if(creep.carry.energy < creep.carryCapacity) {
				//var sources = creep.room.find(FIND_SOURCES);
				if(creep.harvest(sourceTarget) == ERR_NOT_IN_RANGE) {
					creep.moveTo(sourceTarget);
				}
			}
			else if(Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity) {
				if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(Game.spawns['Spawn1']);
				}
			} else {
				creep.say(`Spawn full, dropping here!`);
				creep.drop(RESOURCE_ENERGY);
			}
		}
		
		
	//}
};

module.exports = harv;