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
    }
    render() {
        if(this.props.project!=null) {
            const projectDetails = this.props.project;
            const disableDownload = (projectDetails.url === null || projectDetails.url === undefined || projectDetails.url === "");
            const url = 'api/descDownload/'+projectDetails._id;
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
                    { !disableDownload &&
                        <div>
                            <label className='form-control'>Download Details file</label>
                            <FileDownload url={url}/>
                        </div>
                    }
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