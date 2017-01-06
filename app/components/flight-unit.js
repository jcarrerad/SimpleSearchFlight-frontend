import Ember from 'ember';

export default Ember.Component.extend({
	isExpanded: false,
	actions: {
	    toggleExpand() {
	      this.toggleProperty('isExpanded');
		},
	    setSelectedFlight(flight){
		    console.log('action in flight-unit');
		    this.sendAction('selectFlight',flight);
		},
	},
});
