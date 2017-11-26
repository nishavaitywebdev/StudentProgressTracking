

const { UserModelApi } = require("./user/user.model.server");
const { TeamModelApi } = require("./team/team.model.server");
const { CourseModelApi } = require("./course/course.model.server");
const { ProjectModelApi } = require("./project/project.model.server");

const model = {
    userModel:UserModelApi,
    courseModel:CourseModelApi,
    teamModel:TeamModelApi,
    projectModel:ProjectModelApi
};

ProjectModelApi.setModel(model);
TeamModelApi.setModel(model);
UserModelApi.setModel(model);
CourseModelApi.setModel(model);

module.exports = {
    model
};