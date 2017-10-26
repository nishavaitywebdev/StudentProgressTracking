/**
 * Created by nishavaity on 10/7/17.
 */
import React, { Component } from 'react';
import { fetchGet } from 'utils/fetch';
import { connect } from 'react-redux';
import AddNewTeam from '../teams/AddNewTeam';

class ProjectDetail extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        // fetchGet(`/project/${this.props.params.id}`)
        //     .then(response => {
        //         if (response.status == 200) {
        //             this.data = response.data;
        //         }
        //     })
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
        return(
            <div className="container">
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
                    <ol className="comment-list">
                        <li className="comment">
                            <article className="comment-body">
                                <div className="comment-content">
                                    {/*<p>{{userReview.comment}}</p>*/}
                                </div>
                            </article>
                        </li>
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
    }
}
export default connect(mapStateToProps)(ProjectDetail)