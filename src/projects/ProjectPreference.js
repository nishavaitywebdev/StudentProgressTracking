/**
 * Created by nishavaity on 10/19/17.
 */
import React, { Component } from 'react';
import { addPreference } from '../actions/UserActions';
import { addProjectPreferredBy } from '../actions/ProjectActions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ProjectPreference extends Component{
    handleChange = (prefId) => {
        let projectId = prefId == 1 ? this.refs.pref1.value: prefId == 2 ? this.refs.pref2.value: this.refs.pref3.value;
        const action = this.props.addPreference;
        const prevPreferenceProjectId = this.props.user.projectPreferences[prefId-1] === undefined ? -1:
            this.props.user.projectPreferences[prefId-1];
        if(projectId != 0) action(this.props.user._id, Number(prefId), projectId);
        this.props.addProjectPreferredBy(this.props.user._id, projectId, prevPreferenceProjectId);
    };
    render() {
        const projects = this.props.projects;
        let projectOptions = [];
        projectOptions.push(<option key={0} value={0}>Select a project:</option>);
        const preferences = this.props.user.projectPreferences;
        projects.forEach(function(project) {
            projectOptions.push(
                <option key={project._id} value={project._id}>{project.name}</option>
            );
        });
        return (
            <div className="col-sm-12">
                <ul className="list-group">
                    <label className="form-control">Set Preferences</label><br/>
                    <li className="list-group-item">
                        <p>
                            <a>Pref 1</a>
                            <select ref="pref1" className="pull-right"
                                    value={preferences[0] === undefined ? 0: preferences[0]}
                                    onChange={() => this.handleChange(1)}
                            >

                                {
                                    projectOptions
                                }
                            </select>
                        </p>
                    </li>
                    <li className="list-group-item">
                        <p>
                            <a>Pref 2</a>
                            <select ref="pref2" className="pull-right"
                                    value={preferences[1] === undefined ? 0: preferences[1]}
                                    onChange={() => this.handleChange(2)}
                            >
                                {
                                    projectOptions
                                }
                            </select>
                        </p>
                    </li>
                    <li className="list-group-item">
                        <p>
                            <a>Pref 3</a>
                            <select ref="pref3" className="pull-right"
                                    value={preferences[2] === undefined ? 0: preferences[2]}
                                    onChange={() => this.handleChange(3)}
                            >
                                {
                                    projectOptions
                                }
                            </select>
                        </p>
                    </li>
                </ul>
            </div>
        );
    }
}
ProjectPreference.propTypes = {
    projects: PropTypes.array,
};
function mapStateToProps(state){
    return {
        user: state.userReducer.loggedIn,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({addPreference: addPreference, addProjectPreferredBy: addProjectPreferredBy}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectPreference)