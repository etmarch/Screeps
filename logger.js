/**
 * Logging functionality
 */

var _ = require('lodash');
let utils = require('utils');
let roles = require('roles');

const log = {
	roomEnergy: (room, tickInterval) => {
		if (Game.time % tickInterval === 0) {
			let eAvail = room.energyAvailable, eCap = room.energyCapacityAvailable;
			const droppedEnergy = room.find(FIND_DROPPED_RESOURCES);
			utils.cLC(`E: ${eAvail}, cap: ${eCap}, %: ${ ((eAvail/eCap) * 100).toFixed(2) } - dropped: ${_.size(droppedEnergy)}`);
		}
	},
	roleCount: (room, tickInterval) => {
		if (Game.time % tickInterval === 0) {
			//ToDO: loop through all the roles in the role main file
			let harvCount = utils.countRole( 'harvester' );
			let upgraderCount = utils.countRole( 'upgrader' );
			let builderCount = utils.countRole( 'builder' );
			utils.cLC(`Harvs: ${harvCount}, Ups: ${upgraderCount}, Builds: ${ builderCount }, Construction: ${_.size(Game.constructionSites)}`);
		}
	}
};

module.exports = log;
