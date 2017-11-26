const isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated) {
        next();
    } else {
        res.send({status: 401});
    }
};
const createTeam = (req, res) => {
   const team = req.body;
   const newTeam = model.teamModel.createTeam(team);
   if(newTeam)
      res.send({ status: 200, team: newTeam});
   else
      res.send({ status: 200, team: null});
};
const updateTeam = (req, res) => {
    const team = req.body;
    model.teamModel.updateTeam(team._id, team)
    .then((teamUpdated) => res.send({ status: 200, team: team}))
    .catch((err) => res.send({ status: 200, team: null}));
};
const findTeamById = (req, res) => {
     const id = req.params.teamId;
     model.teamModel.findTeamById(id)
     .then(team => res.send({ status: 200, team: team}));
};
const findTeamByProjectId = (req, res) => {
     const id = req.params.projectId;
     model.teamModel.findTeamByProjectId(id)
     .then((team) => res.send({ status: 200, team: team}));
};
const deleteTeam = (req, res) => {
     const id = req.params.teamId;
     model.teamModel.deleteTeam(id)
     .then(t => res.send({ status: 200 }));
};
const teamService = (app, model) => {
    app.get('/api/team/:projectId', isAuthenticated, (req, res) => findTeamByProjectId(req, res));
    app.post('/api/team', isAuthenticated, (req, res) => createTeam(req, res));
    app.put('/api/team', isAuthenticated, (req, res) => updateTeam(req, res));
    app.delete('/api/team/:teamId', isAuthenticated, (req, res) => deleteTeam(req, res));
};
module.exports = {
    teamService
};
