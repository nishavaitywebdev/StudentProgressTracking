/**
 * Created by nishavaity on 10/2/17.
 */
import React, { Component } from 'react';
import { updateUser, getCourses, uploadFile } from '../actions/UserActions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGet } from 'utils/fetch';
import FileUpload from 'utils/FileUpload';

class Profile extends Component{
    constructor(props) {
        super(props);
        this.props.getCourses();
    };
    populatedCourseRows = (coursesCompleted) => {
        let courseValues = [];
        const style = {marginRight: '10px'};
        const courses = this.props.courses;
        courses.forEach((course) => {
            courseValues.push(
                <div>
                    <label>
                        <input key={course._id} id={course._id} name={course.name} type="checkbox"
                        checked={coursesCompleted.includes(course._id)}
                        onChange={this.handleChange} style={style}/>
                         {course.name}
                    </label>
                </div>
            );
        }, this);
        return courseValues;
    };
    handleChange = (event) => {
        event.preventDefault();
        const key = event.target.id;
        let user = this.props.user;
        let coursesCompleted = user.coursesCompleted;
        if(coursesCompleted.includes(key))
            user.coursesCompleted.splice(coursesCompleted.indexOf(key), 1);
        else
            user.coursesCompleted.push(key);
        this.props.updateUser(user);
        this.forceUpdate();
    };
    submitChanges = (event) => {
        event.preventDefault();
        let user = this.props.user;
        user.username = this.refs.username.value;
        user.email = this.refs.email.value;
        if(this.refs.password.value === this.refs.confirmpassword.value)
            user.password = this.refs.password.value;
        else
            this.alert = "Passwords do not match";
        user.firstname = this.refs.firstname.value;
        user.lastname = this.refs.lastname.value;
        user.aboutMyself = this.refs.aboutMyself.value;
        this.props.updateUser(user);
        this.props.router.push('/');
    };
    uploadFile = (formData) => {
        const url = "api/resumeUpload/"+this.props.user._id;
        this.props.uploadFile(url, formData);
        this.props.router.push('/');
    };
    alertShow = (alert) => {
        return(
            <div className="alert alert-danger">
                {alert}
            </div>
        );
    };

    render(){
        const user = this.props.user;
        const courses = this.props.courses;
        if(user != null && courses != null){
            let { username, firstname, lastname, email, aboutMyself, password, coursesCompleted, role } = user;
            let courseValues = this.populatedCourseRows(coursesCompleted);
//            let alert = null;
//            if(this.refs.password.value != this.refs.confirmpassword.value)
//                alert = "Passwords do not match";
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
                            <label htmlFor="password">New Password</label>
                            <input type="password" defaultValue={password} minLength="8" className="form-control" ref="password" placeholder="password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Confirm Password</label>
                            <input type="password" defaultValue={password} className="form-control" ref="confirmpassword" placeholder="password" />
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
                        { role == "STUDENT" &&
                            <div className="form-group">
                                <label htmlFor="courses">Courses Completed</label><br/>
                                {
                                    courseValues
                                }
                            </div>
                        }
                        <input type="submit" className="btn btn-primary btn-block" value="Update" />
                    </form>
                    <label htmlFor ="upload">Upload Resume</label>
                    <FileUpload onUserInput={this.uploadFile}/>
                    <a className="btn btn-primary btn-block"
                       href="#/homepage">Home</a>
                    <a className="btn btn-success  btn-block"
                       href="#/logout">Logout</a>
                </div>
            );
        } else return (<noscript />);
    }
}
Profile.contextTypes = {
    router: PropTypes.object,
};
Profile.propTypes = {
    user: PropTypes.object,
    courses: PropTypes.array,
};
function mapStateToProps(state){
    return {
        user: state.userReducer.loggedIn,
        courses: state.userReducer.courses,
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateUser: updateUser, getCourses: getCourses, uploadFile: uploadFile}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
