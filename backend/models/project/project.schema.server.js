
var { mongoose } = require("../database.js");
var ProjectSchema = mongoose.Schema({
    name: String,
    desc: String,
    topic: String,
    expectedResult: String,
    url: String,
    slackChannel: String,
    origFileName: String,
    teamSize: Number,
    term: String,
    ownedBy: {type : mongoose.Schema.Types.ObjectId, ref:'UserModel'},
    teamId: {type : mongoose.Schema.Types.ObjectId, ref:'TeamModel'},
    instructor: {type : mongoose.Schema.Types.ObjectId, ref:'UserModel'},
    state: {type:String, default:"ACTIVE", enum:['INACTIVE', 'PROPOSED', 'ACTIVE', 'IN-PROGRESS', 'COMPLETED']},
    preferredBy: [{type : mongoose.Schema.Types.ObjectId, ref:'UserModel'}],
    dateCreated: {type: Date, default: Date.now},
},{collection:"project"});

module.exports = {
    ProjectSchema
};