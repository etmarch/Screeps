var _ = require('lodash');
var initMemory = require('initMemory');
var utils = require('utils');
var roles = require('roles');
var harv = require('tasks.harvester');
var upgrader = require('tasks.upgrader');
let guard = require('roles.guard');
let builder = require('roles.builder');
var roomController = require('roomController');
var pop = require('population');
var memoryController = require('memoryController');
var log = require('logger');
require('prototype.room')();
//require('prototype.source');
require('prototype.creep')();
const profiler = require('screeps-profiler');

// Checking to see that Spawn Id matches Spawn Id in memory, before main loop
if (Memory.initialSpawnId !== Game.spawns['Spawn1'].id) {
  utils.cL(`Memory not updated, restarting!`);
  Memory.init = false;
}

profiler.enable();
module.exports.loop = function() {
  profiler.wrap(function() {

    // Hopefully fix the spawning start issue
    if (Memory.initialSpawnId !== Game.spawns['Spawn1'].id) {
      utils.cL(`Memory not updated, restarting!`);
      Memory.init = false;
    }

    /*
    Init Memory
    */
    if (!Memory.init) {
      initMemory.initMemory();
    }

    const mainSpawn = Game.spawns['Spawn1']; //assign first spawn
    const room = mainSpawn.room; // assign first main room


    memoryController.cleanUp(mainSpawn); // clean up dead from memory

    roomController.roomLevelCheck(room); // room level controller

    let constructionCount = room.countConstructionSites(); // get all construction sites
    Game.profiler.profile(20);
    /*
    Role Assignment Loop
    */
    for (let i in Game.creeps) {
      let creep = Game.creeps[i];
      //ToDo: Check if creep actually has memory, if not, set memory.
      //ToDo for now, auto assign to harvester
      if (_.isEmpty(creep.memory)) {
        creep.say(' I got no memory, ah shit!');
        creep.memory.role = 'harvester';
      }
      if (creep.memory.role == 'harvester') {
        harv.run(creep);
      } else if (creep.memory.role == 'upgrader') {
        upgrader.run(creep);
      } else if (creep.memory.role == 'guard') {
        guard.run(creep);
      } else if (creep.memory.role == 'builder') {
        if (constructionCount > 0) { // if no construction sites, just make upgrader
          builder.run(creep);
        } else {
          upgrader.run(creep);
        }
      }
    }

    // pop loop
    if (Memory.init === true) {
      pop.mainPopLoop(room);
      //log.roomEnergy( room, 20 ); // logging room energy every 20 seconds
      log.roleCount(room, 20); // logging number of roles every 20 seconds


      if (Game.time % 10 === 0) { // only execute code every 10 ticks

        // ToDo: count enemy creeps in room, if any, activate the safe mode
        if (room.find(FIND_HOSTILE_CREEPS) > 0) {
          if (room.controller.safeModeAvailable && !room.controller.safeMode) { // check to make sure not already in safe
            room.controller.activateSafeMode();
          }
        }

        let towerList = room.find(FIND_MY_STRUCTURES, {
          filter: {
            structureType: STRUCTURE_TOWER
          }
        });

        if (room.controller.level >= 3 && towerList.length < 1) {
          utils.cL('check');
          let tileCheck = utils.isTileClear(room.getPositionAt(mainSpawn.pos.x, mainSpawn.pos.y - 2));
          if (tileCheck === true) {
            // build the tower there
          }
        }
      }
    }

  });
};