/**
 * Created by nishavaity on 10/11/17.
 */
import React, { Component } from 'react';
import { fetchGet } from 'utils/fetch';
import { addProject } from '../actions/ProjectActions';
import { addTeam } from '../actions/TeamActions';
import { getUsers } from '../actions/UserActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class NewProject extends Component {

    constructor(props) {
        super(props);
        this.props.getUsers();
    }
    createProject = () => {
        let projectDetails = {};
        projectDetails.ownedBy = this.props.user._id;
        projectDetails.instructor = this.refs.instructor.value;
        projectDetails.sponsor = this.refs.sponsor.value;
        projectDetails.preferredBy = [];
        projectDetails.state = "ACTIVE";
        projectDetails.slackChannel = (this.refs.slackChannel.value == null) ? "": this.refs.slackChannel.value;
        projectDetails.expectedResult = this.refs.expectedResult.value;
        projectDetails.teamSize = Number(this.refs.teamSize.value);
        projectDetails.term = this.refs.term.value;
        projectDetails.name = this.refs.projectName.value;
        projectDetails.topic = this.refs.topic.value;
        projectDetails.desc = this.refs.projectDesc.value;
        this.props.addProject(projectDetails);

        let team = {};
        team.ownedBy = Number(this.props.user._id);
        team.members = [];
        this.props.addTeam(team);
        //reset form fields
        this.refs.instructor.value = "";
        this.refs.sponsor.value = "";
        this.refs.slackChannel.value = "";
        this.refs.expectedResult.value = "";
        this.refs.teamSize.value = "";
        this.refs.term.value = "";
        this.refs.projectName.value = "";
        this.refs.topic.value = "";
        this.refs.projectDesc.value = "";
    };

    render(){
        if(this.props.users!=null){
            let facultyOptions = [];
            let sponsorOptions = [];
            const users = this.props.users;
            facultyOptions.push(<option key={"f"} value={null}>Select</option>);
            sponsorOptions.push(<option key={"s"} value={null}>Select</option>);
            Object.values(users).forEach(function(u) {
                if(u.role === 'FACULTY') {
                    facultyOptions.push(<option key={u._id} value={u._id}>{u.firstname} {u.lastname}</option>);
                } else if(u.role === 'SPONSOR') {
                    sponsorOptions.push(<option key={u._id} value={u._id}>{u.firstname} {u.lastname}</option>);
                }
            });
            return(
                <div>
                    <label className="form-control">Add Project</label>
                    <div className="form-group">
                        <label>Project Name</label>
                        <input type="text" className="form-control" ref="projectName"/>
                    </div>
                    <div className="form-group">
                        <label>Project Slack Channel</label>
                        <input type="text" className="form-control" ref="slackChannel"/>
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
                        <input type="number" className="form-control" ref="teamSize" />
                    </div>
                    <div className="form-group">
                        <label>Project Term</label>
                        <input type="text" className="form-control" ref="term" />
                    </div>
                    <div className="form-group">
                        <label>Project Topic</label>
                        <input type="text" className="form-control" ref="topic" />
                    </div>
                    <label>Project Faculty</label>
                    <select
                        ref="instructor"
                    >
                        { facultyOptions }
                    </select>
                    <br/>
                    <br/>
                    <label>Project Sponsor</label>
                    <select
                        ref="sponsor"
                    >
                        { sponsorOptions }
                    </select>
                    <br/>
                    <br/>
                    <a className="btn btn-primary btn-block"
                       onClick={this.createProject}>Add Project</a>
                </div>
            );
        } else return (<noscript />);
    }
}
function mapStateToProps(state){
    return {
        user: state.userReducer.loggedIn,
        users: state.userReducer.users,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({addProject: addProject, addTeam: addTeam, getUsers: getUsers}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(NewProject)