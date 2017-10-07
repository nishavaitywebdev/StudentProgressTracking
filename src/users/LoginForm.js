/**
 * Created by nishavaity on 10/2/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
class LoginForm extends Component {

    submit = () => {
        this.context.router.push('/homepage');
    }

    render() {
        const _style = {
            position:'relative',
            marginTop: 100,
        }
        const alertDisplay = false;
        const alert = 'Invalid user';
        return(
            <div className="container">
                <div className="col-xs-4 col-xs-offset-4" style={_style}>
                    { alertDisplay &&
                    <div className="alert alert-danger">
                        {{alert}}
                    </div> }
                    <h1>Login</h1><br/>
                    <form onSubmit={this.submit}>
                        <input type="text"
                               name="username"
                               className="form-control"
                               placeholder="username"/><br/>
                        <input type="password"
                               name="password"
                               className="form-control"
                               placeholder="password"/><br/>
                        <input type="submit" className="btn btn-primary btn-block" value="Login" />
                    </form>
                    <a className="btn btn-success btn-block"
                       href="#/register">Register</a>
                </div>
            </div>
        );
    }
}

LoginForm.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default LoginForm