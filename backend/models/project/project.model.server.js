//const initialState = {
//    projectById: [
//        { id: 1, name: "Capstone1", desc: "Something", ownedBy: 4, instructor: -1, topic: "Web",
//            preferredBy: [], teamId: 1, state: "ACTIVE", expectedResult: "", teamSize: 4, term: "Spring 2018" },
//        { id: 2, name: "Capstone2", desc: "Something", ownedBy: 4, instructor: -1, topic: "Databases",
//            preferredBy: [], teamId: 2, state: "ACTIVE", expectedResult: "", teamSize: 4, term: "Spring 2018" },
//        { id: 3, name: "Capstone3", desc: "Something", ownedBy: 5, instructor: -1, topic: "Web",
//            preferredBy: [], teamId: 3, state: "ACTIVE", expectedResult: "", teamSize: 4, term: "Spring 2018" },
//        { id: 4, name: "Capstone4", desc: "Something", ownedBy: 5, instructor: -1, topic: "Web",
//            preferredBy: [], teamId: 4, state: "ACTIVE", expectedResult: "", teamSize: 4, term: "Spring 2018" },
//        { id: 5, name: "Capstone5", desc: "Something", ownedBy: 4, instructor: -1, topic: "Web",
//            preferredBy: [], teamId: 5, state: "ACTIVE", expectedResult: "", teamSize: 4, term: "Spring 2018" },
//        { id: 6, name: "Capstone6", desc: "Something", ownedBy: 4, instructor: -1, topic: "Web",
//            preferredBy: [], teamId: 6, state: "ACTIVE", expectedResult: "", teamSize: 4, term: "Spring 2018" },
//    ],
//}

const { mongoose } = require('../database.js');
const { ProjectSchema } = require("./project.schema.server");
const ProjectModel = mongoose.model("ProjectModel", ProjectSchema);

ProjectModelApi = {
    createProject: (project) => createProject(project),
    findOne: (project) => findProject(project._id),
    findProjectById: (_id) => findProject(_id),
    deleteProject: (_id) => deleteProject(_id),
    getAllProjects: () => getProjects(),
    setModel: (model) => setModel(model),
    updateProject: (id, project) => updateProject(id, project),
};

const createProject = (project) => {
    return ProjectModel.create(project);
};
const setModel = (_model) => {
    model = _model;
};
const updateProject = (id, project) => {
    return ProjectModel.update(
        {
            _id: id
        },
        {
            $set: project
        }
    );
};
const deleteProject = (projectId) => {
    return ProjectModel.remove({
        _id: projectId
    });
};
const findProject = (pid) => {
    const id = pid;
    return ProjectModel.findOne({
       _id: id
    });
};
const getProjects = () => {
    return ProjectModel.find();
};

module.exports = {
    ProjectModelApi,
};