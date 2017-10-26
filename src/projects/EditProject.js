/**
 * Created by nishavaity on 10/14/17.
 */
import React, { Component } from 'react';
import { editProject } from '../actions/ProjectActions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class EditProject extends Component {
    componentDidMount() {
        const projects = this.props.projects;
        const projectId = this.props.params.id;
        let projectName = this.refs.projectName;
        let projectDesc = this.refs.projectDesc;
        projects.forEach(function(value) {
            if(value.id === Number(projectId)) {
                projectName.value = value.name;
                projectDesc.value = value.desc;
            }
        });
    }
    updateProject = (event) => {
        event.preventDefault();
        const project = {
            id: Number(this.props.params.id),
            name: this.refs.projectName.value,
            desc: this.refs.projectDesc.value,
        };
        this.props.editProject(project);

        //
        // fetchPost('editProject', project).then(response => {
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
        projects: state.projectReducer.projectById
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({editProject: editProject}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProject)