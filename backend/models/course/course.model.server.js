const courses = {
    1: "Web Development", 2: "Programming Design Paradigm",
    3: "Managing Software Development", 4: "Information Retrieval",
};

CourseModelApi = {
    createCourse: (course) => createCourse(course),
    findOne: (course) => findCourse(course.id),
    findCourseById: (_id) => findCourse(_id),
    getCourses: () => getCourses(),
    // findUserByUserName: (userName) => UserModel.findOne({ userName }),
    updateCourse: (_id, course) => updateCourse({ _id }, course),
};

const createCourse = (course) => {
    const id = courses.size()+1;
    courses[id] = course;
    return course;
};

const updateCourse = (id, course) => {
    courses[id] = course;
    return course;
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