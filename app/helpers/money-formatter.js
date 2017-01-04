import Ember from 'ember';

export function moneyFormatter(num) {
  num = Number(num);
  
  if (isNaN(num)) { return ''; } // You could set this to 0 if you wanted

  num = num.toFixed(2);

  return num.replace(/\B(?=(\d{3})+(?!\d)(?=\.))/g, ',');
}

export default Ember.Helper.helper(moneyFormatter);
