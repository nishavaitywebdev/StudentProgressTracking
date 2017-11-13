const initialState = {
    projectById: [
        { id: 1, name: "Capstone1", desc: "Something", ownedBy: 4, instructor: -1, topic: "Web",
            preferredBy: [], teamId: 1, state: "ACTIVE", expectedResult: "", teamSize: 4, term: "Spring 2018" },
        { id: 2, name: "Capstone2", desc: "Something", ownedBy: 4, instructor: -1, topic: "Databases",
            preferredBy: [], teamId: 2, state: "ACTIVE", expectedResult: "", teamSize: 4, term: "Spring 2018" },
        { id: 3, name: "Capstone3", desc: "Something", ownedBy: 5, instructor: -1, topic: "Web",
            preferredBy: [], teamId: 3, state: "ACTIVE", expectedResult: "", teamSize: 4, term: "Spring 2018" },
        { id: 4, name: "Capstone4", desc: "Something", ownedBy: 5, instructor: -1, topic: "Web",
            preferredBy: [], teamId: 4, state: "ACTIVE", expectedResult: "", teamSize: 4, term: "Spring 2018" },
        { id: 5, name: "Capstone5", desc: "Something", ownedBy: 4, instructor: -1, topic: "Web",
            preferredBy: [], teamId: 5, state: "ACTIVE", expectedResult: "", teamSize: 4, term: "Spring 2018" },
        { id: 6, name: "Capstone6", desc: "Something", ownedBy: 4, instructor: -1, topic: "Web",
            preferredBy: [], teamId: 6, state: "ACTIVE", expectedResult: "", teamSize: 4, term: "Spring 2018" },
    ],
}

ProjectModelApi = {
    createProject: (project) => createProject(project),
    findOne: (project) => findProject(project.id),
    findProjectById: (_id) => findProject(_id),
    getProjects: () => getProjects(),
    // findUserByUserName: (userName) => UserModel.findOne({ userName }),
    updateProject: (project) => updateProject(project),
    addPreferredBy: (uid, prevPrefId, pid) => addPreferredBy(uid, prevPrefId, pid),
};

const createProject = (project) => {
    const id = initialState.projectById.length+1;
    project.id = id;
    project.teamId = id;
    initialState.projectById.push(project);
    return project;
};

const updateProject = (project) => {
    const updatedProject = project;
    const pId = updatedProject.id;
    let editedProjects = initialState.projectById.filter(project => project.id != pId);
    editedProjects.push(updatedProject);
    initialState.projectById = editedProjects;
    return updatedProject;
};

const findProject = (id) => {
    let project = initialState.projectById.filter(project => project.id === id)[0];
    return project;
};

const getProjects = () => {
    return initialState.projectById;
};

const addPreferredBy = (userId, prevPrefId, prId ) => {
    initialState.projectById.find(function (p) {
        return p.id === prId;
    }).preferredBy.push(userId);
    if(prevPrefId > -1) {
        const index = initialState.projectById.find(function (p) {
            return p.id === prevPrefId;
        }).preferredBy.indexOf(userId);
        initialState.projectById.find(function (p) {
            return p.id === prevPrefId;
        }).preferredBy.splice(index, 1);
    }
    return prId;
};
module.exports = {
    ProjectModelApi,
};