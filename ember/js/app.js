
App = Ember.Application.create();

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
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('search');
  }
})

App.SearchRoute = Ember.Route.extend({
  setupController: function(controller) {
    this._super();
    // if title is set by queryParam, trigger a submit
    if(controller.get('title')) {
      Ember.run.next(this, function() {
        this.send('submit');
      });
    }
  },
  showResults: function(results) {
    this.controllerFor('search').set('content', results);
  },

  actions: {
    submit: function() { 
      var controller = this.controllerFor('search');
      var title = controller.get('title'),
      url = controller.get('url') + title,
      self = this;

      $.getJSON( url, function( json ) {
        self.showResults(json['Search']);
      });
    },
    addToLibrary: function(movie) {
      var movie = this.store.createRecord('movie', movie);
      movie.save();
    }
  }
});

App.LibraryRoute = Ember.Route.extend({
  actions: {
    delete: function(movie) {
      movie.destroyRecord();
    }
  }
});


// COMPONENTS 

App.SearchTitleComponent = Ember.Component.extend({
  actions: {
    submit: function() {
      this.sendAction();
    }
  }
});

App.MoviePreviewComponent = Ember.Component.extend({
  classNames: ['movie', 'movie-preview'],
  actions: {
    addToLibrary: function() {
      this.sendAction('action', this.get('movie.model'));
    }
  }
});

App.MovieCardComponent = Ember.Component.extend({
  classNames: ['movie', 'movie-card'],
  actions: {
    delete: function() {
      this.sendAction('action', this.get('movie'));
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
  queryParams: ['title']
});


App.LibraryController = Ember.ArrayController.extend({
});



