import React, {Component} from 'react';
import {Movie} from "../Movie/Movie";
import {Utils} from '../../utils/Utils';
import './FoundMovies.less';

export class FoundMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedCount: 20
        };
    }

    componentWillMount() {
        this.props.movies.sort(Utils.sortByDate);
        window.addEventListener('scroll', () => {
            this.handleScroll()
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.movies !== this.props.movies) {
            this.props.movies.sort(Utils.sortByDate);
        }
    }

    handleScroll() {
        let clientHeight = document.documentElement.clientHeight;
        let leftoverHeight =
            document.documentElement.scrollHeight -
            document.documentElement.scrollTop;
        let scrollBottom = leftoverHeight - clientHeight;

        if (scrollBottom < 100) {
            this.loadMore();
        }
    }

    loadMore() {
        if (this.state.loadedCount <= this.props.movies.length) {
            this.setState({loadedCount: this.state.loadedCount + 20});
        }
    }

    render() {
        const {
            history,
            movies,
            genres,
        } = this.props;

        return (
            <div className="foundMovies page__main">
                {movies
                    .slice(0, this.state.loadedCount)
                    .map((movie, index) => {
                        return (
                            <Movie
                                movie={movie}
                                genres={genres}
                                key={index}
                                history={history}
                            />
                        );
                    })}
            </div>
        )
    }
}
