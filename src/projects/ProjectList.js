/**
 * Created by nishavaity on 10/14/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setFilterText } from '../actions/ProjectActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';

class ProjectList extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const projects = this.props.projects;
        const user = this.props.user;
        let rows = [];
        projects.forEach(function (project) {
            if (project.name.includes(this.props.filterText)
                || project.desc.includes(this.props.filterText)) {
                rows.push(
                    <li key={project.id} className="list-group-item">
                        <p>
                            <a href={`#/project/${project.id}`}
                               className="navbar-link">{project.name}</a>
                            <a className="">{project.desc}</a>
                            {(user.id === project.ownedBy) &&
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
                <div>
                    <ul className="list-group">
                        {
                            rows
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
        projects: state.projectReducer.projectById,
        user: state.userReducer.loggedIn,
        filterText: state.projectReducer.filterText,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({setFilterText: setFilterText}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)