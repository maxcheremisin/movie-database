import React, {Component} from 'react';
import Header from '../Header/Header';
import SelectedMovie from '../SelectedMovie/SelectedMovie';
import SortBar from '../SortBar/SortBar';
import FoundMovies from '../FoundMovies/FoundMovies';
import Loader from '../Loader/Loader';

class AppMovie extends Component {

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.title !== prevProps.match.params.title) {
            this.props.onGetCurrentMovie(this.props.match.params.title);
        }
    }

    componentWillMount() {
        this.props.onSetLoader('Loading...');
        this.props.onGetCurrentMovie(this.props.match.params.title);
    }

    componentWillUnmount() {
        this.props.onSetLoader('No films found');
    }

    render() {
        const {
            history,
            loading,
            selectedMovie,
            cast,
            director,
            moviesBySameDirector
        } = this.props;

        return (
            <div>
                <Header
                    headerElement={
                        <SelectedMovie movie={selectedMovie}
                                       cast={cast}
                                       director={director}
                        />
                    }

                    headerSubElement={
                        <SortBar director={director} />
                    }
                />

                {loading ? (
                    <Loader loadingMessage={loading} />
                ) : (
                    <FoundMovies
                        movies={moviesBySameDirector}
                        history={history} />
                )}
            </div>
        )
    }
}

export default AppMovie;