
var { mongoose } = require("../database.js");
var CourseSchema = mongoose.Schema({
    name: String,
    dateCreated: {type: Date, default: Date.now},
},{collection:"course"});

module.exports = {
    CourseSchema
};