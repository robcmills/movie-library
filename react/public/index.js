
var MovieLibrary = React.createClass({
  render: function() {
    return (
      <div className='movieLibrary'>
        <h2>Welcome to Movie Library</h2>
      </div>
    );
  }
});

ReactDOM.render(
  <MovieLibrary url='/api/library' />,
  document.getElementById('app')
);