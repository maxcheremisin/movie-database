import React from 'react';
import './Header.less';

const Header = ({headerElement, headerSubElement}) => (
    <div className='header page__header'>
        <div className="header__shade">
            <div className="page__wrapper">
                <a href='https://www.themoviedb.org/'
                   className='header__link page__link'>
                    movieDB
                </a>
            </div>
            {headerElement}
            <div className="clearfix"/>
            <div className='header__bar'>
                {headerSubElement}
            </div>
        </div>
    </div>
);

export default Header;
