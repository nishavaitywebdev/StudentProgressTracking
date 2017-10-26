/**
 * Created by nishavaity on 10/2/17.
 */
import React, { Component } from 'react';
import PropTypes from 'react';
import { fetchGet } from 'utils/fetch';

export default class Profile extends Component{

    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        const user = { id: 1, firstName: "Nisha",
            lastName: "Vaity", email: "Nisha@g.com", username: "Vaity", };

        const _style = {
            marginTop: 100,
        }
        // if (this.props.user) {
        let { username, firstName, lastName, email } = user;
        return(
            <div className="container" style={_style}>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" defaultValue={username} className="form-control" id="username" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" defaultValue={email} className="form-control" id="email" placeholder="email Id" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="first-name">First Name</label>
                        <input type="text" defaultValue={firstName} className="form-control" id="first-name" placeholder="First name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last-name">Last Name</label>
                        <input type="text" defaultValue={lastName} className="form-control" id="last-name" placeholder="Lats Name" />
                    </div>
                </form>
                <a className="btn btn-primary btn-block"
                   href="#/homepage">Home</a>
                <a className="btn btn-danger  btn-block">Delete</a>
                <a className="btn btn-warning  btn-block" //ng-show="user.role == 'ADMIN'"
                   >LogIn as Admin</a>
                <a className="btn btn-success  btn-block"
                   href="#/loginform">Logout</a>
            </div>
        );
    }
    // };
}
//
// Profile.propTypes = {
//     user: PropTypes.object,
// }
