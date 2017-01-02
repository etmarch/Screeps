/**
 * Created by evanmarchand on 11/11/16.
 */
/* UTILS
 *
 * Helper functions used everywhere
 */

var _ = require( 'lodash' );
var roles = require( 'roles' );


global.clearAllMemory = function() {
	/*let memoryKeys = Object.keys(Memory);
	for (let i = memoryKeys.length; --i>=0;) {
		delete Memory[memoryKeys[i]];
	}*/
	for (let key in Memory) {
		delete Memory[key];
	}
};

let cL = ( out ) => console.log( out );

const partsCosts = {
	"move": 50,
	"work": 100,
	"attack": 80,
	"carry": 50,
	"heal": 250,
	"ranged_attack": 150,
	"tough": 10,
	"claim": 600
};

const greenLog = `rgba(39, 174, 96,1.0)`, blueLog = `rgba(52, 152, 219,1.0)`;

const colorLog = (content, color) => {
	console.log(`<span style="color:${color};">${content}</span>`);
};

// Cache the spawn to be used
const spawn = Game.getObjectById( Memory.initialSpawnId );

const Utils = {
	countRole: ( creepRole ) => {
		var total = _.filter( Game.creeps, {
			memory: { role: creepRole }
		} );
		return _.size( total );
	},
	countBodyCost: ( roleName ) => {
		const parts = roles()[ roleName ][ 'parts' ];
		//const partNames = _.keysIn( partsCosts );
		//const costs = _.values(partsCosts);
		let sumCost = 0;
		//cL( `parts - ${parts}, names - ${partNames} - ${costs}` );
		_.forEach( parts, function ( part ) {
			//cL( `part - ${part}, ${partsCosts[part]}` );
			sumCost += partsCosts[ part ];
		} );
		return sumCost;
	},
	
	cL: ( out ) => {
		return cL( out );
	},
	jS: ( out ) => JSON.stringify( out ),
	
	isAreaAllPlains: ( ...cords ) => { //topY, leftX, bottomY, rightX
		const spawn = Game.getObjectById( Memory.initialSpawnId );
		const terrainArray = spawn.room.lookForAtArea( LOOK_TERRAIN, ...cords, { asArray: true } );
		if ( _.isArray( terrainArray ) ) {
			return _.every( terrainArray, 'terrain', 'plain' );
		}
	},
	
	countPlainsAroundSource: ( source ) => { // Searches immediate tiles around the source
		//cL(`source: ${source} -- ${Utils.jS(source.pos)}`);
		const sourceY = source.pos.y, sourceX = source.pos.x;
		const terrainArray = source.room.lookForAtArea( LOOK_TERRAIN, sourceY - 1, sourceX - 1, sourceY + 1, sourceX + 1, { asArray: true } );
		const plainArray = _.filter( terrainArray, 'terrain', 'plain' );
		if ( plainArray.length > 0 ) {
			return plainArray.length;
		} else {
			return 0;
		}
		//cL(`${plainArray.length} - ${plainArray}`);
	},
	
	countConstructionInRoom: function ( room ) {
		const allSites = room.find( FIND_MY_CONSTRUCTION_SITES );
		//Utils.cL(`allSites: ${allSites} --- ${Utils.jS(allSites)}`);
		return _.size( allSites );
	},
	
	getTilesCloseToSpawn: function ( spawn, sizeOffset ) {
		const sourceY = spawn.pos.y, sourceX = spawn.pos.x;
		const terrainArray = spawn.room.lookForAtArea( LOOK_TERRAIN, sourceY - sizeOffset, sourceX - sizeOffset, sourceY + sizeOffset, sourceX + sizeOffset, { asArray: true } );
		const plainArray = _.filter( terrainArray, 'terrain', 'plain' );
		//Utils.cL(Utils.jS(plainArray));
		
		// sort by distance to spawn (so it starts from inside and goes out
		let testSort = _.map(plainArray, function(value, index, collection){
			const distance = spawn.pos.getRangeTo(plainArray[index].x, plainArray[index].y);
			plainArray[index].distance = distance;
			return plainArray[index];
		});
		
		let sorted = _.sortByOrder(plainArray, ['distance'], ['asc']); // Sorting correctly!
		let sortedList = _.rest(sorted); // removed location of spawn itself
		//Utils.cL(`test sort - ${(testSort) }`);
		//Utils.cL(Utils.jS(sortedList));
	},
	
	findNearestNotFullStorage (creep) {
		const room = creep.room;
		// get list of containers that have storage available
		let containerList = room.find(FIND_STRUCTURES, {
			filter: (s) => s.structureType == 'container'// && (s.store[RESOURCE_ENERGY] < s.storeCapacity ) )
		});
		cL((containerList));
		//cL(JSON.stringify(Game.getObjectById('586a36bedb1e726976708c2a')));
	},
	
	// Input creep,
	pickupDroppedEnergy (creep) {
		const droppedEnergy = creep.room.find(FIND_DROPPED_ENERGY);
		//utils.cL(droppedEnergy);
		if (_.size(droppedEnergy) >= 1) {
			const target = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
			if(target) {
				if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				}
			}
		}
	},
	
	cLC (content, color = greenLog) {
		if (color === 'blue') {
			colorLog(content, blueLog);
		} else {
			colorLog( content, color );
		}
		return 0;
	},
	
	findEnemies: ( obj ) => {
		let target = obj.room.find( FIND_HOSTILE_CREEPS, {
			filter: function ( object ) {
				return (object.getActiveBodyparts( ATTACK ) == 0 || object.getActiveBodyparts( RANGED_ATTACK ) == 0);
			}
		} );
		if ( target.length ) {
			utils.cL( `target from findEnemies: ${target}` );
			return target;
		} else {
			return -1;
		}
	},
	
	enemiesInRange: ( obj, distance ) => {
		// Get the room pos of the object being checked
		cL( obj );
		//cL(Game.getObjectById(obj));
		let target = obj.pos.findInRange( FIND_HOSTILE_CREEPS, distance );
		cL( `target in enemiesInRange: ${target}` );
		if ( target.length ) {
			return target;
		}
	},
	
	// Return boolean, if it is in range
	sourceKeepersInRange(spawn, source) {
		let keeperLair = spawn.room.find( FIND_HOSTILE_STRUCTURES );
	  cL(`keeper stuff: ${keeperLair[0]}`);
		let inRange = source.pos.inRangeTo(keeperLair[0], 5);
		return inRange;
	},
	
	
	
	// ToDo: Suicide checker and function
	
	
	// Attach action functions to this wrapper (ex attack, move, etc...)
	debugWrap: ( fnToExec ) => {
		cL( fnToExec );
		let result = fnToExec;
		cL( `${typeof result} result: ${result}` );
		// Debugging Helper function
		if ( result != OK ) {
			return console.log( `Error code: ${result} returned!` );
		}
		return result;
	},
	
	getCPUPercent: () => {
		return (((Game.cpu.getUsed() / Game.cpu.limit) * 100).toFixed( 2 ));
	},
	
	
	
};

module.exports = Utils;


// Return array of friendly creeps that can attack in range, excluding the source Keeper
module.exports.fightersInRange = function ( creep, range, bodyParts ) {
	/*if (!isNumber(range)) {
	 return "ERR: Range must be number!";
	 } else {
	 
	 
	 
	 return creep.pos.findInRange(FIND_MY_CREEPS, range, {
	 filter: function(c) {
	 return (c.memory.fighter === true);
	 }
	 });
	 }*/
};


const errorConstList = {
	OK: 0,
	ERR_NOT_OWNER: -1,
	ERR_NO_PATH: -2,
	ERR_NAME_EXISTS: -3,
	ERR_BUSY: -4,
	ERR_NOT_FOUND: -5,
	ERR_NOT_ENOUGH_ENERGY: -6,
	ERR_NOT_ENOUGH_RESOURCES: -6,
	ERR_INVALID_TARGET: -7,
	ERR_FULL: -8,
	ERR_NOT_IN_RANGE: -9,
	ERR_INVALID_ARGS: -10,
	ERR_TIRED: -11,
	ERR_NO_BODYPART: -12,
	ERR_NOT_ENOUGH_EXTENSIONS: -6,
	ERR_RCL_NOT_ENOUGH: -14,
	ERR_GCL_NOT_ENOUGH: -15
};


const lookList = {
	LOOK_CREEPS: "creep",
	LOOK_ENERGY: "energy",
	LOOK_RESOURCES: "resource",
	LOOK_SOURCES: "source",
	LOOK_MINERALS: "mineral",
	LOOK_STRUCTURES: "structure",
	LOOK_FLAGS: "flag",
	LOOK_CONSTRUCTION_SITES: "constructionSite",
	LOOK_NUKES: "nuke",
	LOOK_TERRAIN: "terrain"
};

const findList = {
	FIND_EXIT_TOP: 1,
	FIND_EXIT_RIGHT: 3,
	FIND_EXIT_BOTTOM: 5,
	FIND_EXIT_LEFT: 7,
	FIND_EXIT: 10,
	FIND_CREEPS: 101,
	FIND_MY_CREEPS: 102,
	FIND_HOSTILE_CREEPS: 103,
	FIND_SOURCES_ACTIVE: 104,
	FIND_SOURCES: 105,
	FIND_DROPPED_ENERGY: 106,
	FIND_DROPPED_RESOURCES: 106,
	FIND_STRUCTURES: 107,
	FIND_MY_STRUCTURES: 108,
	FIND_HOSTILE_STRUCTURES: 109,
	FIND_FLAGS: 110,
	FIND_CONSTRUCTION_SITES: 111,
	FIND_MY_SPAWNS: 112,
	FIND_HOSTILE_SPAWNS: 113,
	FIND_MY_CONSTRUCTION_SITES: 114,
	FIND_HOSTILE_CONSTRUCTION_SITES: 115,
	FIND_MINERALS: 116,
	FIND_NUKES: 117,
};


const obstacleObjectTypes = [ "spawn", "creep", "wall", "source", "constructedWall", "extension", "link", "storage", "tower", "observer", "powerSpawn", "powerBank", "lab", "terminal", "nuker" ];
/*
 *
 * IDEAS
 *
 *
 * */