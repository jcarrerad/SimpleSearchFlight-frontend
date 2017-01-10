import Ember from 'ember';
var Criteria = Ember.Object.extend({
    adults: 0,
    children: 0,
    roundTrip: false,
    selectedFlight: ""
});
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
        });
    },setupController: function(controller, hash) {
        controller.set("model", hash.model);
        controller.set("criteria", hash.criteria);
        controller.set("originRecord", hash.originRecord);
        controller.set("destinationRecord", hash.destinationRecord);
    },
	actions: {
	    selectFlight(flight){
		    console.log('action on fights route');
		    this.controller.get('criteria').set('selectedFlight',flight.id);
		},
	}
    
});