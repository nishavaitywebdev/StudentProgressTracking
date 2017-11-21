module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstname: String,
        lastname: String,
        email: String,
        phone: String,
        role: {type:String, default:"STUDENT", enum:['ADMIN', 'STUDENT', 'SPONSOR', 'FACULTY']},
        aboutMyself: String,
        coursesCompleted: [{type : mongoose.Schema.Types.ObjectId, ref:'CourseModel'}],
        projectPreferences: [{type : mongoose.Schema.Types.ObjectId, ref:'ProjectModel'}],
        dateCreated: {type: Date, default: Date.now}
    },{collection:"user"});
    return UserSchema;
}