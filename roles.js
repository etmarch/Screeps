/**
 * Roles
 *
 *
 */

module.exports = function () {
	return {
		'harvester' : { "parts" : [WORK, CARRY, MOVE, MOVE], "cost" : 250, "fighter" : false },
		//'builder'   : { "parts" : [MOVE, MOVE, CARRY, WORK], "cost" : 250, "fighter" : false },
		'guard'     : { "parts" : [TOUGH, ATTACK, ATTACK, MOVE, MOVE], "cost" : 270, "fighter" : true },
		'ranger'    : { "parts" : [TOUGH, TOUGH, TOUGH, RANGED_ATTACK, MOVE], "cost" : 240, "fighter" : true },
		'healer'    : { "parts" : [TOUGH, TOUGH, HEAL, MOVE], "cost" : 270, "fighter" : true }
	};
}