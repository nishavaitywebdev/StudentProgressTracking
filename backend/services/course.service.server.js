const isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated) {
        next();
    } else {
        res.send({status: 401});
    }
};
const createCourse = (req, res) => {
   const course = req.body;
   model.courseModel.createCourse(course)
   .then((course) => {
        getAllCourses(req, res);
   });
};
const updateCourse = (req, res) => {
    const course = req.body;
    model.courseModel.updateCourse(course._id, course)
    .then((course) => getAllCourses(req, res));
};
const getAllCourses = (req, res) => {
    model.courseModel.getAllCourses()
    .then((courses) => {
        res.send({ status: 200, courses: courses});
    });
};
const findCourseById = (req, res) => {
     const id = req.params.courseId;
     model.courseModel.findCourseById(id)
     .then((course) => res.send({ status: 200, course: course}))
     .catch((err) => res.send({ status: 200, course: null}));
};
const deleteCourse = (req, res) => {
     const id = req.params.courseId;
     model.courseModel.deleteCourse(id)
     .then((course) => getAllCourses(req, res));
};
const courseService = (app, model) => {
    app.get('/api/course/:courseId', isAuthenticated, (req, res) => findCourseById(req, res));
    app.get('/api/getAllCourses', isAuthenticated, (req, res) => getAllCourses(req, res));
    app.post('/api/course', isAuthenticated, (req, res) => createCourse(req, res));
    app.put('/api/course', isAuthenticated, (req, res) => updateCourse(req, res));
    app.delete('/api/course/:courseId', isAuthenticated, (req, res) => deleteCourse(req, res));
};
module.exports = {
    courseService
};
