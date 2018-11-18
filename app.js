var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    Task = require("./task-model"),
    methodOverride = require("method-override"),
    seedDB = require("./seeds");
    
    

var app = express();


mongoose.connect("mongodb://localhost:27017/tasks_app",{useNewUrlParser: true});
// seed database if empty:
//seedDB();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname+'/public'));

    
app.get("/",function(req,res){
    
    res.redirect("/tasks");
});

app.get("/tasks",function(req,res){
    Task.find({},function(err,tasks){
        if (err) console.log("Find all tasks, something went wrong: ",err)
        else {
            res.render("index",{tasks});
        }
    })
    

});

app.get("/tasks/new",function(req,res){
   res.render("new"); 
});

app.get("/tasks/:id",function(req,res){
    Task.findById(req.params.id,function(err,task){
        if (err) {
            console.log("Task - findById error: ",err);
            console.log("======================");
        } else {
            console.log("Task found by id: ", task);
            console.log("=====================");
            // res.send({task});
            res.render("show",{task});
        }
    })
    
});



app.post("/tasks",function(req,res){
    
    Task.create(req.body.task, function(err,task){
        if (err) {
            console.log("error creating new task: ",err);
            console.log("=======================");
        } else {
            console.log("created new task: ",task);
            console.log("=======================");
            res.redirect("/tasks");
        }
    });
});

app.put("/tasks/:id", function(req,res){
    Task.findByIdAndUpdate(req.params.id,req.body.task,function(err,task){
        if (err) {
            console.log("Error updating task: ", err);
            console.log("=====================");
        } else {
            console.log("Task updated: ",task);
            console.log("=====================");
            res.redirect("/tasks");
            
        }
    })
});

app.delete("/tasks/:id",function(req,res){
   
        Task.findByIdAndDelete(req.params.id,function(err,document){
            if (err) {
                console.log("Error deleting document with id: ", req.params.id );
                console.log(err);
                console.log("=====================");
            } else {
                console.log("Deleted document: ", document);
                console.log("=====================");
                res.redirect("/tasks");
            }
        });
    
    
});

app.get("*", function(req,res){
    res.send("<h1>No page here...</h1")
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Task List Server started!");
    console.log("IP address: ", process.env.IP);
    console.log("PORT: ", process.env.PORT);
})
