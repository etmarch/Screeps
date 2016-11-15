/*
 * Created by evanmarchand on 11/11/16.
 */

var _ = require( 'lodash' );
var utils = require( 'utils' );


// first check to see if memory has been initiated
module.exports.initMemory = function () {
	utils.cL( `initMem function: ${JSON.stringify( Memory )}, ${_.size( Game.spawns )}` );
	utils.cL( _.size( Game.rooms ) );
	if ( !Memory.init ) {
		// Initialization not done: do it
		/*for (var room in Game.rooms) {
		 utils.cL(` ${room}  and ${Game.rooms[room]}  `);*/
		for ( var name in Game.spawns ) {
			var mainSpawn = Game.spawns[ name ];
			var firstSource = mainSpawn.pos.findClosest(FIND_SOURCES_ACTIVE);
			 //console.log(firstSource + ' position '+firstSource.pos);
			 mainSpawn.memory.firstSourceId = firstSource.id;
			 var sourceIds = [];
			 _.forEach(mainSpawn.room.find(FIND_SOURCES_ACTIVE), function(source) {
			 sourceIds.push(source);
			 });
			 var filteredIds = _.pull(sourceIds, firstSource);
			 var secondSource = mainSpawn.pos.findClosest(filteredIds);
			 
			 mainSpawn.memory.secondSourceId = secondSource.id;
			 
			 Memory.mainSpawn = Game.spawns[name].id; // store main spawn in memory
			 
			 // Store reference to the source keeper
			 var sourceCreep = mainSpawn.room.find(FIND_HOSTILE_CREEPS, {
			 filter: function (c) {
			 return c.owner.username == 'Source Keeper';
			 }
			 });
			 
			 Memory.sourceKeeper = sourceCreep.id;
			
			
			utils.cL( `mainSpawn: ${mainSpawn}, Game.spawns: ${Game.spawns}` );
		}
		
		for ( var creep in Game.creeps ) {
			Memory.creeps[ creep ] = creep.name;
		}
		
		
		// ToDo: This needs to be cleaned up, reused from another module or config file...
		Memory.harvester = 0,
				//Memory.builder = 0,
				//Memory.guard = 0,
				//Memory.ranger = 0,
				//Memory.healer = 0;
				Memory.harvesterCurrent = 0,
				//Memory.builderCurrent = 0,
				//Memory.guardCurrent = 0,
				//Memory.rangerCurrent = 0,
				//Memory.healerCurrent = 0;
				//Memory.source1Harvs = [],
				//Memory.source2Harvs = [],
				//Memory.source3Harvs = [];
				Memory.deathsTotal = 0;
				
				Memory.init = true;
	}
};
