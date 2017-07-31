/**
 * Population Manager File.
 *
 * Purpose: Spawn actual creeps, add them to memory
 *  -Eventually: calculate the math for what to spawn...
 */

var _ = require( 'lodash' );
var roles = require( 'roles' );
var utils = require( 'utils' );

const Pop = {
	// will be called each tick, checks to make sure suitable for spawning
	mainPopLoop: function ( room ) {
		// population create phase
		let possSpawn = Game.getObjectById( room.memory.spawnId );
		let mainSpawn = (possSpawn ? possSpawn : Game.spawns['Spawn1']); //error being generated here
		
		/*
		MAIN POP LOGIC
		*/
		if ( !mainSpawn.spawning ) {
			//utils.cL('MainPOp Loop!');
			// ToDo: Move these counting functions outside and store the number
			let harvCount = utils.countRole( 'harvester' );
			let upgraderCount = utils.countRole( 'upgrader' );
			let builderCount = utils.countRole( 'builder' );
			let roomLevel = room.controller.level;
			
			//utils.cLC(`harv count: ${harvCount}`, `blue`);
			let roomMaxHarvs = room.memory.maxHarvsTotal;
			// todo: handle the whole loop in one shot
			
			// start by making min amount of harvs needed
			if ( harvCount < roomMaxHarvs ) {
				this.spawn( mainSpawn, 'harvester' );
				
				// if we have all harvs, make one upgrader
			} else if ( ( upgraderCount < 1) ) {
				this.spawn( mainSpawn, 'upgrader' );
				
				// Have all harvs and one upgrader, make 2 builders
			} else if ( builderCount < 2 ) {
				this.spawn( mainSpawn, 'builder' );
				
				// Otherwise....
			} else {
				
				// check room level is at least 2
				// ToDo: check amount of storage avail (containers, extensions, etc..)
				if ( roomLevel >= 2 && builderCount < 3 ) {
					this.spawn( mainSpawn, 'builder' );
				} else if (upgraderCount < 2) {
					this.spawn( mainSpawn, 'upgrader' );
				}
			}
		}
	},
	
	spawn: function ( spawn, role, level = 0 ) {
		//utils.cL('spawn function!');
		if ( (spawn.canCreateCreep( roles()[ role ][ 'parts' ] ) == OK) && !spawn.spawning ) {
			let creepName = `${role}-${Game.time}`;//`${role}-${Memory[ role ] + 1}`;
			let creepMemory = {
				role: role,
				roomName: spawn.room.name,
				level: level
			};
			
			if ( role === 'harvester' ) {
				creepMemory = _.merge( creepMemory, {
					assignedSource: Pop.assignHarvToSource( creepName, spawn ),
					assignedContainer: ''
				} );
			}
			
			var result = spawn.createCreep( roles()[ role ][ 'parts' ], creepName, creepMemory );
			utils.cL( `Name of new screep - ${result}..... Cost is: ${utils.countBodyCost( role )}` );
			if ( _.isString( result ) ) { // check that creep has name and was created successfully
				//Memory[ role + 'Current' ]++;
				//Memory[ role ]++;
				return result;
			}
		}
		
	},
	
	//ToDO: convert to ID based lookup now
	// Needs to change room -> source memory, and creep memory
	assignHarvToSource: function ( name, spawn ) {
		utils.cL('assign harv to source function!');
		// Get number of harvs in closest source
		let room = spawn.room;
		//utils.cL(`size: ${_.size(room.memory.safeSourceIds)}`);
		
		// This should store the source ID
		let sourceId = '';
		// ToDo: declaritive loop, iterate through each source
		_.forEach(room.memory.sources, function ( value, index, collection ) {
			let harvCount = _.size(value.harvs); // get count of harvs on this source
			
			if ( harvCount < value.maxHarvs ) {
				//utils.cL( `Assigning Harv ti souurce!` );
				sourceId = value.id;
				room.memory.sources[ `${value.id}` ].harvs.push( name );
				return false;
			}
			
		});
			
		//for (let key of room.memory.sources)
		
		
		/*for ( let i = 0; i < _.size( room.memory.sources ); i++ ) {
			utils.cL(`keys of sources: ${Object.keys(room.memory.sources)}`);
			let nameInd = `source${i}`;
			//utils.cL( ` source Id test:  ${utils.jS( room.memory.safeSourceIds[ nameInd ] )}` );
			let harvCount = _.size( room.memory.sources[ nameInd ].harvs );
			//utils.cL( `source count: ${harvCount}` );
			if ( harvCount < room.memory.sources[ nameInd ].maxHarvs ) {
				//utils.cL( `Assigning Harv ti souurce!` );
				nameToGo[ nameInd ] = room.memory.sources[ nameInd ].id;
				room.memory.sources[ nameInd ].harvs.push( name );
				break;
			}
		}*/
		return sourceId;
	},
	//ToDo: Count through all creeps and return object with key:role val:count
	getAllCounts: function () {
		
	},
	
	removeHarvFromSource: function ( harvester ) {
		
	}
};
module.exports = Pop;