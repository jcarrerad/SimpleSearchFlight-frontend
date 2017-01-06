import Ember from 'ember';
import moment from 'moment';

export function dateFormatter([date],options) {
  var format = options.format;
  if (typeof(format) === 'undefined') {
  	format = 'YYYY MM DD HH:mm';
  }
  
  return moment(date).format(format);
}

export default Ember.Helper.helper(dateFormatter);
