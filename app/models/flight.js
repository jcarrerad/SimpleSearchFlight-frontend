import DS from 'ember-data';

export default DS.Model.extend({
	flightCode: DS.attr(),
	origin: DS.attr(),
	destination: DS.attr(),
	airline: DS.attr(),
	airlineLogo: DS.attr(),
	seatClass: DS.attr(),
	departure: DS.attr('date'),
	arrival: DS.attr(),
	stops: DS.attr(),
	price: DS.attr('string'),
	departureTime: DS.attr(),
	arrivalTime: DS.attr('date'),
	travelTime: DS.attr(),
	aircraft: DS.attr()
	
});	