/*
 * Created by evanmarchand on 11/11/16.
 */

var _ = require( 'lodash' );
var utils = require( 'utils' );

// first check to see if memory has been initiated
module.exports.initMemory = function () {
	// utils.cL( JSON.stringify( Game ) );
	
	utils.cL( 'STARTING MEMORY INIT!' );
	
	// Erase memory
	for ( let key in Memory ) {
		delete Memory[ key ];
	}
	
	// Store the rooms in memory
	utils.cL( `Rooms num: ${_.size( Game.rooms )}` )
	for ( var room in Game.rooms ) {
		var roomI = Game.rooms[ room ];
		//utils.cL( `${roomI}  ${room}` );
		roomI.memory.level = 0;
		Memory.startRoom = roomI.name;
	}
	
	
	for ( var name in Game.spawns ) {
		const firstSpawn = Game.spawns[ name ];
		firstSpawn.memory.roomId = Game.rooms[ firstSpawn.room.name ].id; // adding room Id to spawn memory
		firstSpawn.memory.extensionSpots = [];
		firstSpawn.memory.id = firstSpawn.id;
		
		Memory.initialSpawnId = firstSpawn.id;
		
		let roomMem = Memory.rooms[ firstSpawn.room.name ];
		
		roomMem.spawnId = firstSpawn.id;
		//roomMem.safeSourceIds = {};
		//utils.cL( utils.jS( firstSpawn ) );
		roomMem.sources = {};
		roomMem.maxHarvsTotal = 0;
		
		let unfilteredSourceIds = firstSpawn.room.find( FIND_SOURCES_ACTIVE );
		
		let safeSourceIdList = [];
		_.forEach( unfilteredSourceIds, function ( source ) {
					let distanceToSpawn = source.pos.getRangeTo( firstSpawn ); // get distance of source to spawn
					let harvSpaces = utils.countPlainsAroundSource( source ); // get amount of spaces around source
					let containerPos = utils.getSourceInitialContainerPos( source, firstSpawn ); // get coords for container
					let sourceId = `${source.id}`;
					utils.cL( `sourceId: ${harvSpaces}` );
					if ( harvSpaces > 1 ) {
						let sourceObj = {
							distance: distanceToSpawn,
							id: source.id,
							maxHarvs: harvSpaces,
							containerPos: containerPos,
							containerId: null
						};
						safeSourceIdList.push( sourceObj );
						//safeSourceIdList.push({[sourceId]: sourceObj});
					}
				}
		);
		
		let sortedIds = _.sortBy( safeSourceIdList, 'distance' ); // sort by distance
		
		let maxRoomHarvs = 0;
		
		_.forEach( sortedIds, function ( value, index, collection ) {
			//utils.cL( `val: ${utils.jS( value )} --- index:  ${index}` );
			let sourceData = {
				id: value.id,
				harvs: [],
				distance: value.distance,
				maxHarvs: value.maxHarvs,
				container: {
					isBuilt: false,
					id: null,
					pos: value.containerPos
				}
			};
			maxRoomHarvs += value.maxHarvs;
			roomMem.sources[ `${value.id}` ] = sourceData;
		} );
		
		roomMem.maxHarvsTotal = maxRoomHarvs;
		roomMem.initialContainerSitesPlaced = false; // flag for initial containers
		roomMem.initialExtensionsPlaced = false; // flag for initial extensions
	}
	// Make sure to set the init to true for only once
	Memory.init = true;
};


// For setting up heirarchy of memory....
/*
 * room.memory
 *   - sources: object with each source as property
 *      - container
 *
 *
 * */