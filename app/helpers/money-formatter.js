import Ember from 'ember';

export function moneyFormatter(num) {
	num = Number(num);
	
	if (isNaN(num)) { 
		return ''; 
	} 
	
	num = num.toFixed(2);

	return num.replace(/\B(?=(\d{3})+(?!\d)(?=\.))/g, ',');
}

export default Ember.Helper.helper(moneyFormatter);
