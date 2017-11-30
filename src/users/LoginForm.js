/**
 * Created by nishavaity on 10/2/17.
 */
import React, { Component } from 'react';
import { signInUser } from '../actions/UserActions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class LoginForm extends Component {
    componentDidUpdate(){
        if(this.props.user != null)
            this.context.router.push('/homepage');
    }
    submit = (event) => {
        event.preventDefault();
        const opts = {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          credentials: 'same-origin',
          body: JSON.stringify({
            username: this.refs.username.value,
            password: this.refs.password.value
          }),
        };
        this.props.signInUser(opts);
    }
    render() {
        return(
            <div className="container">
                <div className="col-xs-4 col-xs-offset-4">
                    { this.props.alert === 'Invalid user' &&
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
    alert: PropTypes.string,
};
function mapStateToProps(state){
    return {
        user: state.userReducer.user,
        alert: state.userReducer.status,
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({signInUser: signInUser}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);