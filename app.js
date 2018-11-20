var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    Task = require("./task-model"),
    methodOverride = require("method-override"),
    seedDB = require("./seeds"),
    expressSession = require("express-session"),
    flash = require("connect-flash"),
    config = require("./config");
    
    

var app = express();


mongoose.connect(config.MONGODB_URI,{useNewUrlParser: true});
// seed database if empty:
//seedDB();

app.set("view engine","ejs");
app.use(flash());
app.use(expressSession({
    secret: "My secret DanceWithTheDead",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname+'/public'));

// middleware pass variables
app.use(function(req,res,next){
    res.locals.flashDescription = "test content";
    res.locals.success = req.flash("success");
    
    
    next();
})
    
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
            req.flash("success", `Updated: ${req.body.task.title}`);
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
                    req.flash("success",`Deleted: ${document.title}`);
                    req.flash("flashDescription", `test ${document.description}`);
                    res.redirect("/tasks");
                }
            });
        
   
        
    
    
});

app.get("*", function(req,res){
    res.send("<h1>No page here...</h1")
});

app.listen(config.PORT,config.IP,function(){
    console.log("Task List Server started!");
    console.log("IP address: ", config.IP);
    console.log("PORT: ", config.PORT);
   
})
