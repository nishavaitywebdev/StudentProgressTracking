/**
 * Created by nishavaity on 10/14/17.
 */
import React, { Component } from 'react';
import { editProject } from '../actions/ProjectActions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class EditProject extends Component {
    updateProject = () => {
        const projects = this.props.projects;
        const projectId = Number(this.props.params.id);
        let projectDetails = projects.filter(function(project) {
            return project.id === projectId;
        })[0];
        projectDetails.name = this.refs.projectName.value;
        projectDetails.desc = this.refs.projectDesc.value;
        projectDetails.expectedResult = this.refs.expectedResult.value;
        projectDetails.instructor = this.refs.instructor.value;
        this.props.editProject(projectDetails);

        //
        // fetchPost('editProject', project).then(response => {
        //     this.props.router.push("/");
        // });
    }
    render(){
        const projects = this.props.projects;
        const projectId = Number(this.props.params.id);
        const users = this.props.users;
        const projectDetails = projects.filter(function(project) {
            return project.id === projectId;
        })[0];
        console.log(projectDetails);
        const states = ["INACTIVE", "PROPOSED", "ACTIVE", "IN-PROGRESS", "COMPLETED"];
        const currState = projectDetails.state;
        let statusOptions = [];
        states.forEach(function(state) {
            if(states.indexOf(state) >= states.indexOf(currState)) {
                statusOptions.push(<option key={states.indexOf(state)} value={state}>{state}</option>);
            }
        });
        let facultyOptions = [];
        Object.values(users).forEach(function(u) {
            if(u.role === 'faculty') {
                facultyOptions.push(<option key={u.id} value={u.id}>{u.firstname} {u.lastname}</option>);
            }
        });
        return(
            <div>
                <label>Project State</label>
                <br/>
                <select
                    defaultValue={currState}
                    ref="projectStatus"
                >
                    { statusOptions }
                </select>
                <br/>
                <div className="form-group">
                    <label>Project Name</label>
                    <input type="text" className="form-control" defaultValue={projectDetails.name} ref="projectName"/>
                </div>
                <div className="form-group">
                    <label>Project Description</label>
                    <textarea type="text" className="form-control" defaultValue={projectDetails.desc} ref="projectDesc" size="3"/>
                </div>
                <div className="form-group">
                    <label>Project Expected Results</label>
                    <textarea type="text" className="form-control" defaultValue={projectDetails.expectedResult} ref="expectedResult" size="3"/>
                </div>
                <select
                    ref="instructor"
                >
                    { facultyOptions }
                </select>
                <br/>
                <a className="btn btn-primary btn-block"
                   onClick={this.updateProject}>Submit</a>
            </div>
        );
    }
}
EditProject.propTypes = {
    projects: PropTypes.array,
};
function mapStateToProps(state){
    return {
        projects: state.projectReducer.projectById,
        user: state.userReducer.loggedIn,
        users: state.userReducer.userById,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({editProject: editProject}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProject)