module.exports = function () {
    var mongoose = require("mongoose");
    var CourseSchema = mongoose.Schema({
        name: String,
        dateCreated: {type: Date, default: Date.now}
    },{collection:"course"});
    return CourseSchema;
}