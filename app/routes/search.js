import Ember from 'ember';

var Airport = Ember.Object.extend({});
var Errors = Ember.Object.extend({
	flyFrom : null,
	flyTo : null,
	departure : null,
	return: null
});
var Criteria = Ember.Object.extend({
    origin : "",
    destination : "",
    departure : Date.now(),
    return : Date.now(),
    adults: "1",
    children:"0",
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
		    var departureDate = new Date(Date.parse(model.departure.replace(/-/g, " ")));
		    
		    console.log(departureDate);
		    console.log(todaysDate);
		    var isRoundTrip = this.controller.get('isRoundTrip');
		    console.log(isRoundTrip);
			  
		    console.log(model.origin);
		    if(model.origin === ''){
		    	model.errors.set('flyFrom','Select an origin.');
			return;
		    }
		    console.log(model.destination);
		    if(model.destination === ''){
		    	model.errors.set('flyTo','Select a destination.');
			return;
		    }
		    
		    if(model.departure === ''){
		    	model.errors.set('departure','Select a date.');
			return;
		    }
		    
		    
		    if(departureDate < todaysDate){
			console.log('invalid departure date');
		    	model.errors.set('departure','Invalid departure date!');
			return;
		    }
		 
		    if(model.origin === model.destination){
			 model.errors.set('flyFrom','Choose a different origin.');
			 model.errors.set('flyTo','Choose a different destination.');
			 console.log(model.errors.flyFrom);
			 return;
		 	}  
			
			if(isRoundTrip){
			    console.log("isRoundTrip");
			    var returnDate = new Date(Date.parse(model.return.replace(/-/g, " ")));
			    
			    if(model.return === ''){
			    	model.errors.set('return','Select a date.');
				return;
			    }
			    
	  		    if(returnDate < departureDate){
	  		    	model.errors.set('return','Invalid return date!');
	  			return;
	  		    }
			    
	   	      	this.transitionTo('flights', { queryParams: { origin: model.origin, 
	   			 						     destination: model.destination, 
	   			        					     departure: model.departure,
										     return: model.return,
	   		 	 						     adults: model.adults,
	   		 							     children: model.children,
	   		 							     isRoundTrip: isRoundTrip}});
			} else{
				console.log("isNotRoundTrip");
	     	       	this.transitionTo('flights', { queryParams: { origin: model.origin, 
	     			 						     destination: model.destination, 
	     			        					     departure: model.departure,
	     		 	 						     adults: model.adults,
	     		 							     children: model.children,
	     		 							     isRoundTrip: isRoundTrip}});
			}


	       
	    }
    }

});