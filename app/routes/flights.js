import Ember from 'ember';
var Criteria = Ember.Object.extend({
    origin: "",
    destination: "",
    adults: 0,
    children: 0,
    roundTrip: false,
    departure: "",
    return: ""
});
var Selection = Ember.Object.extend({
	departureFlight: null,
	departureCost: 0,
	returnFlight: null,
	returnCost:0,
	totalCost:0,
	enableBooking: false
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
		criteria.origin = params.origin;
		criteria.destination = params.destination;
		criteria.adults = params.adults;
		criteria.children = params.children;
		criteria.roundTrip = params.isRoundTrip;
		criteria.departure = params.departure;
		criteria.return = params.return;
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
    	selectFlight(_flight){
	    	console.log('action on flights route');
	    	var record = _flight.toJSON();
	    	var flight = this.get('store').createRecord('flight', record);
	    	var params =  this.controller.get('criteria');
	    	var targetFlight = '';
	    	var targetCost = 0;
	    	if(params.roundTrip && this.controller.get('selection').departureFlight !== null){
			    targetFlight = 'returnFlight';
				targetCost = 'returnCost';
				this.controller.get('selection').set('enableBooking',true);
			}else{
				targetFlight = 'departureFlight';
				targetCost = 'departureCost';
				console.log(params.roundTrip + !params.roundTrip);
				if(params.roundTrip === 'false'){
					this.controller.get('selection').set('enableBooking',true);
				}else{
					console.log('updating model');
					this.get('store').query('flight',{origin: params.destination,destination: params.origin,date: params.return});
				}
			}
			this.controller.get('selection').set(targetFlight,flight);
			var passengers =  Number(this.controller.get('criteria').adults) +  Number(this.controller.get('criteria').children);
			console.log('passengers:'+passengers);
			var cost = flight.get('price') * passengers;
			this.controller.get('selection').set(targetCost,cost);
			var total = Number(this.controller.get('selection').departureCost) + Number(this.controller.get('selection').returnCost);
		    this.controller.get('selection').set('totalCost',total);
		},
		clearSelectedFlight(){
		    console.log('triggered clearSelectFlight');
			this.controller.get('selection').set('departureFlight',null);
			this.controller.get('selection').set('departureCost',0);
			this.controller.get('selection').set('returnFlight',null);
			this.controller.get('selection').set('returnCost',0);
			this.controller.get('selection').set('totalCost',0);
			this.controller.get('selection').set('enableBooking',false);

			var params =  this.controller.get('criteria');
		    this.get('store').query('flight',{origin: params.origin,destination: params.destination,date: params.departure});
		}
	}
});