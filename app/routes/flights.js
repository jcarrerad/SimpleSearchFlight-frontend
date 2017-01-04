import Ember from 'ember';

export default Ember.Route.extend({
	 queryParams: {
	   origin: {
	     refreshModel: true
	   },
	   destination: {
	     refreshModel: true
	   },
	   date: {
	     refreshModel: true
	   }
	 },
	model: function(params) {
		return this.get('store').query('flight',{origin: params.origin,destination: params.destination,date: params.date});
	}
});