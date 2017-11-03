import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../actions/actions';
import {API_KEY} from '../config';

const mockStore = configureMockStore([thunk]);

describe('async actions', () => {
    let store;

    beforeEach(() => store = mockStore());
    afterEach(fetchMock.restore);

    it('fetch movies', () => {

        const response = {
            "total_results": 1,
            "total_pages": 1,
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
        fetchMock.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&page=1`, response);

        return store.dispatch(actions.getMovies(type, query))
            .then(() => {
                expect(fetchMock
                    .called(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`))
                    .toBe(true);
                expect(fetchMock
                    .called(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&page=1`))
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

    it('fetch genres', () => {
        const response = {
            "genres": [
                {
                    "id": 28,
                    "name": "Action"
                },
                {
                    "id": 12,
                    "name": "Adventure"
                }
            ]
        };

        fetchMock.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`, response);

        return store.dispatch(actions.getGenres())
            .then(() => {
                expect(fetchMock
                    .called(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`))
                    .toBe(true);
                expect(store.getActions())
                    .toEqual([
                        actions.receiveGenres(response.genres)
                    ])
            })
    });

    it('fetch selected movie', () => {
        const movie = {
            id: 68718,
            title: "Django Unchained"
        };
        const castAndCrew = {
            "cast": [
                {
                    "character": "Django",
                    "id": 134,
                    "name": "Jamie Foxx",
                },
                {
                    "character": "Dr. King Schultz",
                    "id": 27319,
                    "name": "Christoph Waltz",
                    "order": 1,
                }
            ],
            "crew": [
                {
                    "department": "Directing",
                    "id": 138,
                    "job": "Director",
                    "name": "Quentin Tarantino",
                },

                {
                    "department": "Production",
                    "id": 1003189,
                    "job": "Producer",
                    "name": "Pilar Savone",
                }
            ]
        };
        const id = 68718;

        fetchMock.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`, movie);
        fetchMock.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`, castAndCrew);

        return store.dispatch(actions.getCurrentMovie(id))
            .then(() => {
                expect(fetchMock
                    .called(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`))
                    .toBe(true);
                expect(fetchMock
                    .called(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`))
                    .toBe(true);
                expect(store.getActions())
                    .toEqual([
                        actions.receiveCurrentMovie(movie),
                    ])
            })
    });

    it('fetch cast and director of selected movie', () => {
        const movie = {
            id: 68718,
            title: "Django Unchained",
            "cast": [
                {
                    "character": "Django",
                    "id": 134,
                    "name": "Jamie Foxx",
                },
                {
                    "character": "Dr. King Schultz",
                    "id": 27319,
                    "name": "Christoph Waltz",
                    "order": 1,
                }
            ],
            "crew": [
                {
                    "department": "Directing",
                    "id": 138,
                    "job": "Director",
                    "name": "Quentin Tarantino",
                },

                {
                    "department": "Production",
                    "id": 1003189,
                    "job": "Producer",
                    "name": "Pilar Savone",
                }
            ],
        };
        const moviesBySameDirector = {
            "crew": [{
                "department": "Director",
                "original_title": "Four Rooms",
                "job": "Director",
            }],
            "id": 138
        };
        const movieId = 68718;
        const directorId = 138;

        fetchMock.get(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`,
            movie
        );
        fetchMock.get(
            `https://api.themoviedb.org/3/person/${directorId}/movie_credits?api_key=${API_KEY}`,
            moviesBySameDirector
        );

        return store.dispatch(actions.getCastAndDirector(movieId))
            .then(() => {
                expect(fetchMock
                    .called(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`))
                    .toBe(true);
                expect(fetchMock
                    .called(`https://api.themoviedb.org/3/person/${directorId}/movie_credits?api_key=${API_KEY}`))
                    .toBe(true);
                expect(store.getActions())
                    .toEqual([
                        actions.setLoader('Loading...'),
                        actions.receiveCast("Jamie Foxx, Christoph Waltz"),
                        actions.receiveDirector("Quentin Tarantino"),
                        actions.setLoader(false),
                    ])
            })
    });

});
