
App = Ember.Application.create();

// MODELS

App.ApplicationSerializer = DS.LSSerializer.extend();
App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'movie-library'
});

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

App.Router.map(function() {
  this.route('search', { path: '/search' });
  this.route('library', { path: '/library' });
});

App.ApplicationRoute = Ember.Route.extend({
  // load movies in library early for search results isInLibrary 
  beforeModel: function() {
    var self = this;
    return this.store.findAll('movie').then(function(movies) {
      self.controllerFor('library').set('content', movies);
    });
  },
  afterModel: function() {
    this.transitionTo('search');
  }
});

App.SearchRoute = Ember.Route.extend({
  showResults: function(results) {
    this.controllerFor('search').set('content', results);
  },

  actions: {
    submit: function() { 
      var controller = this.controllerFor('search');
      var title = controller.get('title'),
      url = controller.get('url') + title,
      self = this;

      Ember.$.getJSON( url, function( json ) {
        self.showResults(json['Search']);
      });
    },
    addToLibrary: function(movie) {
      var movie = this.store.createRecord('movie', movie);
      movie.save();
    }
  }
});


// CONTROLLERS

App.SearchItemController = Ember.ObjectController.extend({
  needs: ['library'],

  isInLibrary: function() {
    var library = this.get('controllers.library');
    return !!library.findBy('imdbID', this.get('imdbID'));
  }.property('imdbID', 'controllers.library.[]')
});

App.SearchController = Ember.ArrayController.extend({
  itemController: 'searchItem',
  url: "http://www.omdbapi.com/?s=",
  title: '',
});


App.LibraryController = Ember.ArrayController.extend({
});



