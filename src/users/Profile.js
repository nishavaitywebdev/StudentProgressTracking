/**
 * Created by nishavaity on 10/2/17.
 */
import React, { Component } from 'react';
import { updateUser } from '../actions/UserActions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGet } from 'utils/fetch';

class Profile extends Component{
    constructor(props) {
        super(props);
    }
    handleChange = (event) => {
        event.preventDefault();
        const key = Number(event.target.id);
        let user = this.props.user;
        let coursesCompleted = user.coursesCompleted;
        if(coursesCompleted.includes(key))
            user.coursesCompleted.splice(coursesCompleted.indexOf(key), 1);
        else
            user.coursesCompleted.push(key);
        const opts = {
            headers: {
            'Content-Type': 'application/json',
            },
            method: 'PUT',
            credentials: 'same-origin',
            body: JSON.stringify(user),
        };
        this.props.updateUser(opts);
        this.forceUpdate();
    };
    submitChanges = (event) => {
        event.preventDefault();
        let user = this.props.user;
        user.username = this.refs.username.value;
        user.email = this.refs.email.value;
        user.firstname = this.refs.firstname.value;
        user.lastname = this.refs.lastname.value;
        user.aboutMyself = this.refs.aboutMyself.value;
        const opts = {
            headers: {
            'Content-Type': 'application/json',
            },
            method: 'PUT',
            credentials: 'same-origin',
            body: JSON.stringify(user),
        };
        this.props.updateUser(opts);
        this.forceUpdate();
    };
    render(){
        const user = this.props.user;
        const courses = this.props.courses;
        let { username, firstname, lastname, email, aboutMyself, coursesCompleted, role } = user;
        let courseValues = [];
        Object.entries(courses).forEach( ([key, value]) => {
            if(coursesCompleted.includes(key)) {
                courseValues.push(
                    <div>
                        <label>
                            <input key={key} id={key} name={value} type="checkbox" defaultChecked={true} onChange={this.handleChange}/>
                             {value}
                        </label>
                    </div>
                );
            }
            else {
                courseValues.push(
                    <div>
                        <label>
                            <input key={key} id={key} name={value} type="checkbox" defaultChecked={false} onChange={this.handleChange}/>
                             {value}
                        </label>
                    </div>
                );
            }
        }, this);
        return(
            <div className="container">
                <form onSubmit={this.submitChanges}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" defaultValue={username} className="form-control" ref="username" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" defaultValue={email} className="form-control" ref="email" placeholder="email Id" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="first-name">First Name</label>
                        <input type="text" defaultValue={firstname} className="form-control" ref="firstname" placeholder="First name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last-name">Last Name</label>
                        <input type="text" defaultValue={lastname} className="form-control" ref="lastname" placeholder="Last Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="about">About myself</label>
                        <input type="text" defaultValue={aboutMyself} className="form-control" ref="aboutMyself"
                               placeholder="About me"/>
                    </div>
                    { role == "student" &&
                        <div className="form-group">
                            <label htmlFor="courses">Courses Completed</label><br/>
                            {
                                courseValues
                            }
                        </div>
                    }
                    <input type="submit" className="btn btn-primary btn-block" value="Update" />
                </form>
                <a className="btn btn-primary btn-block"
                   href="#/homepage">Home</a>
                <a className="btn btn-success  btn-block"
                   href="#/loginform">Logout</a>
            </div>
        );
    }
}
Profile.propTypes = {
    user: PropTypes.object,
    courses: PropTypes.object,
};
function mapStateToProps(state){
    return {
        user: state.userReducer.loggedIn,
        courses: state.userReducer.courses,
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateUser: updateUser}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
