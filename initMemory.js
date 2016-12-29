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
	global.clearAllMemory();
	utils.jS(Memory);
	// Store the rooms in memory
	for ( var room in Game.rooms ) {
		var roomI = Game.rooms[ room ];
		//utils.cL( `${roomI}  ${room}` );
		roomI.memory.level = 0;
		Memory.startRoom = roomI.name;
	}
	
	// only start with 1 spawn...
	for ( var name in Game.spawns ) {
		var firstSpawn = Game.spawns[ name ];
		
		let roomMem = Memory.rooms[ firstSpawn.room.name ];
		
		roomMem.spawnId = firstSpawn.id;
		roomMem.unsafeSourceIds = [];
		roomMem.safeSourceIds = {};
		//utils.cL(utils.jS(firstSpawn));
		
		firstSpawn.memory.roomId = Game.rooms[ firstSpawn.room.name ].id;
		
		
		Memory.spawns[ name ].extensionSpots = [];
		Memory.spawns[ name ].id = firstSpawn.id;
		
		Memory.initialSpawnId = Game.spawns[ name ].id;
		
		let unfilteredSourceIds = firstSpawn.room.find( FIND_SOURCES_ACTIVE );
		
		let safeSourceIdList = [];
		_.forEach( unfilteredSourceIds, function ( source ) {
			//utils.cL(source.pos);
			
			// get distance of source to spawn
			let distanceToSpawn = source.pos.getRangeTo( firstSpawn );
			utils.cL( `distance - ${distanceToSpawn}` );
			
			//todo: we need to get number of open spaces around source, to know how many to assign to harvest it
			let sourceObj = {
				distance: distanceToSpawn,
				id: source.id,
				maxHarvs: utils.countPlainsAroundSource( source )
			};
			safeSourceIdList.push( sourceObj );
			//roomMem.safeSourceIds.push(source.id);
		} );
		utils.cL( `safe sources - ${JSON.stringify( safeSourceIdList )}` );
		let sortedIds = _.sortBy( safeSourceIdList, 'distance' );
		//utils.cL(`sorted - ${JSON.stringify(sortedIds)}`);
		
		let maxRoomHarvs = 0;
		
		_.forEach( sortedIds, function ( value, index, collection ) {
			//utils.cL(`val: ${utils.jS(value)} --- index:  ${index}`);
			let sourceData = {
				id: value.id,
				harvs: [],
				maxHarvs: value.maxHarvs
			};
			maxRoomHarvs += value.maxHarvs;
			roomMem.safeSourceIds[ `source${index}` ] = sourceData;
		} );
		roomMem.numActiveSources = _.size( unfilteredSourceIds );
		roomMem.numActiveSafeSources = _.size( safeSourceIdList );
		roomMem.spawnPos = {
			x: firstSpawn.pos.x,
			y: firstSpawn.pos.y
		};
		//utils.cL(maxRoomHarvs);
		roomMem.maxHarvsTotal = maxRoomHarvs;
		
		//ToDo:
		
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
