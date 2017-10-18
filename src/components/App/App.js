import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConnectedAppSearch} from '../../containers/container';
import {ConnectedAppMovie} from '../../containers/container';
import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';
import store from '../../store/store';

const App = () => (
    <div>
        <Provider store={store}>
            <Router>
                <Switch>
                    <Redirect exact from="/" to="/search"/>
                    <Route path="/film/:title" component={ConnectedAppMovie}/>
                    <Route path="/search/:query" component={ConnectedAppSearch}/>
                    <Route path="/search" component={ConnectedAppSearch}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </Router>
        </Provider>
        <Footer/>
    </div>
);

export default App;
