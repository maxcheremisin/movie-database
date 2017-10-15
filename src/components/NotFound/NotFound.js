import React from 'react';
import {Link} from 'react-router-dom';
import './NotFound.less';

const NotFound = () => (
    <div className="notFound page__notFound">
        <div className="notFound__container">
            <div className="notFound__error">
                404
            </div>
            <Link to="/search">
                <button className="notFound__button">
                    GO TO MAIN PAGE
                </button>
            </Link>
        </div>
    </div>
);

export default NotFound;