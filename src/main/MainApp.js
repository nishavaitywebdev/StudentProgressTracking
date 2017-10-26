/**
 * Created by nishavaity on 10/20/17.
 */
import React, { Component } from 'react';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';

const store = createStore(reducer);

export default class MainApp extends Component {
    render() {
        return(
            <Provider store={store}>
                <App children={this.props.children}/>
            </Provider>
        );
    }
}
