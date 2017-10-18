import React, {Component} from 'react';
import './SearchBar.less';

class SearchBar extends Component {
    render() {
        const {
            value,
            searchByDirector,
            searchByTitle,
            searchByActor,
            onSearch,
            onSearchInput
        } = this.props;

        return (
            <form onSubmit={onSearch} className="searchBar page__searchBar page__wrapper">
                <div className="searchBar__label">
                    FIND YOUR MOVIE
                </div>
                <div className="searchBar__inputContainer">
                    <input
                        defaultValue={value}
                        className="searchBar__input"
                        placeholder="ENTER SEARCH QUERY"
                        ref={(input) => {this.searchInput = input}}
                        onChange={() => onSearchInput(this.searchInput.value)}
                    />
                    <button className="searchBar__inputIcon"
                            type="submit">
                        ↲
                    </button>
                </div>
                <button className="searchBar__button
                                   searchBar__button--submit"
                        type="submit">
                    SEARCH
                </button>
                <div className="searchBar__filter">
                    <span className="searchBar__filterLabel">
                        SEARCH BY
                    </span>
                    <button
                        className="searchBar__button
                                   searchBar__button--director
                                   searchBar__button--active
                                   js-filter-button
                                   js-filter-button--director"
                        type="submit"
                        onClick={searchByDirector}>
                        DIRECTOR
                    </button>
                    <button
                        className="searchBar__button
                                   searchBar__button--title
                                   js-filter-button
                                   js-filter-button--title"
                        type="submit"
                        onClick={searchByTitle}>
                        TITLE
                    </button>
                    <button
                        className="searchBar__button
                                   searchBar__button--actor
                                   js-filter-button
                                   js-filter-button--actor"
                        onClick={searchByActor}>
                        ACTOR
                    </button>
                </div>
            </form>
        );
    }
}

export default SearchBar;
