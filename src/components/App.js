import React from 'react';
import { data as movieList} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourites } from '../actions';
import { StoreContext } from '../index';

class App extends React.Component{
  componentDidMount(){

    const { store } = this.props;
    store.subscribe(() => {
      console.log('UPDATED');
      this.forceUpdate();//we should not use this method
    });
    // make api call
    // dispatch action
    store.dispatch(addMovies(movieList));
    console.log('STATE', this.props.store.getState());

  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props.store.getState();

    const index = movies.favourites.indexOf(movie);
    if(index !== -1){
      // found the movie
      return true;
    }

    return false;
  }
  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val))
  } 
  render() {
    const { movies, search } = this.props.store.getState(); //{ movies: {}, search: {} }
    const { list, favourites, showFavourites } = movies; 
    console.log('Render', this.props.store.getState());
    
    const displayMovies = showFavourites ? favourites : list;
    
    return (
      <StoreContext.Consumer>
        {(store) => {

        return (
          <div className="App">
          <Navbar dispatch={this.props.store.dispatch} search={search} />  
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
                      dispatch={this.props.store.dispatch} 
                      isFavourite={this.isMovieFavourite(movie)}
                  />
                ))}
              </div>
              {displayMovies.length === 0 ? <div className="no-movies">No movies to display!</div> : null}
            </div>
          </div>
          );

        }}
      </StoreContext.Consumer>
    );
    // const { dispatch } = this.props.store;
    // console.log("disptach in app.js", dispatch);

  }
}

export default App;
