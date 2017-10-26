/**
 * Created by nishavaity on 10/14/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ProjectList extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const projects = this.props.projects;
        return(
            <div className="col-sm-12">
                <div>
                    <ul className="list-group">
                        {
                            projects.map(function (project) {
                                return (
                                    <li key={project.id} className="list-group-item">
                                        <p>
                                            <a href={`#/project/${project.id}`}
                                               className="navbar-link">{project.name}</a>
                                            <a className="">{project.desc}</a>
                                            <a className="pull-right"
                                               href={`#/editproject/${project.id}`}>
                                                <span className="glyphicon glyphicon-cog">
                                                </span>
                                            </a>
                                        </p>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

ProjectList.propTypes = {
    projects: PropTypes.array,
};
function mapStateToProps(state){
    return {
        projects: state.projectReducer.projectById
    }
}
export default connect(mapStateToProps)(ProjectList)