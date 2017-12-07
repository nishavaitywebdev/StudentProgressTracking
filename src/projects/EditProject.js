/**
 * Created by nishavaity on 10/14/17.
 */
import React, { Component } from 'react';
import { editProject, getProjectDetails, uploadDescFile } from '../actions/ProjectActions';
import { getTeam } from '../actions/TeamActions';
import { getUsers } from '../actions/UserActions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddNewTeam from '../teams/AddNewTeam';
import FileUpload from 'utils/FileUpload';

class EditProject extends Component {
    updateProject = () => {
        const user = this.props.user;
        let projectDetails = this.props.project;
        projectDetails.name = this.refs.projectName.value;
        projectDetails.desc = this.refs.projectDesc.value;
        projectDetails.expectedResult = this.refs.expectedResult.value;
        if(user.role === 'ADMIN' || user.role === 'FACULTY'){
            projectDetails.state = this.refs.projectStatus.value;
            projectDetails.slackChannel = this.refs.slackChannel.value;
            projectDetails.teamSize = Number(this.refs.teamSize.value);
            projectDetails.term = this.refs.term.value;
            projectDetails.topic = this.refs.topic.value;
            if(user.role === 'ADMIN'){
                projectDetails.instructor = this.refs.instructor.value;
                projectDetails.sponsor = this.refs.sponsor.value;
            }
        }
        this.props.editProject(projectDetails);
        this.props.router.push('/');
    }
    constructor(props) {
        super(props);
        this.props.getProjectDetails(this.props.params.id);
        this.props.getTeam(this.props.params.id);
        this.props.getUsers();
    }
    uploadFile = (formData) => {
        const url = 'api/descUpload/'+this.props.project._id;
        this.props.uploadDescFile(url, formData);
    };
    getInterestedStudents = (preferredBy, users) => {
        return users.filter(user => preferredBy.includes(user._id));
    };
    render(){
        if(this.props.users!=null && this.props.project!=null){
            const users = this.props.users;
            let sponsorOptions = [];
            const projectDetails = this.props.project;
            const states = ['INACTIVE', 'PROPOSED', 'ACTIVE', 'IN-PROGRESS', 'COMPLETED'];
            const currState = projectDetails.state;
            let statusOptions = [];
            states.forEach(function(state) {
                if(states.indexOf(state) >= states.indexOf(currState)) {
                    statusOptions.push(<option key={states.indexOf(state)} value={state}>{state}</option>);
                }
            });
            let facultyOptions = [];
            users.forEach(function(u) {
                if(u.role === 'FACULTY') {
                    facultyOptions.push(<option key={u._id} value={u._id}>{u.firstname} {u.lastname}</option>);
                } else if(u.role === 'SPONSOR') {
                    sponsorOptions.push(<option key={u._id} value={u._id}>{u.firstname} {u.lastname}</option>);
                }
            });
            const user = this.props.user;
            const disableForSponsor = user.role === "SPONSOR";
            const preferredBy = projectDetails.preferredBy;
            const interestedStudents = this.getInterestedStudents(preferredBy, users);
            return(
                <div>
                    <label>Project State</label>
                    <br/>
                    <select disabled={disableForSponsor}
                        defaultValue={currState}
                        ref='projectStatus'
                    >
                        { statusOptions }
                    </select>
                    <br/><br/>
                    <label>Project Details File</label>
                    <FileUpload onUserInput={this.uploadFile}/>
                    <div className='form-group'>
                        <label>Project Name</label>
                        <input type='text' className='form-control' defaultValue={projectDetails.name} ref='projectName'/>
                    </div>
                    <div className='form-group'>
                        <label>Project Slack channel</label>
                        <input type='text' className='form-control' disabled={disableForSponsor} defaultValue={projectDetails.slackChannel} ref='slackChannel'/>
                    </div>
                    <div className='form-group'>
                        <label>Project Description</label>
                        <textarea type='text' className='form-control' defaultValue={projectDetails.desc} ref='projectDesc' size='3'/>
                    </div>
                    <div className='form-group'>
                        <label>Project Expected Results</label>
                        <textarea type='text' className='form-control' defaultValue={projectDetails.expectedResult} ref='expectedResult' size='3'/>
                    </div>
                    <div className="form-group">
                        <label>Project Team size</label>
                        <input type="number" className="form-control" defaultValue={projectDetails.teamSize} disabled={disableForSponsor} ref="teamSize" />
                    </div>
                    <div className="form-group">
                        <label>Project Term</label>
                        <input type="text" className="form-control" defaultValue={projectDetails.term} disabled={disableForSponsor} ref="term" />
                    </div>
                    <div className="form-group">
                        <label>Project Topic</label>
                        <input type="text" className="form-control" defaultValue={projectDetails.topic} disabled={disableForSponsor} ref="topic" />
                    </div>
                    {user.role === "ADMIN" &&
                        <select
                            ref='instructor'
                        >
                            { facultyOptions }
                        </select>
                    }
                    <br/>
                    <br/>
                    {user.role === "ADMIN" &&
                        <select
                            ref='sponsor'
                        >
                            { sponsorOptions }
                        </select>
                    }
                    <br/>
                    <hr/>
                    {(user.role === "ADMIN" || user.role === "FACULTY") &&
                        <div className='form-group'>
                            <AddNewTeam project={projectDetails} interestedStudents={interestedStudents}/>
                        </div>
                    }
                    <a className='btn btn-primary btn-block'
                       onClick={this.updateProject}>Edit Project</a>
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
    return bindActionCreators({editProject: editProject, getTeam: getTeam,
     getProjectDetails: getProjectDetails, getUsers: getUsers, uploadDescFile: uploadDescFile}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProject)