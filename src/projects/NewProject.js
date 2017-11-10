/**
 * Created by nishavaity on 10/11/17.
 */
import React, { Component } from 'react';
import { fetchGet } from 'utils/fetch';
import { addProject } from '../actions/ProjectActions';
import { addTeam } from '../actions/TeamActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class NewProject extends Component {

    createProject = () => {
        let projectDetails = {};
        projectDetails.ownedBy = Number(this.props.user.id);
        projectDetails.instructor = Number(this.refs.instructor.value);
        projectDetails.preferredBy = [];
        projectDetails.state = "ACTIVE";
        projectDetails.expectedResult = this.refs.expectedResult.value;
        projectDetails.teamSize = Number(this.refs.teamSize.value);
        projectDetails.term = Number(this.refs.term.value);
        projectDetails.name = this.refs.projectName.value;
        projectDetails.topic = this.refs.topic.value;
        projectDetails.desc = this.refs.projectDesc.value;
        this.props.addProject(projectDetails);

        let team = {};
        team.ownedBy = Number(this.props.user.id);
        team.members = [];
        this.props.addTeam(team);
        this.forceUpdate();
        //
        // fetchPost('createProject', project).then(response => {
        //     this.props.router.push("/");
        // });
    }

    render(){
        let facultyOptions = [];
        const users = this.props.users;
        Object.values(users).forEach(function(u) {
            if(u.role === 'faculty') {
                facultyOptions.push(<option key={u.id} value={u.id}>{u.firstname} {u.lastname}</option>);
            }
        });
        return(
            <div>
                <div className="form-group">
                    <label>Project Name</label>
                    <input type="text" className="form-control" ref="projectName"/>
                </div>
                <div className="form-group">
                    <label>Project Description</label>
                    <textarea type="text" className="form-control" ref="projectDesc" size="3"/>
                </div>
                <div className="form-group">
                    <label>Project Expected Results</label>
                    <textarea type="text" className="form-control" ref="expectedResult" size="3"/>
                </div>
                <div className="form-group">
                    <label>Project Team size</label>
                    <input type="text" className="form-control" ref="teamSize" />
                </div>
                <div className="form-group">
                    <label>Project Term</label>
                    <input type="text" className="form-control" ref="term" />
                </div>
                <div className="form-group">
                    <label>Project Topic</label>
                    <input type="text" className="form-control" ref="topic" />
                </div>
                <select
                    ref="instructor"
                >
                    { facultyOptions }
                </select>
                <br/>
                <a className="btn btn-primary btn-block"
                   onClick={this.createProject}>Submit</a><br/>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        user: state.userReducer.loggedIn,
        users: state.userReducer.userById,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({addProject: addProject, addTeam: addTeam}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(NewProject)