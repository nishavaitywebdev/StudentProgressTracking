/**
 * Created by nishavaity on 11/5/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProjectStatus extends Component {
    handleChange = () => {
        let updatedProject = this.props.project;
        updatedProject.state = this.refs.projectStatus.value;
        this.props.onUserInput(
            updatedProject
        );
    }
    render () {
        const states = ["INACTIVE", "PROPOSED", "ACTIVE", "IN-PROGRESS", "COMPLETED"];
        const currState = this.props.project.state;
        let statusOptions = [];
        states.forEach(function(state) {
            if(states.indexOf(state) >= states.indexOf(currState)) {
                statusOptions.push(<option key={states.indexOf(state)} value={state}>{state}</option>);
            }
        })
        return (
            <form>
                <label>Project State</label>
                <br/>
                <select
                        value={this.props.project.state}
                        ref="projectStatus"
                        onChange={this.handleChange}
                        disabled={this.props.notOwner}
                >
                        { statusOptions }
                </select>
                <br/>
            </form>
        );
    }
}
ProjectStatus.propTypes = {
    onUserInput: PropTypes.func,
    project: PropTypes.object,
    notOwner: PropTypes.bool,
};
export default ProjectStatus;