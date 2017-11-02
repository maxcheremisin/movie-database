import React from 'react';
import {mount} from 'enzyme';

import {AppSearch} from '../AppSearch/AppSearch';
import {Header} from '../Header/Header';
import {SearchBar} from '../SearchBar/SearchBar';
import {SortBar} from '../SortBar/SortBar';
import {FoundMovies} from '../FoundMovies/FoundMovies';
import {Movie} from "../Movie/Movie";

describe('testing component AppSearch', () => {
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

    const props = {
        onGetGenres: () => {},
        loading: false,
        genres: [{}],
        movies: [movie, movie],
        match: {
            params: {
                query: ''
            }
        },
    };

    const wrapper = mount(<AppSearch {...props}/>);

    it('renders without exploding', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('renders correctly', () => {
        const components = [
            <Header/>,
            <SearchBar/>,
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
