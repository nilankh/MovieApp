import React from 'react';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourites } from '../actions';
import { data as movieList} from '../data';
import { connect } from '../index';
import { render } from '@testing-library/react';

class App extends React.Component{
  componentDidMount(){

    // const { store } = this.props;
    // store.subscribe(() => {
    //   console.log('UPDATED');
    //   this.forceUpdate();//we should not use this method
    // });
    // make api call
    // dispatch action
    this.props.dispatch(addMovies(movieList));
    // console.log('STATE', this.props.store.getState());

  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;

    const index = movies.favourites.indexOf(movie);
    if(index !== -1){
      // found the movie
      return true;
    }

    return false;
  }
  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val))
  } 
  render() {
    const { movies, search } = this.props; //{ movies: {}, search: {} }
    console.log('movies', movies);
    const { list,showFavourites =[], favourites = [] } = movies; 
    // console.log('Render', this.props.store.getState());
    
    const displayMovies = showFavourites ? favourites : list;
    
    // const { dispatch } = this.props.store;
    // console.log("disptach in app.js", dispatch);
    return (
      <div className="App">
      <Navbar  search={search} />  
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites ? '' :'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs' : '' }`} onClick={() => this.onChangeTab(true)}>Favourites</div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie} 
                  key={`movies-${index}`}
                  dispatch={this.props.dispatch} 
                  isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? <div className="no-movies">No movies to display!</div> : null}
        </div>
      </div>
    );
  }
}

// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     )
//   }
// }
function mapStateToProps(state) {
  return {
    movies: state.movie,
    search: state.movies,
  };
}
const connectedAppComponent = connect(mapStateToProps)(App);
export default connectedAppComponent;
