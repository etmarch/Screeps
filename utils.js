/**
 * Created by evanmarchand on 11/11/16.
 */
/* UTILS
 *
 * Helper functions used everywhere
 */

var _ = require( 'lodash' );
var roles = require( 'roles' );


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

// Cache the spawn to be used
const spawn = Game.getObjectById(Memory.initialSpawnId);

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
			sumCost += partsCosts[part];
		} );
		return sumCost;
	},
	
	cL: ( out ) => {
		return cL( out );
	},
	jS: (out) => JSON.stringify(out),
	
	isAreaAllPlains: (topY, leftX, bottomY, rightX) => {
		const terrainArray = spawn.room.lookForAtArea(LOOK_TERRAIN, topY, leftX, bottomY, rightX, {asArray:true});
		if (_.isArray(terrainArray)) {
			return _.every(terrainArray, 'terrain', 'plain');
		}
	},
	
	countPlainsAroundSource: (source) => { // Searches immediate tiles around the source
		cL(`source: ${source} -- ${Utils.jS(source.pos)}`);
		const sourceY = source.pos.y;
		const sourceX = source.pos.x;
		const terrainArray = source.room.lookForAtArea(LOOK_TERRAIN, sourceY-1, sourceX+1, sourceY+1, sourceX-1, {asArray:true});
		cL(`pre edit length: ${terrainArray.length}`);
		// Array should be equal to 8
		// filter out terrain of plain
		const plainArray = _.filter(terrainArray, 'terrain', 'plain');
		cL(`${plainArray.length} - ${plainArray}`);
	},
	
	findEnemies: (obj) => {
		let target = obj.room.find(FIND_HOSTILE_CREEPS, {
			filter: function(object) {
				return (object.getActiveBodyparts(ATTACK) == 0 || object.getActiveBodyparts(RANGED_ATTACK) == 0);
			}
		});
		if (target.length) {
			utils.cL(`target from findEnemies: ${target}`);
			return target;
		} else {
			return -1;
		}
	},
	
	enemiesInRange: (obj, distance) => {
		// Get the room pos of the object being checked
		cL(obj);
	//cL(Game.getObjectById(obj));
		let target = obj.pos.findInRange(FIND_HOSTILE_CREEPS, distance);
		cL(`target in enemiesInRange: ${target}`);
		if (target.length) {
			return target;
		}
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

		
const obstacleObjectTypes = ["spawn", "creep", "wall", "source", "constructedWall", "extension", "link", "storage", "tower", "observer", "powerSpawn", "powerBank", "lab", "terminal","nuker"];
/*
 *
 * IDEAS
 *
 *
 * */