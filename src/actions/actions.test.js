import {searchInput} from './actions';
import * as types from '../constants/ActionTypes';

describe('actions', () => {
    it('should create an action to set search query in store', () => {
        const searchValue = 'Quentin Tarantino';
        const searchInputAction = searchInput(searchValue);

        expect(searchInputAction.type).toBe(types.ENTER_SEARCH_VALUE);
        expect(typeof searchInputAction.payload).toBe("string");
        expect(searchInputAction.payload).toBe(searchValue);
    })
});