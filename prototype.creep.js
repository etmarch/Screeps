/**
 * Created by evanmarchand on 1/11/17.
 */

let _ = require('lodash');
let utils = require('utils');
let roles = require( 'roles' );

module.exports = function () {
	// Repeatable action for screeps, either do the action or move to it.
	Creep.prototype.doOrMove = function ( creep, action, objectId, args ) {
		// action has to be one of...
		let creep = this;
		// objectId can probably be replaced with the object itself
		if ( creep[ action ]( Game.getObjectById( objectId ), args ) == ERR_NOT_IN_RANGE ) {
			creep.moveTo( Game.getObjectById( objectId ) );
		}
	};
	
	Creep.prototype.findLargestDroppedEnergy = function () {
		let biggestResourceDropped = _.max( this.room.find( FIND_DROPPED_RESOURCES ), 'amount' ); // !!Expensive
		utils.cL(`largest dropped resource - ${biggestResourceDropped}`);
	};
	/*
	Check if creep should kill itself due to missing parts
	- roleName: Name of the role
	 */
	Creep.prototype.suicideCheck = function ( creep, roleName ) {
		utils.cL(roleName);
		let creep = this;
		const parts = roles()[ roleName ][ 'parts' ]; // retrieve list of parts supposed to be there
		//const partNames = _.keysIn( partsCosts );
		_.forEach( parts, function ( part ) { // loop through parts and check if they exist
			//cL( `part - ${part}, ${partsCosts[part]}` );
			if ( creep.getActiveBodyparts( part ) == 0 ) { // no active body part, kill it
				creep.suicide();
			}
		} );
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