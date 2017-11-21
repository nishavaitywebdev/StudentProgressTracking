/**
 * Created by nishavaity on 10/14/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setFilterText, setFilters, getProjects } from '../actions/ProjectActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import Filters from './Filters';
import ProjectPreference from './ProjectPreference';

class ProjectList extends Component {
    constructor(props){
        super(props);
        this.props.getProjects();
    }
    componentWillReceiveProps(){
        this.forceUpdate();
    }
    render(){
        if(this.props.projects!=null) {
            const projects = this.props.projects;
            let terms = [...new Set(projects.map(project => project.term))];
            let topics = [...new Set(projects.map(project => project.topic))];
            const user = this.props.user;
            let rows = [];
            projects.forEach(function (project) {
                if ((project.name.includes(this.props.filterText)
                    || project.desc.includes(this.props.filterText))
                    && (this.props.topicFilter === "" || project.topic === this.props.topicFilter)
                    && (this.props.termFilter === "" ||  project.term === this.props.termFilter)) {
                    rows.push(
                        <li key={project.id} className="list-group-item">
                            <p>
                                <a href={`#/project/${project.id}`}
                                   className="navbar-link">{project.name}</a>
                                {(user.id === project.ownedBy || user.role === 'admin') &&
                                <a className="pull-right"
                                   href={`#/editproject/${project.id}`}>
                                    <span className="glyphicon glyphicon-cog">
                                    </span>
                                </a>
                                }
                            </p>
                        </li>
                    );
                }
            }.bind(this));
            return(
                <div className="col-sm-12">
                    <SearchBar filterText={this.props.filterText} onUserInput={this.props.setFilterText}/>
                    <Filters termFilter={this.props.termFilter}
                             terms={terms} topics={topics}
                             topicFilter={this.props.topicFilter}
                             onUserInput={this.props.setFilters}/>
                    <div>
                        <ul className="list-group">
                            {
                                rows
                            }
                        </ul>
                    </div><hr/>
                    {user.role === "student" &&
                        <ProjectPreference projects={projects}/>
                    }
                </div>
            );
        } else return (<noscript />);
    }
}

ProjectList.propTypes = {
    projects: PropTypes.array,
};
function mapStateToProps(state){
    return {
        user: state.userReducer.loggedIn,
        projects: state.projectReducer.projects,
        filterText: state.projectReducer.filterText,
        termFilter: state.projectReducer.termFilter,
        topicFilter: state.projectReducer.topicFilter,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({setFilterText: setFilterText,
    setFilters: setFilters, getProjects: getProjects}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)