App = Ember.Application.create();

App.Router.map(function() {
  this.route('search', { path: '/search' });
  this.route('library', { path: '/library' });
});


App.SearchController = Ember.Controller.extend({
  url: "http://www.omdbapi.com/?t=",
  title: '',

  actions: {
    submit: function() {
      console.log('submit search');
      var title = this.get('title');
      var url = this.get('url') + title; 
      $.getJSON( url, function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
          console.log('data:', data);
          // items.push( "<li id='" + key + "'>" + val + "</li>" );
        });
        // $( "<ul/>", {
        //   "class": "my-new-list",
        //   html: items.join( "" )
        // }).appendTo( "body" );
      });
      return false;
    }
  }
});
