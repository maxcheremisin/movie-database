import React from 'react';
import {Link} from 'react-router-dom';
import './SelectedMovie.less';

const SelectedMovie = ({movie, cast, director}) => {
    let color;

    if (movie.vote_average >= 8) {
        color = '#00de74';
    } else if (movie.vote_average >= 5) {
        color = 'orange';
    } else if (movie.vote_average >= 2) {
        color = 'red';
    } else {
        color = 'white';
    }

    const ratingStyle = {
        color: color,
        borderColor: color
    };

    let genres = [];
    if (movie.genres) {
        movie.genres.forEach(entry => {
            genres.push(entry.name);
        });
    }

    return (movie.title ?
            <div className="selectedMovie page__selectedMovie page__wrapper">
                <div className="selectedMovie__poster-container">
                    <img className="selectedMovie__poster"
                         src={movie.poster_path ?
                             'https://image.tmdb.org/t/p/w500' + movie.poster_path
                             : require('../../images/no-poster.jpg')}
                         alt={"poster of " + movie.title}
                    />
                </div>

                <div className="selectedMovie__info">
                    <div className="selectedMovie__infoHeader">
                        <div className="selectedMovie__title">
                            {movie.title}
                        </div>
                        {movie.vote_average > 0 &&
                        <div className="selectedMovie__rating"
                             style={ratingStyle}>
                            <div className="selectedMovie__ratingCounter">
                                {movie.vote_average}
                            </div>
                        </div>
                        }
                    </div>
                    <div className="selectedMovie__category">
                        {genres.join(', ')}
                    </div>
                    <div className="selectedMovie__year-runtime">
                        {movie.release_date &&
                            <span className="selectedMovie__year-runtime--year">
                                {movie.release_date.split('-')[0]}
                            </span>
                        }
                        {movie.runtime > 0 &&
                            <span className="selectedMovie__year-runtime--time">
                                {movie.runtime + ' min'}
                            </span>
                        }
                    </div>
                    <div className="selectedMovie__summary">
                        {movie.overview}
                    </div>
                    {director &&
                        <div className="selectedMovie__director">
                            Director: {director}
                        </div>
                    }
                    {cast &&
                        <div className="selectedMovie__cast">
                            Cast: {cast}
                        </div>
                    }
                </div>

                <Link to="/search">
                    <button className="selectedMovie__searchButton">
                        SEARCH
                    </button>
                </Link>
            </div>
            :
            <Link to="/search">
                <button className="selectedMovie__searchButton
                                    selectedMovie__searchButton--brokenLink">
                    SEARCH
                </button>
            </Link>
    );
};

export default SelectedMovie;