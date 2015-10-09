
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


App.SearchController = Ember.ArrayController.extend({
  url: "http://www.omdbapi.com/?t=",
  title: '',

  add: function(json) {
    // var movie = this.store.createRecord('movie', json);
    this.get('content').addObject(json);
  },

  actions: {
    submit: function() {
      console.log('submit search');
      var title = this.get('title'),
      url = this.get('url') + title,
      self = this;

      Ember.$.getJSON( url, function( json ) {
        console.log('json:', json);
        self.add(json);
      });
      return false;
    }
  }
});
