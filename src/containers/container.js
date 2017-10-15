import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions/actions';
import AppSearch from '../components/AppSearch/AppSearch';
import AppMovie from '../components/AppMovie/AppMovie';

const mapStateToProps = state => ({
    state,
    store: state,
    movies: state.movies,
    cast: state.cast,
    director: state.director,
    selectedMovie: state.selectedMovie,
    moviesBySameDirector: state.moviesBySameDirector,
    searchInput: state.searchInput,
    searchType: state.searchType,
    loading: state.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onSearchInput: actions.searchInput,
    onSearchFilter: actions.searchFilter,
    onMoviesSorting: actions.moviesSorting,
    onSetLoader: actions.setLoader,
    onGetMovies: actions.getMovies,
    onSortMovies: actions.sortMovies,
    onGetCurrentMovie: actions.getCurrentMovie,
    onGetMoviesBySameDirector: actions.getMoviesBySameDirector,
    onResetStore: actions.resetStore,
}, dispatch);

export const ConnectedAppSearch =
    withRouter(connect(mapStateToProps, mapDispatchToProps)(AppSearch));

export const ConnectedAppMovie =
    withRouter(connect(mapStateToProps, mapDispatchToProps)(AppMovie));
