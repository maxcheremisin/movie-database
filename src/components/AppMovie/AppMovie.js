import React, {Component} from 'react';
import Header from '../Header/Header';
import SelectedMovie from '../SelectedMovie/SelectedMovie';
import SortBar from '../SortBar/SortBar';
import FoundMovies from '../FoundMovies/FoundMovies';
import Loader from '../Loader/Loader';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

class AppMovie extends Component {

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.title !== prevProps.match.params.title) {
            this.props.onGetCurrentMovie(this.props.match.params.title);
        }
    }

    componentWillMount() {
        this.props.onSetLoader('Loading...');
        this.props.onGetGenres();
        this.props.onGetCurrentMovie(this.props.match.params.title);
    }

    componentWillUnmount() {
        this.props.onSetLoader('No films found');
    }

    render() {
        const {
            history,
            loading,
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
                        <SortBar director={director} />
                    }
                />

                {loading ? (
                    <Loader loadingMessage={loading} />
                ) : (
                    <FoundMovies
                        movies={moviesBySameDirector}
                        genres={genres}
                        history={history} />
                )}
            </div>
        )
    }
}

export default AppMovie;