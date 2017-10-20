import reducer from './reducer';
import * as actions from '../actions/actions';

describe('reducer', () => {

    const initialState = {
        movies: [],
        genres: [],
        cast: '',
        director: '',
        selectedMovie: {},
        moviesBySameDirector: [],
        searchInput: '',
        searchType: 'director',
        loading: 'No films found',
    };

    const state = Object.freeze(initialState);

    it('set search query', () => {
        const query = "tarantino";
        const newState = reducer(state, actions.searchInput(query));

        expect(newState.searchInput).toBe(query);
    });

    it('switch search type', () => {
        const type = "actor";
        const newState = reducer(state, actions.searchFilter(type));

        expect(newState.searchType).toBe(type);
    });

    it('receive movies', () => {
        const movies = [{ title: 'test movie' }, { title: 'test movie 2' }];
        const newState = reducer(state, actions.receiveMovies(movies));

        expect(newState.movies).toBe(movies);
    });

    it('receive genres', () => {
        const genres = [{ name: 'test genre' }, { name: 'test genre 2' }];
        const newState = reducer(state, actions.receiveGenres(genres));

        expect(newState.genres).toBe(genres);
    });

    it('receive cast', () => {
        const cast = 'actor 1, actor 2';
        const newState = reducer(state, actions.receiveCast(cast));

        expect(newState.cast).toBe(cast);
    });

    it('receive director', () => {
        const director = 'director 1, director 2';
        const newState = reducer(state, actions.receiveDirector(director));

        expect(newState.director).toBe(director);
    });

    it('receive movies by same director', () => {
        const movies = [{ title: 'test movie' }, { title: 'test movie 2' }];
        const newState = reducer(state, actions.receiveMoviesBySameDirector(movies));

        expect(newState.moviesBySameDirector).toBe(movies);
    });

    it('receive selected movie', () => {
        const movie = { title: 'test movie', id: "100500" };
        const newState = reducer(state, actions.receiveCurrentMovie(movie));

        expect(newState.selectedMovie).toBe(movie);
    });

    it('sort movies', () => {
        const movies = [{ title: 'test movie' }, { title: 'test movie 2' }];
        const newState = reducer(state, actions.sortMovies(movies));

        expect(newState.movies).toBe(movies);
    });

    it('set loader state', () => {
        const message = 'Loading...';
        const newState = reducer(state, actions.setLoader(message));

        expect(newState.loading).toBe(message);
    });

    it('reset store', () => {
        const newState = reducer(state, actions.resetStore());

        expect(newState).toEqual(initialState);
    });
});