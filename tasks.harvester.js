/**
 * Created by evanmarchand on 11/12/16.
 */
var _ = require('lodash');
var utils = require('utils');
let population = require('population');

var harv = {
	
		run: function(creep) {
			const mainSpawn = Game.getObjectById(Memory.initialSpawnId);
			// ToDo: helper function for Suicides - move to screep prototype
			if ( creep.getActiveBodyparts( MOVE ) == 0 || creep.getActiveBodyparts( CARRY ) == 0 || creep.getActiveBodyparts( WORK ) == 0 ) {
				utils.cL( `Fareweel brothers, I am useless! ${creep.name}` );
				creep.suicide();
			}
			
			if (_.size(creep.memory.assignedSource) < 1 || (Object.keys(creep.memory).length == 0)) { // no sources assigned!
				creep.say(`No source assigned!`);
				
				if (creep.carry['RESOURCE_ENERGY'] > 0) {
					if(creep.transfer(mainSpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(mainSpawn);
					}
				}
				// Get count of harvs assigned to each active source in room
				// if less than maximum, assign this harv to the source
				// get dropped energy
				utils.pickupDroppedEnergy(creep);
				
				
				if (_.size(Game.flags) > 0) { // Flag check
					creep.moveTo(Game.flags['Flag1']);
				}
			}
			
			// ToDo: This needs to reference an Id in memory...
			//utils.findNearestNotFullStorage(creep);
			
			let sourceTarget = Game.getObjectById(creep.memory.assignedSource);
			//utils.cL(`assigned Source: ${JSON.stringify(creep.memory.assignedSource)}, sourceTarget: ${sourceTarget}`);
			if (!sourceTarget) {
				creep.say(`Need to assignsource`);
				this.assignToSource(creep);
				//utils.cL(`${creep} - inner assigned source: ${creep.memory.assignedSource}`);
				sourceTarget = Game.getObjectById(creep.memory.assignedSource);
				//utils.cL(`new source: ${sourceTarget.memory}`);
			}
			//utils.cL(utils.jS(sourceTarget));
			if(creep.carry.energy < creep.carryCapacity) {
				//var sources = creep.room.find(FIND_SOURCES);
				if(creep.harvest(sourceTarget) == ERR_NOT_IN_RANGE) {
					creep.moveTo(sourceTarget);
				}
			}
			else if(mainSpawn.energy < mainSpawn.energyCapacity) {
				if(creep.transfer(mainSpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(mainSpawn);
				}
			} else {
				creep.say(`Spawn full, dropping here!`);
				creep.drop(RESOURCE_ENERGY);
			}
		},
	
	assignToSource(creep) {
			//ToDo: THis needs to happen higher level
		let roomMem = creep.room.memory;
		let sourceArr = _.toArray(roomMem.sources);
		utils.cL(`in AssigntoSource - sourceArr: ${JSON.stringify(sourceArr)}`);
		//utils.cL(`source array: ${sourceArr}`);
		// ToDo: THis also needs to be done declatievly not iteratively.... use forEach if possible
		for (let i = 0; i < _.size(sourceArr); i++ ) { //loop through all sources, stop if find not full one
			//(utils.cL(JSON.stringify(sourceArr[i])));
			let maxHarvs = sourceArr[i].maxHarvs;
			let currentHarvs = _.size(sourceArr[i].harvs);
			//utils.cL(`max: ${maxHarvs}, current: ${currentHarvs}`);
			if (currentHarvs < maxHarvs) {
				// Assign the harvester to this source;
				// ToDO: eventually make this modular population.assignHarvToSource(creep.name, )
				// ToDo: roomMem.safeSourceIds[ nameInd ].harvs.push( creep.name );
				
				roomMem.sources[ sourceArr[i].id ].harvs.push( creep.name ); // assign harv to source memory in room
				creep.memory.assignedSource = sourceArr[i].id;
				break;
			} else {
				utils.cL(`${creep} couldnt assign to source and is dying!`);
				creep.suicide();
			}
		}
	}
		
		
	//}
};

module.exports = harv;