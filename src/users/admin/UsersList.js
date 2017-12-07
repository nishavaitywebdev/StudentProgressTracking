/**
 * Created by nishavaity on 11/8/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUsers, deleteUser } from '../../actions/UserActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class UsersList extends Component{
    constructor(props){
        super(props);
        this.props.getUsers();
    };
    deleteUserById = (id) => {
        this.props.deleteUser(id);
    };

    render(){
        if(this.props.users!=null) {
            const users = this.props.users;
            const loggedInUser = this.props.user;
            let rows = [];
            const style = {margin: '10px'};
            users.forEach(function (user) {
                if(loggedInUser._id !== user._id)
                    rows.push(
                        <li key={user._id} className="list-group-item">
                            <p>
                                <a style={style} href={`#/profileview/${user._id}`}>{user.firstname} {user.lastname} </a>
                                <a style={style}>{user.email} </a>
                                <a style={style}>{user.token}</a>
                                <a style={style} className="pull-right" key={user._id}
                                   onClick={() => this.deleteUserById(user._id)}>
                                    <span className="glyphicon glyphicon-remove"></span>
                                </a>
                            </p>
                        </li>
                    );
                }.bind(this));
            return(
                <div className="col-sm-12">
                    <div>
                        <ul className="list-group">
                            {
                                rows
                            }
                        </ul>
                    </div>
                </div>
            );
        } else return (<noscript />);
    }
}
UsersList.propTypes = {
    users: PropTypes.array,
};
function mapStateToProps(state){
    return {
        user: state.userReducer.loggedIn,
        users: state.userReducer.users,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({deleteUser: deleteUser,
    getUsers: getUsers}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersList)