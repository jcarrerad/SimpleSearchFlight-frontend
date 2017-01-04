import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'article',
	sortedFlights: Ember.computed.sort('flights', 'sortDefinition'),
	sortBy: 'price:asc', // default sort by price (lowest)
	sortDefinition: Ember.computed('sortBy', function() {
	  return [ this.get('sortBy') ];
	}),
});
