/**
 * Created by nishavaity on 10/2/17.
 */
import React, { Component } from 'react';
import { logoutUser } from '../actions/UserActions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Logout extends Component {
    componentWillMount() {
        this.props.dispatch(logoutUser());
        this.props.router.push('/loginform');
    }
    render() {
        return (
            <noscript />
        );
    }
}

Logout.propTypes = {
    router: PropTypes.object.isRequired,
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators({logoutUser: logoutUser}, dispatch);
}

export default connect(mapDispatchToProps)(Logout);
