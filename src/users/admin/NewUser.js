/**
 * Created by nishavaity on 11/8/17.
 */
import React, { Component } from 'react';
import { signUpUser } from '../../actions/UserActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class NewUser extends Component{
    createUser = () => {
        const user = {
            firstname: this.refs.firstname.value,
            lastname: this.refs.lastname.value,
            email: this.refs.email.value,
            role: this.refs.role.value,
            username: this.refs.firstname.value+""+this.refs.lastname.value,
            password:"Capstone",
            aboutMyself: "", coursesCompleted: [], projectPreferences: []
        };
        event.preventDefault();
        const opts = {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          credentials: 'same-origin',
          body: JSON.stringify(user),
        };
        this.props.dispatch(signUpUser(opts));
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
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                        <option value="admin">Admin</option>
                        <option value="sponsor">Sponsor</option>
                    </select>
                </div>
                <a className="btn btn-primary btn-block"
                   onClick={this.createUser}>Submit</a>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({signUpUser: signUpUser}, dispatch);
}
export default connect(mapDispatchToProps)(NewUser)