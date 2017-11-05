import React, {Component} from 'react';
import {Header} from '../Header/Header';
import {SearchBar} from '../SearchBar/SearchBar';
import {SortBar} from '../SortBar/SortBar';
import {FoundMovies} from '../FoundMovies/FoundMovies';
import {Utils}from '../../utils/Utils';

export class AppSearch extends Component {

    componentWillMount() {
        this.props.onGetGenres();
        this.props.match.params.query ?
            this.props.match.params.query.length > 2 ?
                this.props.onGetMovies(
                    this.props.searchType,
                    this.props.match.params.query
                ) :
                this.props.onSetLoadingMessage('Minimum of 3 characters required') :
            false;
    }

    componentWillUnmount() {
        this.props.onResetStore();
    }

    onSearchSubmit(history, event) {
        event.preventDefault();

        let type = this.props.searchType;
        let query = this.props.searchInput || this.props.match.params.query;

        if (!query) {
            this.props.onSetLoadingMessage('Please enter search query');
            return false;
        } else if (query.length < 3) {
            this.props.onSetLoadingMessage('Minimum of 3 characters required');
            return false;
        } else {
            history.location.pathname !== ('/search/' + query) &&
            history.push(/search/ + query);
            this.props.onGetMovies(type, query);
        }
    }

    onSearchTypeButton(type, event) {
        let buttons = document.getElementsByClassName('js-filter-button');

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('searchBar__button--active');
        }
        event.target.classList.add('searchBar__button--active');
        this.props.onSearchFilter(type);
    }

    onSortButton(event) {
        let buttons = document.getElementsByClassName('js-sort-button');

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('sort__button--active');
        }
        event.target.classList.add('sort__button--active');

        event.target.getAttribute('data-name') === "date" ?
            this.props.onSortMovies(this.props.movies.sort(Utils.sortByDate)) :
            this.props.onSortMovies(this.props.movies.sort(Utils.sortByRating));
    }

    render() {
        const {
            history,
            onSearchInput,
            match,
            movies,
            genres,
            loading,
            loadingMessage,
            searchInput
        } = this.props;

        return (
            <div>
                <Header
                    headerElement={
                        <SearchBar
                            value={match.params.query || searchInput}
                            searchByDirector={this.onSearchTypeButton.bind(this, 'director')}
                            searchByTitle={this.onSearchTypeButton.bind(this, 'title')}
                            searchByActor={this.onSearchTypeButton.bind(this, 'actor')}
                            onSearch={this.onSearchSubmit.bind(this, history)}
                            onSearchInput={onSearchInput}
                        />
                    }

                    headerSubElement={
                        <SortBar
                            onSortButton={this.onSortButton.bind(this)}
                            movies={movies}
                        />
                    }
                />

                <FoundMovies
                    movies={movies}
                    genres={genres}
                    history={history}
                    loading={loading}
                    loadingMessage={loadingMessage}
                />
            </div>
        )
    }
}
