import * as types from '../constants/ActionTypes';

const initialState = {
    movies: [],
    genres: [],
    cast: '',
    director: '',
    selectedMovie: {},
    moviesBySameDirector: [],
    searchInput: '',
    searchType: 'director',
    loading: false,
    loadingMessage: 'No films found',
};

export const reducer = (state = initialState, action) => {
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
        case types.REQUEST_MOVIES:
            return {
                ...state,
                movies: [],
                loading: true,
            };
        case types.RECEIVE_MOVIES:
            return {
                ...state,
                movies: action.payload,
                loading: false,
                loadingMessage: action.payload.length ? null : 'No films found',
            };
        case types.RECEIVE_GENRES:
            return {
                ...state,
                genres: action.payload,
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
        case types.REQUEST_MOVIES_BY_DIRECTOR:
            return {
                ...state,
                moviesBySameDirector: [],
                loading: true,
            };
        case types.RECEIVE_MOVIES_BY_DIRECTOR:
            return {
                ...state,
                moviesBySameDirector: action.payload,
                loading: false,
                loadingMessage: action.payload.length ? null : 'There is no more',
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
                loadingMessage: action.payload,
            };
        case types.RESET_STORE:
            return initialState;
        default:
            return state;
    }
};
