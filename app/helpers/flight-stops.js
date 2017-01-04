import Ember from 'ember';

export function flightStops([stops]/*, hash*/) {
	if (stops === 0){
		return 'Non-stop';
	}
	if (stops === 1){
		return '1 stop';
	}
	if (stops > 1){
		return stops + ' stops';
	}
}

export default Ember.Helper.helper(flightStops);
