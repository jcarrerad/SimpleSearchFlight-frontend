import Ember from 'ember';
var Criteria = Ember.Object.extend({
    adults: 0,
    children: 0,
    roundTrip: false,
    departure: "",
    return: ""
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
		var returnFlights = Ember.A([]);
		var flights = this.get('store').query('flight',{origin: params.origin,destination: params.destination,date: params.departure});
		
		if(params.isRoundTrip === 'true'){
			console.log(params.isRoundTrip);
			//returnFlights = this.get('store').query('flight',{origin: params.destination,destination: params.origin,date: params.return});
		}

		var originRecord = this.get('store').find('airport', params.origin);
		var destinationRecord = this.get('store').find('airport', params.destination);
		var criteria = Criteria.create();
		criteria.destination = params.destination;
		criteria.adults = params.adults;
		criteria.children = params.children;
		criteria.roundTrip = params.isRoundTrip;
		criteria.departure = params.departure;
		criteria.return = params.return;
		return Ember.RSVP.hash({
			model: flights,
			returnFlights: returnFlights,
            criteria: criteria,
            originRecord: originRecord,
            destinationRecord: destinationRecord,
            selection: Selection.create()
        });
    },setupController: function(controller, hash) {
        controller.set("model", hash.model);
        controller.set("returnFlights", hash.returnFlights);
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
		    var total = Number(this.controller.get('selection').departureCost) + Number(this.controller.get('selection').returnCost);
		    this.controller.get('selection').set('totalCost',total);

		},
		clearSelectedFlight(){
		    console.log('triggered clearSelectFlight');
			this.controller.get('selection').set('departureFlight','');
			this.controller.get('selection').set('departureCost',0);
			this.controller.get('selection').set('returnFlight','');
			this.controller.get('selection').set('returnCost',0);
			this.controller.get('selection').set('totalCost',0);


		}
	}
});