/**
 * Created by nishavaity on 11/5/17.
 */
import React, { Component } from 'react';
import { getUser, getCourses } from '../actions/UserActions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FileDownload from 'utils/FileDownload';

class ProfileView extends Component{
    constructor(props) {
        super(props);
        this.props.getCourses();
        this.props.getUser(this.props.params.id);
    }
    render(){
        const user = this.props.user;
        const url = "/api/resumeDownload/"+user._id;
        const courses = this.props.courses;
        if(user != null && courses != null){
            let { username, firstname, lastname, email, aboutMyself, coursesCompleted, role } = user;
            let courseValues = [];
            courses.forEach(course => {
                if(coursesCompleted.includes(course._id)) {
                    courseValues.push(
                        <div>
                            <input id={course._id} type="text" disabled="true" value={course.name} />
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
                    { role === "STUDENT" &&
                        <div className="form-group">
                            <label htmlFor="courses">Courses Completed</label><br/>
                            {
                                courseValues
                            }
                        </div>
                    }
                </form>
                <label className="form-control">Download resume</label><br/>
                <FileDownload url={url}/>
            </div>
        );
        } else return (<noscript />);
    }
}
ProfileView.propTypes = {
    user: PropTypes.object,
    courses: PropTypes.array,
};
function mapStateToProps(state){
    return {
        user: state.userReducer.reqUser,
        courses: state.userReducer.courses,
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getCourses: getCourses, getUser: getUser}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileView)
