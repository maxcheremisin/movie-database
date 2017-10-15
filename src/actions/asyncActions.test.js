import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../actions/actions';

const mockStore = configureMockStore([thunk]);

describe('async actions', () => {
    let store;

    beforeEach(() => store = mockStore());

    afterEach(fetchMock.restore);

    it('should create an action to fetch movies', () => {

        const movie = [
            {
                title: 'test movie',
                summary: 'test'
            }
        ];

        let type = 'title=';
        let query = 'attack%20on%20titan';

        fetchMock.get('https://netflixroulette.net/api/api.php?' + type + query, movie);

        return store.dispatch(actions.getMovies(type, query))
            .then(() => {
                expect(fetchMock
                    .called('https://netflixroulette.net/api/api.php?' + type + query, {method: 'GET'}))
                    .toBe(true);
                expect(store.getActions()).toEqual([
                    actions.setLoader('Loading...'),
                    actions.receiveMovies([movie]),
                    actions.setLoader(false),
                ])
            })
    })
});