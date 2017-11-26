
var { mongoose } = require("../database.js");
var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    token: String,
    url: String,
    origFileName: String,
    email: String,
    phone: String,
    role: {type:String, default:"STUDENT", enum:['ADMIN', 'STUDENT', 'SPONSOR', 'FACULTY']},
    aboutMyself: String,
    coursesCompleted: [{type : mongoose.Schema.Types.ObjectId, ref:'CourseModel'}],
    projectPreferences: [{type : mongoose.Schema.Types.ObjectId, ref:'ProjectModel'}],
    dateCreated: {type: Date, default: Date.now},
},{collection:"user"});

module.exports = {
    UserSchema
};