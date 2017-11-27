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
import { loadState, savedState } from './localStorage';

const persistedState = loadState();
let store = null;
if (process.env.NODE_ENV !== 'production') {
    const loggerMiddleware = createLogger();
    store = createStore(reducer, persistedState, applyMiddleware(ReduxThunk, loggerMiddleware));
} else {
    store = createStore(reducer, persistedState, applyMiddleware(ReduxThunk));
}

store.subscribe(() => {
    savedState(store.getState());
});

export default class MainApp extends Component {
    render() {
        return(
            <Provider store={store}>
                <App children={this.props.children}/>
            </Provider>
        );
    }
}
