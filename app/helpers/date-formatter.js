import Ember from 'ember';
import moment from 'moment';

export function dateFormatter([date]) {
  var format = 'YYYY MM DD HH:mm';
  
  
  return moment(date).format(format);
}

export default Ember.Helper.helper(dateFormatter);
