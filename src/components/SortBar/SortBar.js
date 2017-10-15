import React from 'react';
import './SortBar.less';

const SortBar = ({movies, director, onSortButton}) => (
    <div className="sort page__wrapper">
        {movies && movies.length > 0 &&
        <div className="sort__label sort__label--movies">
            {movies.length} movies found
        </div>
        }

        {director &&
        <div className="sort__label sort__label--director">
            Films by {director.split(',')[0]}
        </div>
        }

        {movies && movies.length > 1 &&
        <div className="sort__panel">
            Sort by
            <span className="sort__button
                                         sort__button--active
                                         js-sort-button"
                  data-name="date"
                  onClick={onSortButton}>
                            release date
                </span>
            <span className="sort__button
                                         js-sort-button"
                  data-name="rating"
                  onClick={onSortButton}>
                            rating
                </span>
        </div>
        }
    </div>
);

export default SortBar;