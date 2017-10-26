/**
 * Created by nishavaity on 10/25/17.
 */
import React, { Component } from 'react';
import { updateTeam } from '../actions/TeamActions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AddNewTeam extends Component{
    constructor(props) {
        super(props);
    }
    addTeamMember = (id, team) => {
        console.log("Here");
        team.members.push(id);
        console.log(team);
        this.props.updateTeam(team);
    }
    removeTeamMember = (id, team) => {
        team.members.remove(id);
        this.props.updateTeam(team);
    }
    componentWillUpdate(){

    }
    render(){
        const team = this.props.teams[this.props.project.teamId];
        const remainingInterestedStudents = this.props.interestedStudents.map(function (student) {
            if(team.members.find(function (id) {
                    id === student.id;
                }) == undefined)
                return student;
        });
        const teamMembers = [];
        return(
            <div>
                <div className="form-group">
                    <label>Add Team Members</label>
                    {
                        teamMembers.map(function (student) {
                            return(
                                <li key={student.id} className="list-group-item">
                                    <p>
                                        <a className="navbar-link">{student.firstname} </a>
                                        <a className="navbar-link">{student.lastname}</a>
                                        <a className="pull-right" onClick={this.removeTeamMember(student.id, team)}>
                                            <span className="glyphicon glyphicon-remove"></span>
                                        </a>
                                    </p>
                                </li>
                            );
                        }, this)
                    }
                </div><hr/>
                <div className="form-group">
                    <label>Interested Students</label>
                    {
                        remainingInterestedStudents.map(function (student) {
                            return(
                                <li key={student.id} className="list-group-item">
                                    <p>
                                        <a className="navbar-link">{student.firstname} </a>
                                        <a className="navbar-link">{student.lastname}</a>
                                        <button className="pull-right" onClick={this.addTeamMember(student.id, team)}>
                                            <span className="glyphicon glyphicon-ok"></span>
                                        </button>
                                    </p>
                                </li>
                            );
                        }, this)
                    }
                </div>
            </div>
        );
    }
}
AddNewTeam.propTypes = {
    project: PropTypes.object,
    interestedStudents: PropTypes.array,
};
function mapStateToProps(state) {
    return {
        teams: state.teamReducer.teamById
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateTeam: updateTeam}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AddNewTeam)