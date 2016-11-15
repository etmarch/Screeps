/**
 * Created by evanmarchand on 11/12/16.
 */
var _ = require('lodash');
var utils = require('utils');

module.exports = function ( creep ) {
	
	//utils.cL('Inside the harvester code');
	// need to get the coordinates of things around
		// closest spawn
		// closest mineral node
		// get in range, load up, go back to spawn, repeat
	
	var home = Game.getObjectById(Memory.firstSpawn);
	utils.cL(`why dis not working - ${creep}`);
	// Commit suicide if creep can't move or carry
	if ( creep.getActiveBodyparts(MOVE) == 0 || creep.getActiveBodyparts(CARRY) == 0 || creep.getActiveBodyparts(WORK) == 0 ) {
		utils.cL(`Fareweel brothers, I am useless! ${creep.name}`);
		creep.suicide();
	}
	creep.moveTo(Game.getObjectById(Memory.spawns.Spawn1.firstSourceId));
	// Main loop for behaviors
	if (creep.energy < creep.energyCapacity) {
		var target = creep.pos.findClosest(FIND_SOURCES_ACTIVE);//Game.getObjectById(creep.memory.sourceId); // Make target source it was assigned
		// ToDo: check if the source is active, if its not active, go to different source
		if (target) {
			if (!creep.pos.isNearTo(target)) {
				creep.moveTo(target);
			} else {
				creep.harvest(target);
			}
		}
	} else {
		if (home) {
			if (!creep.pos.isNearTo(home)) {
				creep.moveTo(home);
			} else {
				creep.transfer(home, RESOURCE_ENERGY);
			}
		}
	}
		
	
};