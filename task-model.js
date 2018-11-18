var mongoose = require("mongoose");



var taskSchema = mongoose.Schema(
    {
        title: String,
        description: {type: String, default: ""},
        created: {type: Date, default: Date.now},
        checked: {type: Boolean, default: false}
    });
    
module.exports = mongoose.model("Task",taskSchema);