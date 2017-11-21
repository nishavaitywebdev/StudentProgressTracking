module.exports = function () {
    var mongoose = require("mongoose");
    var TeamSchema = mongoose.Schema({
        members: [{type : mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
        ownedBy: {type : mongoose.Schema.Types.ObjectId, ref:'UserModel'},
        projectId: {type : mongoose.Schema.Types.ObjectId, ref:'ProjectModel'},
        dateCreated: {type: Date, default: Date.now}
    },{collection:"team"});
    return TeamSchema;
}