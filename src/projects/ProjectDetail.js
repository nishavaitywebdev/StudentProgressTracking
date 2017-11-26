/**
 * Created by nishavaity on 10/7/17.
 */
import React, { Component } from 'react';
import { fetchGet } from 'utils/fetch';
import { editProject, getProjectDetails } from '../actions/ProjectActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProjectStatus from './ProjectStatus';
import FileDownload from 'utils/FileDownload';

class ProjectDetail extends Component {
    constructor(props) {
        super(props);
        this.props.getProjectDetails(this.props.params.id);
//        this.props.getTeam(Number(this.props.params.id));
    }
    render() {
        if(this.props.project!=null) {
            const projectDetails = this.props.project;
            const url = 'api/descDownload/'+projectDetails._id;
//            const comments = this.props.comments;
//            const projectComments = Object.values(comments).filter(function (comment) {
//                return comment.projectId === projectDetails.id;
//            });
            return(
                <div className='container'>
                    <div className='form-group'>
                        <label>Project Name</label>
                        <input type='text' className='form-control'
                               value={projectDetails.name} disabled={true}/>
                    </div>
                    <div className='form-group'>
                        <label>Project State</label>
                        <input type='text' className='form-control'
                               value={projectDetails.state} disabled={true}/>
                    </div>
                    <div className='form-group'>
                        <label>Project Slack channel</label>
                        <input type='text' className='form-control' id=''
                                  disabled={true}
                           value={projectDetails.slackChannel}
                        />
                    </div>
                    <label className='form-control'>Download Details file</label>
                    <FileDownload url={url}/>
                    <div className='form-group'>
                        <label>Project Description</label>
                        <textarea type='text' className='form-control' id=''
                                  disabled={true} size='3'
                           value={projectDetails.desc}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Expected Results</label>
                        <textarea type='text' className='form-control' id=''
                                  disabled={true} size='3'
                                  value={projectDetails.expectedResult}
                        />
                    </div>
                    <hr/>
                </div>
            );
//                <div>
//                    <div className='row'>
//                        <h1 className='heading-color'>Follow Up</h1>
//                        <a type='button' className='btn btn-success'  href=''>Add Comment</a><br/>
//                    </div>
//                    <br/>
//                    <ol className='comment-list'>
//                        {
//                            Object.values(projectComments).map(function (comment) {
//                                return(
//                                    <li key={comment.id} className='comment'>
//                                        <article className='comment-body'>
//                                            <div className='comment-content'>
//                                                <p>{comment.commentText}</p>
//                                            </div>
//                                        </article>
//                                    </li>
//                                );
//                            })
//                        }
//                        <br/>
//                    </ol>
//                </div>
        } else return (<noscript />);
    }
}
function mapStateToProps(state){
    return {
        user: state.userReducer.loggedIn,
        project: state.projectReducer.project,
        comments: state.commentReducer.commentById,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getProjectDetails: getProjectDetails}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail)