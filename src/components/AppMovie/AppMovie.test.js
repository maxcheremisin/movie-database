import React from 'react';
import {mount} from 'enzyme';

import {AppMovie} from '../AppMovie/AppMovie';
import {Header} from '../Header/Header';
import {SelectedMovie} from '../SelectedMovie/SelectedMovie';
import {SortBar} from '../SortBar/SortBar';
import {FoundMovies} from '../FoundMovies/FoundMovies';
import {Movie} from "../Movie/Movie";

describe('testing component AppMovie', () => {
    const movie = {
        "id": 680,
        "vote_average": 8.3,
        "title": "Pulp Fiction",
        "poster_path": "/dM2w364MScsjFf8pfMbaWUcWrR.jpg",
        "original_title": "Pulp Fiction",
        "genre_ids": [
            53,
            80
        ],
        "release_date": "1994-09-10"
    };

    const minProps = {
        onGetGenres: () => {},
        onSetLoader: () => {},
        onGetCurrentMovie: () => {},
        loading: false,
        genres: [{}],
        selectedMovie: movie,
        moviesBySameDirector: [movie, movie],
        match: {
            params: {
                title: ''
            }
        },
    };

    const wrapper = mount(<AppMovie {...minProps}/>);

    it('renders without exploding', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('renders correctly', () => {
        const components = [
            <Header/>,
            <SelectedMovie/>,
            <SortBar/>,
            <FoundMovies/>,
            <Movie/>
        ];

        expect(wrapper
            .containsAllMatchingElements(components)
        ).toEqual(true);
    });

    it('render true number of found movies', () => {
        expect(wrapper.find(Movie)).toHaveLength(2);
    })
});
