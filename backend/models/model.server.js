module.exports = function () {
    var mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost/capstone");
    var userModel = require("./user/user.model.server")();
    var teamModel = require("./team/team.model.server")();
    var courseModel = require("./course/course.model.server")();
    var projectModel = require("./project/project.model.server")();
    var model = {
        userModel:userModel,
        courseModel:courseModel,
        teamModel:teamModel,
        projectModel:projectModel
    };
    projectModel.setModel(model);
    teamModel.setModel(model);
    userModel.setModel(model);
    courseModel.setModel(model);
    return model;
};