const courses = {
    1: {id: 1, name: "Web Development"}, 2: {id: 2, name: "Programming Design Paradigm"},
    3: {id: 3, name: "Managing Software Development"}, 4: {id: 4, name: "Information Retrieval"},
};
let lastId = 4;

const mongoose = require("mongoose");
const CourseSchema = require("./course.schema.server")();
const CourseModel = mongoose.model("CourseModel", CourseSchema);

CourseModelApi = {
    createCourse: (course) => createCourse(course),
    findOne: (course) => findCourse(course.id),
    findCourseById: (_id) => findCourse(_id),
    getCourses: () => getCourses(),
    // findUserByUserName: (userName) => UserModel.findOne({ userName }),
    updateCourse: (_id, course) => updateCourse(_id, course),
    deleteCourse: (_id) => deleteCourse(_id),
};

const createCourse = (course) => {
    const id = lastId+1;
    lastId = id;
    courses[id] = {id: id, name: course.name};
    return courses;
};

const updateCourse = (id, course) => {
    courses[id] = course;
    return courses;
};
const deleteCourse = (id) => {
    delete courses[id];
    return courses;
};

const findCourse = (id) => {
    return courses[id];
};

const getCourses = () => {
    return courses;
};

module.exports = {
    CourseModelApi,
};