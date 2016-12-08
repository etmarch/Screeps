/*
 * Created by evanmarchand on 11/11/16.
 */

var _ = require( 'lodash' );
var utils = require( 'utils' );


// first check to see if memory has been initiated
module.exports.initMemory = function () {
	//utils.cL(JSON.stringify(Game));
	
	/*if ( !Memory.init ) {*/ // Initializer
		utils.cL( 'STARTING MEMORY INIT!' );
		//Memory.isSim = false;
		let simTest = _.isNaN( Game.cpu.getUsed() / Game.cpu.limit );
		
		// Store the rooms in memory
		for ( var room in Game.rooms ) {
			var roomI = Game.rooms[ room ];
			utils.cL( `${roomI}  ${room}` );
			roomI.memory.level = 0;
		}
	
		// only start with 1 spawn...
		for ( var name in Game.spawns ) {
			var firstSpawn = Game.spawns[ name ];
			
			let roomMem = Memory.rooms[firstSpawn.room.name];
			
			roomMem.spawnId = firstSpawn.id;
			roomMem.unsafeSourceIds = [];
			roomMem.safeSourceIds = [];
			//utils.cL(utils.jS(firstSpawn));
			//firstSpawn.memory = firstSpawn.name;
			Memory.initialSpawnId = Game.spawns[ name ].id;
			
			let unfilteredSourceIds = firstSpawn.room.find(FIND_SOURCES_ACTIVE);
			
			let keeperLair = firstSpawn.room.find(FIND_HOSTILE_STRUCTURES); // check for source keeper
			// utils.cL(`keeper stuff: ${keeperLair[0]}`);
			let safeSourceIds = [];
			_.forEach(unfilteredSourceIds, function ( source ) {
				//utils.cL(source.pos);
				let inRange = source.pos.inRangeTo(keeperLair[0], 5);
				// utils.cL(`source: ${source} in range? ${inRange}`);
				if (!inRange) {
					// get distance of source to spawn
					let distanceToSpawn = source.pos.getRangeTo(firstSpawn);
					utils.cL(`distance - ${distanceToSpawn}`);
					let sourceObj = {
						distance: distanceToSpawn,
						id:source.id,
					};
					safeSourceIds.push(sourceObj);
					//roomMem.safeSourceIds.push(source.id);
				} else {
					roomMem.unsafeSourceIds.push(source.id);
				}
			});
			utils.cL(`safe sources - ${JSON.stringify(safeSourceIds)}`);
			let sortedIds =  _.sortBy(safeSourceIds, 'distance');
			//utils.cL(`sorted - ${JSON.stringify(sortedIds)}`);
			
			_.forEach(sortedIds, function(value, index, collection) {
				//utils.cL(`val: ${utils.jS(value)} --- index:  ${index}`);
				//roomMem[`source${index}Id`] = value.id;
				//roomMem[`source${index}Harvs`] = [];
				let sourceData = {
					id: value.id,
					harvs: []
				};
				roomMem.safeSourceIds[`source${index}`].push(sourceData);
			});
			
			roomMem.numActiveSources = _.size(unfilteredSourceIds);
			roomMem.numActiveSafeSources = _.size(safeSourceIds);
			
			
			// Get closest source to the spawn
			/*let closestSource = firstSpawn.pos.findClosestByRange( safeSourceIds );
			utils.cL(`closest source: ${closestSource}`);
			roomMem.source1Id = closestSource.id;
			roomMem.source1Harvs = [];
			
			let firstFilterSafeSources = _.pull( safeSourceIds, closestSource);
			utils.cL(`second closest source: ${firstSpawn.pos.findClosestByRange(firstFilterSafeSources)}`);
			let secondClosestSource = firstSpawn.pos.findClosestByRange(firstFilterSafeSources);
			
			if (firstFilterSafeSources.length) {
				let secondFilterSafeSources = _.pull( firstFilterSafeSources, secondClosestSource);
				utils.cL(`third closest source: ${firstSpawn.pos.findClosestByRange(secondFilterSafeSources)}`);
			}*/
			
		}
		
		
		// ToDo: This needs to be cleaned up, reused from another module or config file...
		Memory.harvester = 0,
				Memory.builder = 0,
				Memory.guard = 0,
				Memory.upgrader = 0,
				Memory.ranger = 0,
				Memory.healer = 0,
				Memory.harvesterCurrent = 0,
				Memory.builderCurrent = 0,
				Memory.guardCurrent = 0,
				Memory.upgraderCurrent = 0,
				Memory.rangerCurrent = 0,
				Memory.healerCurrent = 0,
				Memory.deathsTotal = 0,
				Memory.isSim = simTest,
				Memory.init = true;
	//}
	
	//utils.cL( `Init complete! - ${JSON.stringify( Memory )}` );
};
