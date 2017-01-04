import Ember from 'ember';

var Airport = Ember.Object.extend({});
var Errors = Ember.Object.extend({
	flyFrom : null,
	flyTo : null,
	date : null
});
var Criteria = Ember.Object.extend({
    origin : "",
    destination : "",
    date : Date.now(),
    errors: Errors.create()
});

 
export default Ember.Route.extend({
    model() {
        var codes = Ember.A([]);

        this.get('store').findAll('airport').then(function(airports) {
              console.log('Found ' + airports.get('length'));
              airports.forEach(function(item){
			  var element = item.get("data");
                console.log(element);
                var text = element.code + " - " + element.name;
                codes.pushObject(Airport.create({code: element.code, text: element.name}));
             });
        });


        return Ember.RSVP.hash({
            model: Criteria.create(),
            codes: codes
        });
    },setupController: function(controller, hash) {
        controller.set("model", hash.model);
        controller.set("codes", hash.codes);
    },
    actions: {
	    routeToFlights: function(model) {
		    model.set('errors',Errors.create());
		    var todaysDate = new Date();
		    todaysDate.setHours(0, 0, 0, 0);
		    var pickedDate = new Date(Date.parse(model.date.replace(/-/g, " ")));
		    
		    console.log(pickedDate);
		    console.log(todaysDate);
			  
		    if(model.origin === ''){
		    	model.errors.set('flyFrom','Select an origin.');
			return;
		    }
		    if(model.destination === ''){
		    	model.errors.set('flyTo','Select a destination.');
			return;
		    }
		    
		    if(model.date === ''){
		    	model.errors.set('date','Select a date.');
			return;
		    }
		    
		    
		    if(pickedDate < todaysDate){
		    	model.errors.set('date','Invalid date!');
			return;
		    }
		 
		    if(model.origin === model.destination){
			 model.errors.set('flyFrom','Choose a different origin.');
			 model.errors.set('flyTo','Choose a different destination.');
			 console.log(model.errors.flyFrom);
			 return;
		 	}   

	       this.transitionTo('flights', { queryParams: { origin: model.origin, destination: model.destination, date: model.date }});
	    }
    }

});