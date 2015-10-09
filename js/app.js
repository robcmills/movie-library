
App = Ember.Application.create();

App.Router.map(function() {
  this.route('search', { path: '/search' });
  this.route('library', { path: '/library' });
});

App.ApplicationSerializer = DS.LSSerializer.extend();
App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'movie-library'
});

// MODELS

App.Movie = DS.Model.extend({
  Title: DS.attr('string'), 
  Year: DS.attr('string'),
  imdbID: DS.attr('string'),
  Type: DS.attr('string'),
  Poster: DS.attr('string'),

  // title: DS.attr('string'), 
  // year: DS.attr('string'), 
  // rated: DS.attr('string'), 
  // released: DS.attr('string'), 
  // runtime: DS.attr('string'), 
  // genre: DS.attr('string'), 
  // director: "Alfonso Cuarón",
  // writer: DS.attr('string'), 
  // actors: DS.attr('string'), 
  // plot: DS.attr('string'), 
  // language: DS.attr('string'), 
  // country: DS.attr('string'), 
  // awards: DS.attr('string'), 
  // poster: DS.attr('string'), 
  // metascore: DS.attr('string'), 
  // imdbRating: DS.attr('string'), 
  // imdbVotes: DS.attr('string'), 
  // imdbID: DS.attr('string'), 
  // type: DS.attr('string'), 
  // response: DS.attr('string')
});

// ROUTES

App.SearchRoute = Ember.Route.extend({
  addResults: function(results) {
    this.controllerFor('search').get('content').addObjects(results);
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
      // this.controllerFor('library').get('content').addObject(movie);
      var movie = this.store.createRecord('movie', movie);
      movie.save();
    }
  }
});

App.LibraryRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('movie');
  }
});


// CONTROLLERS

App.SearchItemController = Ember.ObjectController.extend({
  needs: ['library'],

  isInLibrary: function() {
    var library = this.get('controllers.library');
    return !!library.findBy(this.get('imdbID'));
  }.property('imdbID', 'controllers.library.[]')
});

App.SearchController = Ember.ArrayController.extend({
  itemController: 'searchItem',
  url: "http://www.omdbapi.com/?s=",
  title: '',
});

App.LibraryController = Ember.ArrayController.extend({
});



