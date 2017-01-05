import Ember from 'ember';

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
	   }
	 },
	model: function(params) {
		return this.get('store').query('flight',{origin: params.origin,destination: params.destination,date: params.departure});
	}
});