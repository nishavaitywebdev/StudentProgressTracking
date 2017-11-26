/**
 * Created by nishavaity on 10/7/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjectList from '../projects/ProjectList';
import { connect } from 'react-redux';
import AdminConsole from '../users/admin/AdminConsole';
import LoginForm from '../users/LoginForm';

class HomePage extends Component {

    render() {
        if(this.props.user != null){
            if(this.props.user.role === 'ADMIN') return (<AdminConsole />);
            else return(<ProjectList />);
        } else return(<LoginForm/>);
    }
}

HomePage.propTypes = {
    user: PropTypes.object,
};
function mapStateToProps(state){
    return {
        user: state.userReducer.loggedIn,
    }
}
export default connect(mapStateToProps)(HomePage)