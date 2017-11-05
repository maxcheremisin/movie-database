import React, {Component} from 'react';
import {Header} from '../Header/Header';
import {SelectedMovie} from '../SelectedMovie/SelectedMovie';
import {SortBar} from '../SortBar/SortBar';
import {FoundMovies} from '../FoundMovies/FoundMovies';

export class AppMovie extends Component {

    componentDidUpdate(prevProps) {
        if (this.props.match.params.title !== prevProps.match.params.title) {
            this.props.onGetCurrentMovie(this.props.match.params.title);
        }
    }

    componentWillMount() {
        this.props.onGetGenres();
        this.props.onGetCurrentMovie(this.props.match.params.title);
        this.props.onSetLoadingMessage(null);
    }

    componentWillUnmount() {
        this.props.onSetLoadingMessage('No films found');
    }

    render() {
        const {
            history,
            loading,
            loadingMessage,
            genres,
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
                                       history={history}
                        />
                    }

                    headerSubElement={
                        <SortBar director={director}/>
                    }
                />
                <FoundMovies
                    movies={moviesBySameDirector}
                    genres={genres}
                    history={history}
                    loading={loading}
                    loadingMessage={loadingMessage}
                />
            </div>
        )
    }
}
