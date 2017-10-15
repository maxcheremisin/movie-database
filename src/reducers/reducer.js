import * as types from '../constants/ActionTypes';

const initialState = {
    movies: [],
    cast: '',
    director: '',
    selectedMovie: {},
    moviesBySameDirector: [],
    searchInput: '',
    searchType: 'director',
    loading: 'No films found',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.ENTER_SEARCH_VALUE:
            return {
                ...state,
                searchInput: action.payload,
            };
        case types.SWITCH_SEARCH_TYPE:
            return {
                ...state,
                searchType: action.payload,
            };
        case types.SWITCH_SORTING_TYPE:
            return {
                ...state,
                movies: action.payload,
            };
        case types.RECEIVE_MOVIES:
            return {
                ...state,
                movies: action.payload,
            };
        case types.RECEIVE_CAST:
            return {
                ...state,
                cast: action.payload,
            };
        case types.RECEIVE_DIRECTOR:
            return {
                ...state,
                director: action.payload,
            };
        case types.RECEIVE_MOVIES_BY_DIRECTOR:
            return {
                ...state,
                moviesBySameDirector: action.payload,
            };
        case types.RECEIVE_CURRENT_MOVIE:
            return {
                ...state,
                selectedMovie: action.payload,
            };
        case types.SORT_MOVIES:
            return {
                ...state,
                movies: action.payload,
            };
        case types.EDIT_LOADER_MESSAGE:
            return {
                ...state,
                loading: action.payload,
            };
        case types.RESET_STORE:
            return initialState;

        default:
            return state;
    }
};
