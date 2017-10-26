/**
 * Created by nishavaity on 10/2/17.
 */
import React, { Component } from 'react';
import { getUser } from '../actions/UserActions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class LoginForm extends Component {
    componentDidUpdate(){
        if(this.props.user != null)
            this.context.router.push('/homepage');
        // else
        //     this.props.alert = 'Invalid';
    }
    submit = () => {
        const user = { username: this.refs.username.value, password: this.refs.password.value};
        this.props.getUser(user);
    }
    render() {
        return(
            <div className="container">
                <div className="col-xs-4 col-xs-offset-4">
                    { this.props.alert &&
                    <div className="alert alert-danger">
                        {this.props.alert}
                    </div> }
                    <h1>Login</h1><br/>
                    <form onSubmit={this.submit}>
                        <input type="text"
                               name="username"
                               className="form-control"
                               placeholder="username" ref="username"/><br/>
                        <input type="password"
                               name="password"
                               className="form-control"
                               placeholder="password" ref="password"/><br/>
                        <input type="submit" className="btn btn-primary btn-block" value="Login" />
                    </form>
                    <a className="btn btn-success btn-block"
                       href="#/signup">Register</a>
                </div>
            </div>
        );
    }
}

LoginForm.contextTypes = {
    router: PropTypes.object.isRequired,
};
LoginForm.propTypes = {
    user: PropTypes.object,
};
function mapStateToProps(state){
    return {
        user: state.userReducer.loggedIn,
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getUser: getUser}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)