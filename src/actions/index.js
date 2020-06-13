// {
//     type: 'INCREASE_COUNT', 
// }
// {
//     type: 'DECREASE_COUNT'
// }

// Action Types
export const ADD_MOVIES = 'ADD_MOVIES';

// action creators
export function addMovies (movies) {
    return {
        type: ADD_MOVIES,
        movies
      }
}