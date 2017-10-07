import React from 'react';
import ReactDOM from 'react-dom';
import App from 'main/App';
import LoginForm from '../src/users/LoginForm';
import HomePage from '../src/projects/HomePage';
import ProjectDetail from '../src/projects/ProjectDetail';
import { Router, Route, hashHistory, Redirect } from 'react-router';

console.log("Here in index.js");
const Paths = (
<Router history={hashHistory}>
    <Route path="/App" component={App}>
        <Route path="/loginform" component={LoginForm}/>
        <Route path="/homepage" component={HomePage}/>
        <Route path="/project/:id" component={ProjectDetail}/>
        <Route path="/" component={LoginForm} />
    </Route>
    <Redirect from="/_=_" to="/" />
</Router>
);
ReactDOM.render(Paths,
    document.getElementById('main'));