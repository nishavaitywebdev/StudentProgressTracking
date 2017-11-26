//const teams = {
//    1: { id: 1, members: [], ownedBy: 4, projectId: 1},
//    2: { id: 2, members: [], ownedBy: 4, projectId: 2},
//    3: { id: 3, members: [], ownedBy: 4, projectId: 3},
//    4: { id: 4, members: [], ownedBy: 4, projectId: 4},
//    5: { id: 5, members: [], ownedBy: 4, projectId: 5},
//    6: { id: 6, members: [], ownedBy: 4, projectId: 6},
//};
const { mongoose } = require('../database.js');
const { TeamSchema } = require("./team.schema.server");
const TeamModel = mongoose.model("TeamModel", TeamSchema);

TeamModelApi = {
    createTeam: (team) => createTeam(team),
    findTeamById: (_id) => findTeam(_id),
    findTeamByProjectId: (_id) => findTeamByProjectId(_id),
    updateTeam: (id, team) => updateTeam(id, team),
    setModel: (model) => setModel(model),
    deleteTeam: (id) => deleteTeam(id),
};
const setModel = (_model) => {
    model = _model;
};
const createTeam = (team) => {
    return TeamModel.create(team);
};
const deleteTeam = (teamId) => {
    return TeamModel.remove({
        _id: teamId
    })
};
const updateTeam = (tid, team) => {
    const id = tid;
    return TeamModel.update(
        {
            _id: id
        },
        {
            $set:team
        }
    );
};
const findTeam = (id) => {
    return TeamModel.findOne({
       _id: id
    });
};
const findTeamByProjectId = (id) => {
    return TeamModel.findOne({
       projectId: id
    });
};
module.exports = {
    TeamModelApi,
};