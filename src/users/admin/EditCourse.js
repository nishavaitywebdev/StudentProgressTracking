import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditCourse extends Component{
    editCourse = (id) => {
        const keyName = "course"+id;
        const name = this.refs[keyName].value;
        const course = {
            _id: id,
            name: name,
        };
        this.props.onUserInputEdit(course);
    }

    deleteCourse = (id) => {
        this.props.onUserInputDelete(id);
    }
    render(){
        let courseRows = [];
        const style = {margin: '10px'};
        const courses = this.props.courses;
        Object.values(courses).forEach(function (course) {
            const keyName = "course"+course._id;
            courseRows.push(
                <div key={course._id} className="list-group-item">
                    <p>
                        <input type="text" ref={keyName}
                           className="navbar-link" defaultValue={course.name} />
                        <a className="pull-right" onClick={() => this.deleteCourse(course._id)}  style={style}>
                            <span className="glyphicon glyphicon-remove"></span>
                        </a>
                        <a className="pull-right" onClick={() => this.editCourse(course._id)}  style={style}>
                            <span className="glyphicon glyphicon-ok"></span>
                        </a>
                    </p>
                </div>
            );
        }.bind(this));
        return(
            <div>
                <label>Edit or Delete Courses</label>
                <div className="list-group">
                    {
                        courseRows
                    }
                </div>
            </div>
        );
    }
}
EditCourse.propTypes = {
    onUserInputEdit: PropTypes.func,
    onUserInputDelete: PropTypes.func,
    courses: PropTypes.object,
};
export default EditCourse;