/**
 * Created by nishavaity on 11/5/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ProfileView extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        const user = this.props.users[this.props.params.id];
        const courses = this.props.courses;
        let { username, firstname, lastname, email, aboutMyself, coursesCompleted, role } = user;
        let courseValues = [];
        Object.entries(courses).forEach( ([key, value]) => {
            if(coursesCompleted.includes(key)) {
                courseValues.push(
                    <div>
                        <input id={key} type="text" disabled="true" value={value} />
                    </div>
                );
            }
        });
        return(
            <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" defaultValue={username} className="form-control" disabled="true" ref="username" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" defaultValue={email} className="form-control" disabled="true" ref="email" placeholder="email Id" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="first-name">First Name</label>
                        <input type="text" defaultValue={firstname} className="form-control" disabled="true" ref="firstname" placeholder="First name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last-name">Last Name</label>
                        <input type="text" defaultValue={lastname} className="form-control" disabled="true" ref="last-name" placeholder="Last Name" />
                    </div>
                    { role == "student" &&
                    <div className="form-group">
                        <label htmlFor="about">About myself</label>
                        <input type="text" defaultValue={aboutMyself} className="form-control" disabled="true" ref="aboutMyself"
                               placeholder="About me"/>
                    </div>
                    }
                    { role == "student" &&
                    <div className="form-group">
                        <label htmlFor="courses">Courses Completed</label><br/>
                        {
                            courseValues
                        }
                    </div>
                    }
                </form>
            </div>
        );
    }
}
ProfileView.propTypes = {
    user: PropTypes.object,
    courses: PropTypes.object,
};
function mapStateToProps(state){
    return {
        users: state.userReducer.userById,
        courses: state.userReducer.courses,
    };
}
export default connect(mapStateToProps)(ProfileView)