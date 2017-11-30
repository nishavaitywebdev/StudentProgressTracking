import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddCourse extends Component{
    createCourse = () => {
        const course = {
            name: this.refs.coursename.value,
        };
        this.props.onUserInput(course);
        this.forceUpdate();
    }

    render(){
        return(
            <div>
                <div className="form-group">
                    <label>Course Name</label>
                    <input type="text" className="form-control" ref="coursename"/>
                </div>
                <a className="btn btn-primary btn-block"
                   onClick={this.createCourse}>Add</a>
            </div>
        );
    }
}
AddCourse.propTypes = {
    onUserInput: PropTypes.func,
};
export default AddCourse;