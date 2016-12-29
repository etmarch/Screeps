/**
 * Logging functionality
 */

//let _ = require('lodash');
let utils = require('utils');


const log = {
	roomEnergy: (room, tickInterval) => {
		if (Game.time % tickInterval === 0) {
			let eAvail = room.energyAvailable, eCap = room.energyCapacityAvailable;
			const droppedEnergy = room.find(FIND_DROPPED_ENERGY);
			utils.cLC(`E: ${eAvail}, cap: ${eCap}, %: ${ ((eAvail/eCap) * 100).toFixed(2) } - dropped: ${_.count(droppedEnergy)}`);
		}
	}
};

module.exports = log;