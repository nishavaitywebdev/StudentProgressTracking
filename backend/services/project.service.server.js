const multer = require('multer');
const storage = multer.diskStorage({
  destination: __dirname+'/../uploads',
});
const upload = multer({storage});
const isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated) {
        next();
    } else {
        res.send({status: 401});
    }
};
const createProject = (req, res) => {
    const project = req.body;
    const userId = req.user._id;
    const team = { members: [], ownedBy: userId, }
    model.teamModel.createTeam(team)
    .then((newTeam) => {
        project.teamId = newTeam._id;
        model.projectModel.createProject(project)
        .then((newProject) => {
            newTeam.projectId = newProject._id;
            model.teamModel.updateTeam(newTeam._id, newTeam)
            .then((updatedTeam) => {
                res.send({ status: 200, project: newProject});
            })
            .catch((err) => res.send({ status: 200, project: null}));
        });
    });
};
const updateProject = (req, res) => {
    const project = req.body;
    model.projectModel.updateProject(project._id, project)
    .then((projectUpdated) => {
        res.send({ status: 200, project: project});
    })
    .catch((err) => res.send({ status: 200, project: null}));
};
const addPreferredBy = (req, res) => {
    const obj = req.body;
    model.projectModel.findProjectById(obj.projId)
    .then((project) => {
        project.preferredBy.push(obj.user);
        if(obj.prevPreferenceProjectId > -1) {
            model.projectModel.findProjectById(obj.prevPreferenceProjectId)
            .then((otherProject) => {
                const index = otherProject.preferredBy.indexOf(obj.user);
                otherProject.preferredBy.splice(index, 1);
                model.projectModel.updateProject(otherProject._id, otherProject)
                .then((otherProjectUpdated) => {
                    model.projectModel.updateProject(project._id, project)
                    .then((projectUpdated) => {
                        res.send({ status: 200, project: project});
                    })
                    .catch((err) => res.send({ status: 200, project: null}));
                });
            });
        } else {
            console.log(project);
            model.projectModel.updateProject(project._id, project)
            .then((projectUpdated) => {
                res.send({ status: 200, project: project});
            })
            .catch((err) => res.send({ status: 200, project: null}));
        }
    });
};
const getAllProjects = (req, res) => {
    model.projectModel.getAllProjects()
    .then((projects) => {
        res.send({ status: 200, projects: projects});
    });
};
const findProjectById = (req, res) => {
     const id = req.params.projectId;
     model.projectModel.findProjectById(id)
     .then(project => res.send({ status: 200, project: project}));
};
const deleteProject = (req, res) => {
     const id = req.params.projectId;
     model.projectModel.deleteProject(id)
     .then(p => res.send({ status: 200, projects: projects }));
};
const getProjectDetails = (req, res) => {
    const id = req.params.projectId;
    model.projectModel.findProjectById(id)
    .then((project) => {
        res.send({ status: 200, project: project});
    });
};
const uploadDesc = (req, res) => {
    const myFile        = req.file;
    const projectId        = req.params.id;
    const originalname  = myFile.originalname; // file name on user's computer
    const filename      = myFile.filename;     // new file name in upload folder
    const path          = myFile.path;         // full path of uploaded file
    const destination   = myFile.destination;  // folder where file is saved to
    const size          = myFile.size;
    const mimetype      = myFile.mimetype;
    model.projectModel.findProjectById(projectId)
    .then((project) => {
        project["url"] = "/../uploads/" + filename;
        project["origFileName"] = originalname;
        model.projectModel.updateProject(projectId, project)
        .then((updatedProject) => {
            res.send({ status: 200, project: project});
        })
        .catch((err) => res.send({ status: 200, err: error}));
    });
};
const downloadDesc = (req, res) => {
    model.projectModel.findProjectById(req.params.id)
    .then((project) => {
        const url = project["url"];
        res.download(__dirname+url, project.origFileName);
    });
};

const projectService = (app, model) => {
    app.get('/api/project/:projectId', isAuthenticated, (req, res) => findProjectById(req, res));
    app.get('/api/getProjectDetails/:projectId', isAuthenticated, (req, res) => getProjectDetails(req, res));
    app.get('/api/getAllProjects', isAuthenticated, (req, res) => getAllProjects(req, res));
    app.post('/api/project', isAuthenticated, (req, res) => createProject(req, res));
    app.put('/api/project', isAuthenticated, (req, res) => updateProject(req, res));
    app.put('/api/addPreferredBy', isAuthenticated, (req, res) => addPreferredBy(req, res));
    app.post('/api/descUpload/:id', isAuthenticated, upload.single("myFile"), (req, res) => uploadDesc(req, res));
    app.get('/api/descDownload/:id', isAuthenticated, (req, res) => downloadDesc(req, res));
    app.delete('/api/project/:projectId', isAuthenticated, (req, res) => deleteProject(req, res));
};
module.exports = {
    projectService
};
