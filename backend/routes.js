/**
 * Created by nishavaity on 11/10/17.
 */
const { passport } = require('./auth.js');
const { UserModelApi } = require('./models/user/user.model.server.js');
const { TeamModelApi } = require('./models/team/team.model.server.js');
const { CourseModelApi } = require('./models/course/course.model.server.js');
const { ProjectModelApi } = require('./models/project/project.model.server.js');

const isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
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
        (req, res) => res.send({user: req.user})
    );

    app.get("/login",
        (req, res) => {
            res.send('you are not logged in');
        });

    app.post("/logout", isAuthenticated, (req, res) => {
        req.logout();
        res.send({ status: 200 });
    });
    app.get("/authenticate", isAuthenticated, (req, res) => res.send({ status: 200 }));

    app.put("/updateUser", isAuthenticated , (req, res) => {
        const user = req.body;
        const userUpdated = UserModelApi.updateUser(user.id, user);
        if(userUpdated)
            res.send({ status: 200, user: userUpdated});
        else
            res.send({ status: 200, user: null});
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
    app.put("/addPreference", isAuthenticated , (req, res) => {
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
        const newTeam = TeamModelApi.createTeam(project);
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
};

module.exports = {
    routes
};
