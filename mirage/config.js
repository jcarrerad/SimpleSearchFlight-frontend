export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */
  this.namespace = '/api';

  this.get('/flights', function() {
	  return {
	        data: [{
			  type: 'flights',
		        id: 'A503',
		        attributes: {
		              origin: 'MEX - Mexico Cit International Airport',
				  destination: 'JFK - John F. Kennedy Intl Airport',
				  airline: 'American Arilines',
				  img: 'http://netdna.webdesignerdepot.com/uploads/2009/03/aa2.gif',
				  class: 'Economy / Coach',
				  departure: '08:33',
				  arrival: '12:45',
				  time: '04h12m',
				  stops: 0,
				  price: '$3,500.00'
			  }
			}, {
			  type: 'flights',
		        id: 'A501',
			  attributes: {
				  origin: 'MEX - Mexico Cit International Airport',
				  destination: 'JFK - John F. Kennedy Intl Airport',
				  airline: 'Delta Arilines',
				  img: 'http://logok.org/wp-content/uploads/2014/02/Delta-Arrow-logo.png',
				  class: 'Economy / Coach',
				  departure: '10:55',
				  arrival: '16:30',
				  time: '05h35m',
				  stops: 1,
				  price: '$2,800.00'
			  }
			}, {
			  type: 'flights',
		        id: 'A603',
			  attributes: {
				  origin: 'MEX - Mexico Cit International Airport',
				  destination: 'JFK - John F. Kennedy Intl Airport',
				  airline: 'Continental Arilines',
				  img: 'http://fontmeme.com/images/Continental-Airlines-Logo.jpg',
				  class: 'Economy / Coach',
				  departure: '16:10',
				  arrival: '23:50',
				  time: '07h40m',
				  stops: 2,
				  price: '$2,100.00'
			  }
		  	}, {
			  type: 'flights',
		        id: 'AM723',
			  attributes: {
				  origin: 'MEX - Mexico Cit International Airport',
				  destination: 'JFK - John F. Kennedy Intl Airport',
				  airline: 'Aeromexico',
				  img: 'https://aeromexico.com/export/sites/default/.galleries/informativos-espanol/cabllero_aguila_noticia.jpg',
				  class: 'Economy / Coach',
				  departure: '06:10',
				  arrival: '09:55',
				  time: '03h 45m',
				  stops: 0,
				  price: '$3,800.00'
			  }
			}] 
	      };
	    });
}
