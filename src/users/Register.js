/**
 * Created by nishavaity on 10/2/17.
 */
import React, { Component } from 'react';
import { signUpUser } from '../actions/UserActions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Register extends Component {

    componentDidUpdate(){
        const user = this.props.user;
        if(user != null)
            this.context.router.push('/profile');
    }
    submit = (event) => {
        event.preventDefault();
        const opts = {
            email: this.refs.email.value,
            token: this.refs.token.value,
        };
        this.props.signUpUser(opts);
    }
    render() {
        return(
            <div className="container">
                <div className="col-xs-4 col-xs-offset-4">
                    { this.props.alert &&
                    <div className="alert alert-danger">
                        {this.props.alert}
                    </div> }
                    <h1>Register</h1><br/>
                    <form onSubmit={this.submit}>
                        <input type="text"
                               name="email"
                               className="form-control"
                               placeholder="email" ref="email"/><br/>
                        <input type="password"
                               name="token"
                               className="form-control"
                               placeholder="token" ref="token"/><br/>
                        <input type="submit" className="btn btn-primary btn-block" value="Sign Up" />
                    </form>
                </div>
            </div>
        );
    }
}

Register.contextTypes = {
    router: PropTypes.object.isRequired,
};
Register.propTypes = {
    user: PropTypes.object,
};
function mapStateToProps(state){
    return {
        user: state.userReducer.loggedIn,
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({signUpUser: signUpUser}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);