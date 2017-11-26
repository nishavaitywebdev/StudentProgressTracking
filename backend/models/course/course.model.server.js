//const courses = {
//    1: {id: 1, name: "Web Development"}, 2: {id: 2, name: "Programming Design Paradigm"},
//    3: {id: 3, name: "Managing Software Development"}, 4: {id: 4, name: "Information Retrieval"},
//};
//let lastId = 4;

const { mongoose } = require('../database.js');
const { CourseSchema } = require('./course.schema.server');
const CourseModel = mongoose.model('CourseModel', CourseSchema);

CourseModelApi = {
    createCourse: (course) => createCourse(course),
    findCourseById: (_id) => findCourse(_id),
    getAllCourses: () => getCourses(),
    updateCourse: (_id, course) => updateCourse(_id, course),
    setModel: (model) => setModel(model),
    deleteCourse: (_id) => deleteCourse(_id),
};
const setModel = (_model) => {
    model = _model;
};
const createCourse = (course) => {
    return CourseModel.create(course);
};
const updateCourse = (cid, course) => {
    const id = cid;
    return CourseModel.update(
        {
            _id: id
        },
        {
            $set:course
        }
    );
};
const deleteCourse = (cid) => {
    const id = cid;
    return CourseModel.remove({
            _id: id
    });
};
const findCourse = (cid) => {
    const id = cid;
    return CourseModel.findOne({
       _id: id
    });
};
const getCourses = () => {
    return CourseModel.find();
};

module.exports = {
    CourseModelApi,
};