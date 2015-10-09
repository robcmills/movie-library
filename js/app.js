
App = Ember.Application.create();

App.Router.map(function() {
  this.route('search', { path: '/search' });
  this.route('library', { path: '/library' });
});

App.Movie = DS.Model.extend({
  title: DS.attr('string'), 
  year: DS.attr('string'), 
  rated: DS.attr('string'), 
  released: DS.attr('string'), 
  runtime: DS.attr('string'), 
  genre: DS.attr('string'), 
  director: "Alfonso Cuarón",
  writer: DS.attr('string'), 
  actors: DS.attr('string'), 
  plot: DS.attr('string'), 
  language: DS.attr('string'), 
  country: DS.attr('string'), 
  awards: DS.attr('string'), 
  poster: DS.attr('string'), 
  metascore: DS.attr('string'), 
  imdbRating: DS.attr('string'), 
  imdbVotes: DS.attr('string'), 
  imdbID: DS.attr('string'), 
  type: DS.attr('string'), 
  response: DS.attr('string')
});


App.SearchRoute = Ember.Route.extend({
  addResults: function(results) {
    // var movie = this.store.createRecord('movie', json);
    this.controllerFor('search').get('results').addObjects(results);
  },

  actions: {
    submit: function() { 
      var controller = this.controllerFor('search');
      var title = controller.get('title'),
      url = controller.get('url') + title,
      self = this;

      Ember.$.getJSON( url, function( json ) {
        self.addResults(json['Search']);
      });
    },
    addToLibrary: function(movie) {
      console.log('addToLibrary', movie);
      this.controllerFor('library').addObject(movie);
    }
  }
});

App.SearchController = Ember.Controller.extend({
  url: "http://www.omdbapi.com/?s=",
  title: '',
  results: Ember.A(),
});

App.LibraryController = Ember.ArrayController.extend({
});
