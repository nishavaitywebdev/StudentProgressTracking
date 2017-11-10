/**
 * Created by nishavaity on 10/7/17.
 */
import React, { Component } from 'react';
import { fetchGet } from 'utils/fetch';
import { editProject } from '../actions/ProjectActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddNewTeam from '../teams/AddNewTeam';
import ProjectStatus from './ProjectStatus';

class ProjectDetail extends Component {
    constructor(props) {
        super(props);
    }
    getProjectDetails () {
        const projects = this.props.projects;
        let projectDetails = {};
        for(var i = 0; i < projects.length; i++){
            if(projects[i].id === Number(this.props.params.id)) {
                projectDetails = projects[i];
            }
        }
        return projectDetails;
    }
    render() {
        const projectDetails = this.getProjectDetails();
        const preferredBy = projectDetails.preferredBy;
        const users = this.props.users;
        const interestedStudents = preferredBy.map(function (id) {
            return(users[id]);
        });
        const owner = this.props.user.id === projectDetails.ownedBy;
        const comments = this.props.comments;
        const projectComments = Object.values(comments).filter(function (comment) {
            return comment.projectId === projectDetails.id;
        });
        return(
            <div className="container">
                <ProjectStatus onUserInput={this.props.editProject} project={projectDetails} notOwner={!owner} />
                <div className="form-group">
                    <label>Project Name</label>
                    <input type="text" className="form-control" id="website-name"
                           value={projectDetails.name} disabled={!owner}/>
                </div>
                <div className="form-group">
                    <label>Project Description</label>
                    <textarea type="text" className="form-control" id=""
                              disabled={!owner} size="3"
                       value={projectDetails.desc}
                    />
                </div>
                <div className="form-group">
                    <label>Expected Results</label>
                    <textarea type="text" className="form-control" id=""
                              disabled={!owner} size="3"
                              value={projectDetails.expectedResult}
                    />
                </div>
                <hr/>
                { owner &&
                    <div className="form-group">
                        <AddNewTeam project={projectDetails} interestedStudents={interestedStudents}/>
                    </div>
                }
                <hr/>
                <div>
                    <div className="row">
                        <h1 className="heading-color">Follow Up</h1>
                        <a type="button" className="btn btn-success"  href="">Add Comment</a><br/>
                    </div>
                    <br/>
                    <ol className="comment-list">
                        {
                            Object.values(projectComments).map(function (comment) {
                                return(
                                    <li key={comment.id} className="comment">
                                        <article className="comment-body">
                                            <div className="comment-content">
                                                <p>{comment.commentText}</p>
                                            </div>
                                        </article>
                                    </li>
                                );
                            })
                        }
                        <br/>
                    </ol>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        projects: state.projectReducer.projectById,
        user: state.userReducer.loggedIn,
        users: state.userReducer.userById,
        comments: state.commentReducer.commentById,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({editProject: editProject}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail)