import * as types from '../constants/ActionTypes';
import {API_KEY} from '../config';

export const searchInput = searchValue => ({
    type: types.ENTER_SEARCH_VALUE,
    payload: searchValue
});

export const searchFilter = type => ({
    type: types.SWITCH_SEARCH_TYPE,
    payload: type
});

export const setLoader = message => ({
    type: types.EDIT_LOADER_MESSAGE,
    payload: message
});

export const resetStore = () => ({
    type: types.RESET_STORE,
});

export const sortMovies = movies => ({
    type: types.SORT_MOVIES,
    payload: movies,
});

export const receiveMovies = movies => ({
    type: types.RECEIVE_MOVIES,
    payload: movies,
});

export const receiveGenres = genres => ({
    type: types.RECEIVE_GENRES,
    payload: genres,
});

export const receiveCast = cast => ({
    type: types.RECEIVE_CAST,
    payload: cast,
});

export const receiveDirector = director => ({
    type: types.RECEIVE_DIRECTOR,
    payload: director,
});

export const receiveMoviesBySameDirector = movies => ({
    type: types.RECEIVE_MOVIES_BY_DIRECTOR,
    payload: movies,
});

export const receiveCurrentMovie = movie => ({
    type: types.RECEIVE_CURRENT_MOVIE,
    payload: movie,
});

export const getGenres = () => dispatch => {
    return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
        {method: 'GET'})
        .then(response => response.json())
        .then(result => {
            dispatch(receiveGenres(result.genres));
        })
        .catch(error => {
            console.log(error);
        });
};

export const getMovies = (type, query) => dispatch => {
    let url;

    dispatch(setLoader('Loading...'));
    (type === 'title') ?
        url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}` :
        url = `https://api.themoviedb.org/3/search/person?query=${query}&api_key=${API_KEY}`;
    return fetch(url, {method: 'GET'})
        .then(response => response.json())
        .then(response => {
            if (type === 'title') {
                return response.results;
            } else {
                let personsIDs = [];
                let movies = [];

                response.results.forEach(entry => personsIDs.push(entry.id));
                personsIDs.forEach(id => {
                    dispatch(setLoader('Loading...'));
                    fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}`)
                        .then(response => response.json())
                        .then(response => {
                            if (type === 'director') {
                                response.crew.map((movie) => {
                                    if (movie.job === 'Director') {
                                        dispatch(setLoader(false));
                                        return movies.push(movie);
                                    }
                                });
                            } else {
                                response.cast.map((movie) => {
                                    dispatch(setLoader(false));
                                    return movies.push(movie);
                                });
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                });
                return movies;
            }
        })
        .then(movies => {
            dispatch(receiveMovies(movies));
            setTimeout(() => {
                movies.length ? dispatch(setLoader(false)) : dispatch(setLoader('No films found'));
            }, 500);
        })
        .catch(error => {
            dispatch(receiveMovies([]));
            console.log(error);
        });
};

export const getMoviesBySameDirector = (id, selectedId) => dispatch => {
    dispatch(setLoader('Loading...'));
    if (id) {
        return fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}`,
            {method: 'GET'})
            .then(response => response.json())
            .then(result => {
                let movies = [];

                for (let i = 0; i < result.crew.length; i++) {
                    if (result.crew[i].job === 'Director') {
                        selectedId !== result.crew[i].id ? movies.push(result.crew[i]) : i++;
                    }
                }

                dispatch(receiveMoviesBySameDirector(movies));
                dispatch(setLoader(false));
            })
            .catch((error) => {
                console.log(error);
            })
    } else {
        dispatch(setLoader(false));
    }
};

export const getCurrentMovie = id => dispatch => {
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`, {method: 'GET'})
        .then(response => response.json())
        .then(movie => {
            dispatch(receiveCurrentMovie(movie));
            dispatch(getCastAndDirector(movie.id));
        })
        .catch(error => {
            console.log(error);
            dispatch(setLoader(error.message));
        });
};

export const getCastAndDirector = selectedId => dispatch => {
    return fetch(`https://api.themoviedb.org/3/movie/${selectedId}/credits?api_key=${API_KEY}`, {method: 'GET'})
        .then(response => response.json())
        .then(response => {
            let cast = [];
            let directors = [];
            let receiveDirID = false;

            response.crew.forEach(entry => {
                if (entry.job === 'Director') {
                    if (!receiveDirID) {
                        dispatch(getMoviesBySameDirector(entry.id, selectedId));
                        receiveDirID = true;
                    }
                    directors.push(entry.name);
                }
            });
            response.cast.forEach(entry => {
                cast.push(entry.name);
            });
            dispatch(receiveCast(cast.join(', ')));
            dispatch(receiveDirector(directors.join(', ')));
            dispatch(setLoader(false));
        })
        .catch(error => {
            console.log(error);
        });
};
