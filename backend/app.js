
const services = (app) => {
    const { model } = require("./models/model.server.js");
    const { userService } = require("./services/user.service.server.js");
    const { teamService } = require("./services/team.service.server.js");
    const { projectService } = require("./services/project.service.server.js");
    const { courseService } = require("./services/course.service.server.js");
    userService(app, model);
    projectService(app, model);
    teamService(app, model);
    courseService(app, model);
};

module.exports = {
    services
};