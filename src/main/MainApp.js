/**
 * Created by nishavaity on 10/20/17.
 */
import React, { Component } from 'react';
import App from './App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();
const store = createStore(reducer, applyMiddleware(ReduxThunk, loggerMiddleware));

export default class MainApp extends Component {
    render() {
        return(
            <Provider store={store}>
                <App children={this.props.children}/>
            </Provider>
        );
    }
}
