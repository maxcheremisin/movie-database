import React from 'react';
import Movie from "../Movie/Movie";
import './FoundMovies.less';

const FoundMovies = ({movies, history}) => (
    <div className="foundMovies page__main">
        {movies.map((movie, index) => {
            return (
                <Movie
                    movie={movie}
                    key={index}
                    history={history}
                />
            )
        })}
    </div>
);

export default FoundMovies;