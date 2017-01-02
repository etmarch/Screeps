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
			
			let roomMem = creep.room.memory;
			let sourceArr = _.toArray(roomMem.safeSourceIds);
			//utils.cL(`source array: ${sourceArr}`);
			for (let i = 0; i < _.size(sourceArr); i++ ) { //loop through all sources, stop if find not full one
				//(utils.cL(JSON.stringify(sourceArr[i])));
				let maxHarvs = sourceArr[i].maxHarvs;
				let currentHarvs = _.size(sourceArr[i].harvs);
				//utils.cL(`max: ${maxHarvs}, current: ${currentHarvs}`);
				if (currentHarvs < maxHarvs) {
					// Assign the harvester to this source;
				}
			}
			
			utils.jS(_.isEmpty(creep.memory));
			
			//utils.cL(_.size(Game.flags));
			if (_.size(creep.memory.assignedSource) < 1 || (Object.keys(creep.memory).length == 0)) { // no sources assigned!
				creep.say(`No source assigned!`);
				
				
				if (creep.carry['RESOURCE_ENERGY'] > 0) {
					if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(Game.spawns['Spawn1']);
					}
				}
				//creep.say('I got no job!!');
				
				// Get count of harvs assigned to each active source in room
				
				// if less than maximum, assign this harv to the source
				
				// get dropped energy
				utils.pickupDroppedEnergy(creep);
				
				
				if (_.size(Game.flags) > 0) {
					creep.moveTo(Game.flags['Flag1']);
				}
			}
			
			// Check for any dropped energy on floor
			
			// first check what level the room is
			
			// level 1 = standard delivery
			
			// level 2 = drop energy in place, spawn miners to come and gather
			
			//utils.cL(` ${creep.pos.findClosestByRange( FIND_SOURCES_ACTIVE )} `);
			//utils.cL(`assigned source: ${_.keys(creep.memory.assignedSource)}`);
			//let sourceId = Object.values(creep.memory.assignedSource)[0];
			//utils.cL(utils.jS((creep.memory.assignedSource)));
			let sourceTarget = Game.getObjectById(_.values(creep.memory.assignedSource));
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