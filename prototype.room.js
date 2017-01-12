/**
 * Room prototype.
 */

let utils = require( 'utils' );

module.exports = function () {
	Room.prototype.isSourcesMaxed = function () {
		// loop through each source, count harvs and compare to max harvs
		return true;
	};
	Room.prototype.countContainers = function () {
		return true;
	};
	Room.prototype.countConstructionSites = function () {
		//utils.cL(`this - ${this}`);
		const allSites = this.find( FIND_MY_CONSTRUCTION_SITES );
		/*if (!allSites || !allSites.length || allSites === null) {
			utils.cL('count construction sites err - cant find construction sites~');
			return 'Error';
		}*/
		//Utils.cL(`allSites: ${allSites} --- ${Utils.jS(allSites)}`);
		return _.size( allSites );
	};
	Room.prototype.getRoomlevel = function () {
		const currentLevel = this.memory.level;
		return currentLevel;
	};
	Room.prototype.placeInitialExtensionSites = function () {
		let initCheck = this.memory.initialExtensionsPlaced; // check to make sure its not initialized yet
		if (initCheck === true) {
			utils.cL(`init extensions already placed!`);
			return;
		}
		let spawn = Game.getObjectById(this.memory.spawnId); //get spawn pos for coordinates
		if (!spawn) { // check to make sure correct spawn is found
			utils.cL(`no spawn found for memory ID: ${this.memory.spawnId}`);
		}
		
		// get list of coordinates to place buildings
		let spawnY = spawn.pos.y, spawnX = spawn.pos.x;
		
		// ToDo: check area make sure no other objects in the way
		
		// making 5 extensions (first level)
		for (let i = -2; i < 3; i++) { // start 2 to the left (-2)
			let newX = spawnX + i;
			utils.cL(newX);
			const result = this.createConstructionSite(newX, spawnY, STRUCTURE_EXTENSION);
			if (result === 0) {
				utils.cL(`Con site is working`);
				room.memory.initialExtensionsPlaced = true;
			} else if (result === -7) {
				utils.cL(`something already here! ${result}`);
				return;
			}
		}
		
	}
};