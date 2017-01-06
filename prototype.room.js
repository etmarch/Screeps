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
		utils.cL(`this - ${this}`);
		const allSites = this.find( FIND_MY_CONSTRUCTION_SITES );
		//Utils.cL(`allSites: ${allSites} --- ${Utils.jS(allSites)}`);
		return _.size( allSites );
	};
};