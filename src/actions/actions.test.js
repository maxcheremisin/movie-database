import * as actions from './actions';
import * as types from '../constants/ActionTypes';

describe('actions', () => {
    it('set search query in store', () => {
        const searchValue = 'Quentin Tarantino';
        const searchInputAction = actions.searchInput(searchValue);

        expect(searchInputAction.type).toBe(types.ENTER_SEARCH_VALUE);
        expect(typeof searchInputAction.payload).toBe("string");
        expect(searchInputAction.payload).toBe(searchValue);
    });

    it('switch search filter', () => {
        const searchType = 'director';
        const searchFilterAction = actions.searchFilter(searchType);

        expect(searchFilterAction.type).toBe(types.SWITCH_SEARCH_TYPE);
        expect(typeof searchFilterAction.payload).toBe("string");
        expect(searchFilterAction.payload).toBe(searchType);
    });

    it('set loading message', () => {
        const message = 'Loading...';
        const setLoadingMessageAction = actions.setLoadingMessage(message);

        expect(setLoadingMessageAction.type).toBe(types.EDIT_LOADER_MESSAGE);
        expect(typeof setLoadingMessageAction.payload).toBe("string");
        expect(setLoadingMessageAction.payload).toBe(message);
    });

    it('reset store', () => {
        const resetStoreAction = actions.resetStore();

        expect(resetStoreAction.type).toBe(types.RESET_STORE);
    });

    it('sort movies', () => {
        const movies = [];
        const sortMoviesAction = actions.sortMovies(movies);

        expect(sortMoviesAction.type).toBe(types.SORT_MOVIES);
        expect(Array.isArray(sortMoviesAction.payload)).toBe(true);
        expect(sortMoviesAction.payload).toBe(movies);
    });

    it('request movies', () => {
        const receiveMoviesAction = actions.requestMovies();

        expect(receiveMoviesAction.type).toBe(types.REQUEST_MOVIES);
    });

    it('receive movies', () => {
        const movies = [];
        const receiveMoviesAction = actions.receiveMovies(movies);

        expect(receiveMoviesAction.type).toBe(types.RECEIVE_MOVIES);
        expect(Array.isArray(receiveMoviesAction.payload)).toBe(true);
        expect(receiveMoviesAction.payload).toBe(movies);
    });

    it('receive genres', () => {
        const genres = [];
        const receiveGenresAction = actions.receiveGenres(genres);

        expect(receiveGenresAction.type).toBe(types.RECEIVE_GENRES);
        expect(Array.isArray(receiveGenresAction.payload)).toBe(true);
        expect(receiveGenresAction.payload).toBe(genres);
    });

    it('receive cast', () => {
        const cast = [];
        const receiveCastAction = actions.receiveCast(cast);

        expect(receiveCastAction.type).toBe(types.RECEIVE_CAST);
        expect(Array.isArray(receiveCastAction.payload)).toBe(true);
        expect(receiveCastAction.payload).toBe(cast);
    });

    it('receive director', () => {
        const director = 'Tarantino';
        const receiveDirectorAction = actions.receiveDirector(director);

        expect(receiveDirectorAction.type).toBe(types.RECEIVE_DIRECTOR);
        expect(typeof receiveDirectorAction.payload).toBe("string");
        expect(receiveDirectorAction.payload).toBe(director);
    });

    it('request movies by same director', () => {
        const receiveMoviesAction = actions.requestMoviesBySameDirector();

        expect(receiveMoviesAction.type).toBe(types.REQUEST_MOVIES_BY_DIRECTOR);
    });

    it('receive movies by same director', () => {
        const movies = [];
        const receiveMoviesAction = actions.receiveMoviesBySameDirector(movies);

        expect(receiveMoviesAction.type).toBe(types.RECEIVE_MOVIES_BY_DIRECTOR);
        expect(Array.isArray(receiveMoviesAction.payload)).toBe(true);
        expect(receiveMoviesAction.payload).toBe(movies);
    });

    it('receive selected movie', () => {
        const movie = {};
        const receiveCurrentMovieAction = actions.receiveCurrentMovie(movie);

        expect(receiveCurrentMovieAction.type).toBe(types.RECEIVE_CURRENT_MOVIE);
        expect(receiveCurrentMovieAction.payload instanceof Object).toBe(true);
        expect(receiveCurrentMovieAction.payload).toBe(movie);
    });

});