import React, {Component} from 'react';
import {Movie} from "../Movie/Movie";
import {Utils} from '../../utils/Utils';
import './FoundMovies.less';

export class FoundMovies extends Component {

    componentWillMount() {
        this.props.movies.sort(Utils.sortByDate);
    }

    componentDidUpdate() {
        this.props.movies.sort(Utils.sortByDate);
    }

    render() {
        const {
            history,
            movies,
            genres,
        } = this.props;

        return (
            <div className="foundMovies page__main">
                {movies.map((movie, index) => {
                    return (
                        <Movie
                            movie={movie}
                            genres={genres}
                            key={index}
                            history={history}
                        />
                    )
                })}
            </div>
        )
    }
}
