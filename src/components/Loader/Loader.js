import React from 'react';
import './Loader.less';

export const Loader = ({loadingMessage}) => (
    <div className="loader page__loader page__wrapper">
        <div className="loader__message">
            {loadingMessage ?
                loadingMessage :
                <div className="loader__spinner" />
            }
        </div>
    </div>
);
