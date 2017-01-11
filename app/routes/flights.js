import Ember from 'ember';
var Criteria = Ember.Object.extend({
    adults: 0,
    children: 0,
    roundTrip: false,
    selectedFlight: ""
});
var Selection = Ember.Object.extend({
	departureFlight: "",
	departureCost: 0,
	returnFlight: "",
	returnCost:0,
	totalCost:0
})
export default Ember.Route.extend({
	queryParams: {
	   origin: {
	     refreshModel: true
	   },
	   destination: {
	     refreshModel: true
	   },
	   departure: {
	     refreshModel: true
	   },
	   return: {
	     refreshModel: true
	   },
	   adults: {
	     refreshModel: true
	   },
	   children: {
	     refreshModel: true
	   },
	   isRoundTrip: {
	   	refreshModel:true
	   }
	   
	 },
	model: function(params) {
		var flights = this.get('store').query('flight',{origin: params.origin,destination: params.destination,date: params.departure});
		
		var originRecord = this.get('store').find('airport', params.origin);
		var destinationRecord = this.get('store').find('airport', params.destination);
		var criteria = Criteria.create();
		criteria.destination = params.destination;
		criteria.adults = params.adults;
		criteria.children = params.children;
		criteria.roundTrip = params.roundTrip;
		return Ember.RSVP.hash({
			model: flights,
            criteria: criteria,
            originRecord: originRecord,
            destinationRecord: destinationRecord,
            selection: Selection.create()
        });
    },setupController: function(controller, hash) {
        controller.set("model", hash.model);
        controller.set("criteria", hash.criteria);
        controller.set("originRecord", hash.originRecord);
        controller.set("destinationRecord", hash.destinationRecord);
        controller.set("selection", hash.selection);
    },
	actions: {
	    selectFlight(flight){
	    	console.log('action on fights route');
		    this.controller.get('selection').set('departureFlight',flight.id);
		    var passengers =  Number(this.controller.get('criteria').adults) +  Number(this.controller.get('criteria').children);
		    console.log('passengers:'+passengers)
		    var cost = flight.get('data').price * passengers;
		    this.controller.get('selection').set('departureCost',cost);
		},
	}
});