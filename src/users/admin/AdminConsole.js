/**
 * Created by nishavaity on 11/8/17.
 */
import React, { Component } from 'react';
import NewUser from './NewUser';
import AddCourse from './AddCourse';
import EditCourse from './EditCourse';
import NewProject from '../../projects/NewProject';
import ProjectList from '../../projects/ProjectList';
import { addCourse, updateCourse, deleteCourse, getCourses, registerUser } from '../../actions/UserActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AdminConsole extends Component{
    constructor(props) {
        super(props);
        this.props.getCourses();
    };
    createUser = (user) => {
        event.preventDefault();
        const opts = {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          credentials: 'same-origin',
          body: JSON.stringify(user),
        };
        this.props.registerUser(opts);
    }
    createCourse = (course) => {
        event.preventDefault();
        this.props.addCourse(course);
    }
    editCourse = (course) => {
        event.preventDefault();
        this.props.updateCourse(course);
    }
    deleteCourse = (course) => {
        event.preventDefault();
        this.props.deleteCourse(course);
    }
    render(){
        const user = this.props.user;
        const courses = this.props.courses;
        if(user != null && courses != null){
            return(
                <div>
                    <NewUser onUserInput={this.createUser}/><br/><hr/>
                    <NewProject/><br/><hr/>
                    <ProjectList/><br/><hr/>
                    <AddCourse onUserInput={this.createCourse}/><br/><hr/>
                    <EditCourse courses={courses}
                    onUserInputEdit={this.editCourse} onUserInputDelete={this.deleteCourse} /><br/>
                    <a className="btn btn-primary btn-block" href="/api/backupDatabase">Download Database Backup file</a><br/><hr/>
                </div>
            );
        } else return (<noscript />);
    }
}
function mapStateToProps(state){
    return {
        user: state.userReducer.loggedIn,
        courses: state.userReducer.courses,
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({registerUser: registerUser,
    addCourse: addCourse, updateCourse: updateCourse,
    deleteCourse: deleteCourse, getCourses: getCourses}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminConsole)