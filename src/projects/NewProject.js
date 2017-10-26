/**
 * Created by nishavaity on 10/11/17.
 */
import React, { Component } from 'react';
import { fetchGet } from 'utils/fetch';
import { addProject } from '../actions/ProjectActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class NewProject extends Component {

    createProject = (event) => {
        event.preventDefault();
        const project = {
            name: this.refs.projectName.value,
            desc: this.refs.projectDesc.value,
        };
        this.props.dispatch(addProject(project));

        //
        // fetchPost('createProject', project).then(response => {
        //     this.props.router.push("/");
        // });
    }

    render(){
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
                <a className="btn btn-primary btn-block"
                   onClick={this.createProject}>Submit</a>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(addProject, dispatch) }
}
export default connect(mapDispatchToProps)(NewProject)