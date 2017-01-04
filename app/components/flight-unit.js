import Ember from 'ember';

export default Ember.Component.extend({
	isExpanded: false,
	actions: {
	    toggleExpand() {
	      this.toggleProperty('isExpanded');
		}
	},
});
