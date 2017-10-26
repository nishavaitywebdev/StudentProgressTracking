/**
 * Created by nishavaity on 10/19/17.
 */
import React, { Component } from 'react';
import { addPreference } from '../actions/UserActions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ProjectPreference extends Component{
    render() {
        const _style = {
            position:'relative',
            marginTop: 100,
        }
        const projects = this.props.projects;
        const action = this.props.addPreference;
        return (
            <div className="col-sm-12">
                <ul style={_style} className="list-group">
                    <label className="form-control">Set Preferences</label><br/>
                    <li className="list-group-item">
                        <p>
                            <a>Pref 1</a>
                            <select className="pull-right" onChange={
                                (e) => {e.preventDefault();
                                    action(1, e.target.value)}
                                }
                            >
                                <option value="">Select a project:</option>
                                {
                                    projects.map(function(project) {
                                        return (
                                            <option value={project.id}>{project.name}</option>
                                        );
                                    })
                                }
                            </select>
                        </p>
                    </li>
                    <li className="list-group-item">
                        <p>
                            <a>Pref 2</a>
                            <select className="pull-right" onChange={
                                (e) => {e.preventDefault();
                                    action(addPreference(2, e.target.value))}
                                }
                            >
                                <option value="">Select a project:</option>
                                {
                                    projects.map(function(project) {
                                        return (
                                            <option value={project.id}>{project.name}</option>
                                        );
                                    })
                                }
                            </select>
                        </p>
                    </li>
                    <li className="list-group-item">
                        <p>
                            <a>Pref 3</a>
                            <select className="pull-right" onChange={
                                (e) => {e.preventDefault();
                                    action(addPreference(3, e.target.value))}
                                }
                            >
                                <option value="">Select a project:</option>
                                {
                                    projects.map(function(project) {
                                        return (
                                            <option value={project.id}>{project.name}</option>
                                        );
                                    })
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
    preferences: PropTypes.object,
};
function mapStateToProps(state){
    return {
        projects: state.projectReducer.projectById,
        preferences: state.preferenceReducer.preferenceById,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({addPreference: addPreference}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectPreference)