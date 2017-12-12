/**
 * Created by nishavaity on 11/10/17.
 */
const multer = require('multer');
const storage = multer.diskStorage({
  destination: __dirname+'/uploads',
});
const upload = multer({storage});
const { passport } = require('./auth.js');
const { postMessageOnSlackGroup } = require('./slack-api.js');
const { UserModelApi } = require('./models/user/user.model.server.js');
const { TeamModelApi } = require('./models/team/team.model.server.js');
const { CourseModelApi } = require('./models/course/course.model.server.js');
const { ProjectModelApi } = require('./models/project/project.model.server.js');

const isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated) {
        next();
    } else {
        res.send({status: 401});
    }
};

const routes = (app) => {
    app.post("/login",
        passport.authenticate('local-login'),
        (req, res) => {
            res.send({isAuthenticated: true, user: req.user });
        });

    app.get("/user",
        isAuthenticated,
        (req, res) => {
        console.log(req.user);
            res.send({user: req.user});
        }
    );

    app.get("/login",
        (req, res) => {
            res.send('you are not logged in');
        });
    app.get("/authenticate", isAuthenticated, (req, res) => res.send({ status: 200 }));

    app.put("/updateUser", isAuthenticated , (req, res) => {
        const user = req.body;
        const userUpdated = UserModelApi.updateUser(user._id, user);
        if(userUpdated)
            res.send({ status: 200, user: userUpdated});
        else
            res.send({ status: 200, user: null});
    });
    app.put("/updateCourse", isAuthenticated , (req, res) => {
        const course = req.body;
        const courses = CourseModelApi.updateCourse(course._id, course);
        if(courses)
            res.send({ status: 200, courses: courses});
        else
            res.send({ status: 200, courses: null});
    });
    app.delete("/deleteCourse/:id", isAuthenticated , (req, res) => {
        const course = req.params.id;
        const courses = CourseModelApi.deleteCourse(course);
        if(courses)
            res.send({ status: 200, courses: courses});
        else
            res.send({ status: 200, courses: null});
    });
    app.get("/getCourses", isAuthenticated, (req, res) => {
        const courses = CourseModelApi.getCourses();
        res.send({ status: 200, courses: courses});
    });
    app.post("/register", isAuthenticated, (req, res) => {
        const user = req.body;
        const newUser = UserModelApi.createUser(user);
        if(newUser)
            res.send({ status: 200, user: newUser});
        else
            res.send({ status: 200, user: null});
    });
    app.put("/signUp", isAuthenticated, (req, res) => {
        const user = req.body;
        const newUser = UserModelApi.signUpUser(user);
        if(newUser)
            res.send({ status: 200, user: newUser});
        else
            res.send({ status: 200, user: null});
    });
    app.post("/addCourse", isAuthenticated, (req, res) => {
        const course = req.body;
        const courses = CourseModelApi.createCourse(course);
        if(courses)
            res.send({ status: 200, courses: courses});
        else
            res.send({ status: 200, courses: null});
    });
    app.post("/logout", isAuthenticated, (req, res) => {
        req.logout();
        res.send({ status: 200 });
    });
    app.post("/createProject", isAuthenticated, (req, res) => {
        const project = req.body;
        const newProject = ProjectModelApi.createProject(project);
        if(newProject)
            res.send({ status: 200, project: newProject});
        else
            res.send({ status: 200, project: null});
    });
    app.put("/addPreference", isAuthenticated, (req, res) => {
        const obj = req.body;
        const userUpdated = UserModelApi.addPreference(obj.uid, obj.prefId, obj.pid);
        if(userUpdated)
            res.send({ status: 200, user: userUpdated});
        else
            res.send({ status: 200, user: null});
    });
    app.put("/addPreferredBy", isAuthenticated , (req, res) => {
        const obj = req.body;
        const projectUpdated = ProjectModelApi.addPreferredBy(obj.user, obj.prevPreferenceProjectId, obj.projId);
        if(projectUpdated)
            res.send({ status: 200, project: projectUpdated});
        else
            res.send({ status: 200, project: null});
    });
    app.put("/editProject", isAuthenticated , (req, res) => {
        const project = req.body;
        const updatedProject = ProjectModelApi.updateProject(project);
        if(updatedProject)
            res.send({ status: 200, project: updatedProject});
        else
            res.send({ status: 200, project: null});
    });
    app.get("/getProjects", isAuthenticated, (req, res) => {
        const projects = ProjectModelApi.getProjects();
        res.send({ status: 200, projects: projects});
    });
    app.get("/getUsers", isAuthenticated, (req, res) => {
        const users = UserModelApi.getUsers();
        res.send({ status: 200, users: users});
    });
    app.get("/getProjectDetails/:id", isAuthenticated, (req, res) => {
        const id = Number(req.params.id);
        const project = ProjectModelApi.findProjectById(id);
        const preferredBy = project.preferredBy;
        const users = UserModelApi.getUsers();
        const interestedStudents = preferredBy.map(function (id) {
            return(users[id]);
        });
        project.interestedStudents = interestedStudents;
        res.send({ status: 200, project: project});
    });
    app.post("/addTeam", isAuthenticated, (req, res) => {
        const team = req.body;
        const newTeam = TeamModelApi.createTeam(team);
        if(newTeam)
            res.send({ status: 200, team: newTeam});
        else
            res.send({ status: 200, team: null});
    });
    app.put("/updateTeam", isAuthenticated , (req, res) => {
        const obj = req.body;
        const teamUpdated = TeamModelApi.updateTeam(obj);
        if(teamUpdated)
            res.send({ status: 200, team: teamUpdated});
        else
            res.send({ status: 200, team: null});
    });
    app.get("/getTeam/:id", isAuthenticated, (req, res) => {
        const id = Number(req.params.id);
        const team = TeamModelApi.findTeamById(id);
        res.send({ status: 200, team: team});
    });
    app.get("/getUser/:id", isAuthenticated, (req, res) => {
        const id = Number(req.params.id);
        const user = UserModelApi.findUserById(id);
        res.send({ status: 200, user: user});
    });
    app.post("/postOnSlack", isAuthenticated, (req, res) => {
        const message = req.body;
        const response = postMessageOnSlackGroup(message.channel, message.text);
        if(response)
            res.send({ status: 200, response: response});
        else
            res.send({ status: 200, response: null});
    });
    app.post("/api/resumeUpload/:id", isAuthenticated, upload.single("myFile"), (req, res) => {
        const myFile        = req.file;
        const userId        = req.params.id;
        const originalname  = myFile.originalname; // file name on user's computer
        const filename      = myFile.filename;     // new file name in upload folder
        const path          = myFile.path;         // full path of uploaded file
        const destination   = myFile.destination;  // folder where file is saved to
        const size          = myFile.size;
        const mimetype      = myFile.mimetype;
        let user = UserModelApi.findUserById(Number(userId));
        user["url"] = "/uploads/" + filename;
        user["origFileName"] = originalname;
        const uuser = UserModelApi.updateUser(userId, user);
        if(uuser) {
            res.send({ status: 200, user: uuser});
        }
        else{
            res.send({ status: 200, err: error});
        }
    });
    app.get("/api/resumeDownload/:id", isAuthenticated, (req, res) => {
        let user = UserModelApi.findUserById(Number(req.params.id));
        const url = user["url"];
        res.download(__dirname+url, user.origFileName);
    });
    app.post("/api/descUpload/:id", isAuthenticated, upload.single("myFile"), (req, res) => {
        const myFile        = req.file;
        const projectId        = req.params.id;
        const originalname  = myFile.originalname; // file name on user's computer
        const filename      = myFile.filename;     // new file name in upload folder
        const path          = myFile.path;         // full path of uploaded file
        const destination   = myFile.destination;  // folder where file is saved to
        const size          = myFile.size;
        const mimetype      = myFile.mimetype;
        let project = ProjectModelApi.findProjectById(Number(projectId));
        project["url"] = "/uploads/" + filename;
        project["origFileName"] = originalname;
        const updatedProject = ProjectModelApi.updateProject(project);
        if(updatedProject) {
            res.send({ status: 200, project: updatedProject});
        }
        else{
            res.send({ status: 200, err: error});
        }
    });
    app.get("/api/descDownload/:id", isAuthenticated, (req, res) => {
        let project = ProjectModelApi.findProjectById(Number(req.params.id));
        const url = project["url"];
        res.download(__dirname+url, project.origFileName);
    });
};

module.exports = {
    routes
};
