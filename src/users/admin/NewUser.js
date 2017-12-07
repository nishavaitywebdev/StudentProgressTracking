/**
 * Created by nishavaity on 11/8/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewUser extends Component{
    createUser = () => {
        const user = {
            firstname: this.refs.firstname.value,
            lastname: this.refs.lastname.value,
            email: this.refs.email.value,
            role: this.refs.role.value,
            username: "",
            url: "",
            password:"",
            aboutMyself: "", coursesCompleted: [], projectPreferences: []
        };
        this.props.onUserInput(user);
        //reset form fields
        this.refs.firstname.value = "";
        this.refs.lastname.value = "";
        this.refs.email.value = "";
        this.refs.role.value = "";
    }

    render(){
        return(
            <div>
                <label className="form-control">Add User</label>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" ref="firstname"/>
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" ref="lastname"/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" ref="email"/>
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <select ref="role" className="pull-right">
                        <option value="">Select a role</option>
                        <option value="STUDENT">Student</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="ADMIN">Admin</option>
                        <option value="SPONSOR">Sponsor</option>
                    </select>
                </div>
                <a className="btn btn-primary btn-block"
                   onClick={this.createUser}>Submit</a>
            </div>
        );
    }
}
NewUser.propTypes = {
    onUserInput: PropTypes.func,
};
export default NewUser;