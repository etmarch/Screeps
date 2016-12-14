/**
 * Logging functionality
 */

const _ = require('lodash');
const utils = require('utils');


const log = {
	roomEnergy: (room, tickInterval) => {
		if (Game.time % tickInterval === 0) {
			let eAvail = room.energyAvailable, eCap = room.energyCapacityAvailable;
			utils.cL(`We have ${eAvail} E, from total of ${eCap}. Full % = ${ ((eAvail/eCap) * 100).toFixed(2) }`)
		}
	}
};

module.exports = log;