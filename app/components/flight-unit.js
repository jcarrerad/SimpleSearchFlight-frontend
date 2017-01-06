import Ember from 'ember';

export default Ember.Component.extend({
	selectedFlight: "",
	isExpanded: false,
	actions: {
	    toggleExpand() {
	      this.toggleProperty('isExpanded');
		},
		selectFlight(id){
			selectedFlight = id;
		}
	},
});
