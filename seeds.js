var mongoose = require("mongoose"),
    Task = require("./task-model");


var tasks = [
        {
            title: "Task 1",
            description: "Something to do",
            created: Date.now(),
            checked: false
        },
        {
            title: "Task 2",
            description: "Something to do",
            created: Date.now(),
            checked: false
        },
        {
            title: "Task 3",
            description: "Something to do",
            created: Date.now(),
            checked: false
        },
    ];
    
function seedDB(){
            tasks.forEach(function(task){
            Task.create(task,function(err,data){
                console.log("Seeding task", task);
                if(err) {
                    console.log("error: ", err);
                    console.log("=============");
                } else {
                    console.log("Created task, success: ", data);
                    console.log("==============================")
                }
            });
        });
}
module.exports = seedDB;