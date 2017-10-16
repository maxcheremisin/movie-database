import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../actions/actions';
import * as types from '../constants/ActionTypes';

const API_KEY = '948c7b577e3d4ab870fc7d3a70aefce4';
const mockStore = configureMockStore([thunk]);

describe('async actions', () => {
    let store;

    beforeEach(() => store = mockStore());
    afterEach(fetchMock.restore);

    it('fetch movies', () => {

        const response = {
            "results": [
                {
                    "id": 680,
                    "title": "Pulp Fiction",
                }
            ]
        };

        const type = 'title';
        const query = 'pulp%20fiction';

        fetchMock.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`, response);

        return store.dispatch(actions.getMovies(type, query))
            .then(() => {
                expect(fetchMock
                    .called(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`))
                    .toBe(true);
                expect(store.getActions())
                    .toEqual([
                        actions.setLoader('Loading...'),
                        actions.receiveMovies(response.results),
                    ])
            })
    });

    it('fetch movies by same director', () => {

        const response = {
            "crew": [{
                "department": "Director",
                "original_title": "Four Rooms",
                "job": "Director",
            }],
            "id": 138
        };

        const directorID = 138;
        const filmID = 333;

        fetchMock.get(`https://api.themoviedb.org/3/person/${directorID}/movie_credits?api_key=${API_KEY}`, response);

        return store.dispatch(actions.getMoviesBySameDirector(directorID, filmID))
            .then(() => {
                expect(fetchMock
                    .called(`https://api.themoviedb.org/3/person/${directorID}/movie_credits?api_key=${API_KEY}`))
                    .toBe(true);
                expect(store.getActions())
                    .toEqual([
                        actions.setLoader('Loading...'),
                        actions.receiveMoviesBySameDirector(response.crew),
                        actions.setLoader(false),
                    ])
            })
    });
});
