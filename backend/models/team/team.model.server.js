const teams = {
    1: { id: 1, members: [], ownedBy: 4, projectId: 1},
    2: { id: 2, members: [], ownedBy: 4, projectId: 2},
    3: { id: 3, members: [], ownedBy: 4, projectId: 3},
    4: { id: 4, members: [], ownedBy: 4, projectId: 4},
    5: { id: 5, members: [], ownedBy: 4, projectId: 5},
    6: { id: 6, members: [], ownedBy: 4, projectId: 6},
};

TeamModelApi = {
    createTeam: (team) => createTeam(team),
    findOne: (team) => findTeam(team.id),
    findTeamById: (_id) => findTeam(_id),
    // findUserByUserName: (userName) => UserModel.findOne({ userName }),
    updateTeam: (team) => updateTeam(team),
};

const createTeam = (team) => {
    const id = teams.size()+1;
    team.id = id;
    team.projectId = id;
    teams[id] = team;
    return team;
};

const updateTeam = (team) => {
    const id = Number(team.id);
    teams[id] = team;
    return team;
};

const findTeam = (id) => {
    return teams[id];
};

module.exports = {
    TeamModelApi,
};