import Ember from 'ember';
var Criteria = Ember.Object.extend({
    departure : "",
    return : "",
    adults: 0,
    children: 0,
    roundTrip: false
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
	   childs: {
	     refreshModel: true
	   },
	   roundTrip: {
	   		refreshModel:true
	   	}
	   
	 },
	model: function(params) {
		var flights = this.get('store').query('flight',{origin: params.origin,destination: params.destination,date: params.departure});
		
		var origin = this.get('store').find('airport', params.origin);
		var destination = this.get('store').find('airport', params.destination);

		Criteria.destination = params.destination;
		Criteria.departure = params.departure;
		Criteria.return = params.return;
		Criteria.adults = params.adults;
		Criteria.children = params.childs;
		Criteria.roundTrip = params.roundTrip;
		 return Ember.RSVP.hash({
            model: flights,
            criteria: Criteria,
            origin: origin,
            destination: destination
        });
    },setupController: function(controller, hash) {
        controller.set("model", hash.model);
        controller.set("criteria", hash.criteria);
        controller.set("origin", hash.origin);
        controller.set("destination", hash.destination);
    },
});