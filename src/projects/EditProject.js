/**
 * Created by nishavaity on 10/14/17.
 */
import React, { Component } from 'react';
import { editProject, getProjectDetails } from '../actions/ProjectActions';
import { getUsers } from '../actions/UserActions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class EditProject extends Component {
    updateProject = () => {
        let projectDetails = this.props.project;
        projectDetails.name = this.refs.projectName.value;
        projectDetails.desc = this.refs.projectDesc.value;
        projectDetails.expectedResult = this.refs.expectedResult.value;
        projectDetails.instructor = this.refs.instructor.value;
        this.props.editProject(projectDetails);
        this.props.router.push("/");
    }
    constructor(props) {
        super(props);
        this.props.getProjectDetails(Number(this.props.params.id));
        this.props.getUsers();
    }
    render(){
        if(this.props.users!=null && this.props.project!=null){
            const users = this.props.users;
            const projectDetails = this.props.project;
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
        } else return (<noscript />);
    }
}

EditProject.contextTypes = {
    router: PropTypes.object,
};
function mapStateToProps(state){
    return {
        user: state.userReducer.loggedIn,
        project: state.projectReducer.project,
        users: state.userReducer.users,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({editProject: editProject,
     getProjectDetails: getProjectDetails, getUsers: getUsers}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProject)