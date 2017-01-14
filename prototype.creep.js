/**
 * Created by evanmarchand on 1/11/17.
 */


module.exports = function () {
	// Repeatable action for screeps, either do the action or move to it.
	Creep.prototype.doOrMove = function ( creep, action, objectId, args ) {
		// action has to be one of...
		let creep = this;
		// objectId can probably be replaced with the object itself
		if ( creep[ action ]( Game.getObjectById( objectId ), args ) == ERR_NOT_IN_RANGE ) {
			creep.moveTo( Game.getObjectById( objectId ) );
		}
	}
	
};


/*
 var road =this.creep.pos.lookFor(LOOK_STRUCTURES,{
 filter: (structure) => { return structure.structureType == STRUCTURE_ROAD; }} );
 
 
 var found_site = creep.pos.lookFor( LOOK_CONSTRUCTION_SITES, {
 filter: ( site ) => {
 return site.structureType == STRUCTURE_ROAD;
 }
 } );
 
 this.fullExtensions = _.filter(this.extensions, function(extension){
 return (extension.energy == extension.energyCapacity)
 })
 
 // Filter for extensions that need energy
 this.notFullExtensions = _.filter(this.extensions, function(extension){
 return (extension.energy < extension.energyCapacity)
 })
 
 */