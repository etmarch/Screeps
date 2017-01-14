/**
 * Source Modifications
 */

var _ = require( 'lodash' );
let utils = require('utils');

if ( !Source.prototype.memory ) {
	Object.defineProperty( Source.prototype, "memory", {
		get: function () {
			return this.room.memory.sources[ this.id ];
		},
		set: function ( value ) {
			this.room.memory.sources[ this.id ] = value;
		}
	} );
}


Source.prototype.cleanHarvMemory = function () {
	// ToDO: make this function only happen very rarely, to make sure all data is looking proper
	//utils.cL(`memory: ${JSON.stringify(this.memory)}`);
	utils.cL(`this ID: ${(this.memory.sources)}   ------ ${utils.jS(this.room.memory.sources)}`);
	for ( var harvName in this.room.memory.sources[ this.id ].harvs ) {
		utils.cL(`name: ${harvName} cleanHarv: ${this.room.memory.sources[ this.id ].harvs[harvName]}`);
		if ( !Game.creeps[ harvName ] ) {
			delete this.room.memory.sources[ this.id ].harvs[ harvName ];
		}
	}
};