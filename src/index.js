import React from 'react';
import ReactDOM from 'react-dom';
// import App from 'main/App';
import MainApp from 'main/MainApp';
import LoginForm from '../src/users/LoginForm';
import Register from '../src/users/Register';
import Logout from '../src/users/Logout';
import HomePage from '../src/projects/HomePage';
import Profile from '../src/users/Profile';
import ProfileView from '../src/users/ProfileView';
import ProjectDetail from '../src/projects/ProjectDetail';
import NewProject from '../src/projects/NewProject';
import EditProject from '../src/projects/EditProject';
import ProjectPreference from '../src/projects/ProjectPreference';
import { Router, Route, hashHistory, Redirect } from 'react-router';

const Paths = (
<Router history={hashHistory}>
    <Route path="/App" component={MainApp}>
        <Route path="/loginform" component={LoginForm}/>
        <Route path="/signup" component={Register}/>
        <Route path="/logout" component={Logout} />
        <Route path="/profile" component={Profile}/>
        <Route path="/profileview/:id" component={ProfileView}/>
        <Route path="/homepage" component={HomePage}/>
        <Route path="/projectpreference" component={ProjectPreference}/>
        <Route path="/createproject" component={NewProject}/>
        <Route path="/editproject/:id" component={EditProject}/>
        <Route path="/project/:id" component={ProjectDetail}/>
        <Route path="/" component={LoginForm} />
    </Route>
    <Redirect from="/_=_" to="/" />
</Router>
);
ReactDOM.render(Paths,
    document.getElementById('main'));