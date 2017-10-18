import React from 'react';
import './Movie.less';

const Movie = ({movie, genres, history}) => {

    let category = [];

    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < genres.length; i++) {
            if (movie.genre_ids[j] === genres[i].id) {
                category.push(genres[i].name);
            }
        }
    }

    return (
        <div className="movie"
             onClick={() => {
                 history.push(`/film/${movie.id}`);
                 window.scrollTo(0, 0);
             }}>
            <div className="movie__poster-container">
                <img className="movie__poster"
                     src={movie.poster_path ?
                         'https://image.tmdb.org/t/p/w500' + movie.poster_path
                         : require('../../images/no-poster.jpg')}
                     alt={"poster of " + movie.title}
                />
            </div>
            <div className="movie__info">
                <div className="movie__title">
                    {movie.title}
                </div>
                <div className="movie__category">
                    {category.join(', ')}
                </div>

                {movie.release_date &&
                <div className="movie__year">
                    {movie.release_date.split('-')[0]}
                </div>
                }
            </div>
        </div>
    )
};

export default Movie;