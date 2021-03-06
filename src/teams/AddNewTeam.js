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
        team.members.push(id);
        this.props.updateTeam(team);
        this.forceUpdate();
    }
    removeTeamMember = (id, team) => {
        team.members.splice(team.members.indexOf(id), 1);
        this.props.updateTeam(team);
        this.forceUpdate();
    }
    render(){
        if(this.props.team!=null) {
            const team = this.props.team;
            const students = this.props.interestedStudents;
            const remainingInterestedStudents = students.filter(function (student) {
                return (!team.members.includes(student._id));
            });
            const teamMembers = students.filter(function (student) {
                return team.members.includes(student._id);
            });
            return(
                <div>
                    <div className="form-group">
                        <label>Add Team Members</label>
                        {
                            teamMembers.map(function (student) {
                                return(
                                    <li key={student._id} className="list-group-item">
                                        <p>
                                            <a href={`#/profileview/${student._id}`}>{student.firstname} {student.lastname}</a>
                                            <a className="pull-right" key={student._id}
                                               onClick={() => this.removeTeamMember(student._id, team)}>
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
                                    <li key={student._id} className="list-group-item">
                                        <p>
                                            <a href={`#/profileview/${student._id}`}>{student.firstname} {student.lastname}</a>
                                            <a className="pull-right" key={student._id}
                                               onClick={() => this.addTeamMember(student._id, team)}>
                                                <span className="glyphicon glyphicon-ok"></span>
                                            </a>
                                        </p>
                                    </li>
                                );
                            }, this)
                        }
                    </div>
                </div>
            );
        } else return (<noscript />);
    }
}
AddNewTeam.propTypes = {
    project: PropTypes.object,
    team: PropTypes.object,
    interestedStudents: PropTypes.array,
};
function mapStateToProps(state) {
    return {
        team: state.teamReducer.team
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateTeam: updateTeam}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AddNewTeam)