var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "http://www.dodgeridge.com/wp-content/uploads/2013/08/Eureka_Valley_web.jpg",
//         description: "This is a huge granite hill. No bathrooms. No water. Beautiful granite!"
        
//     }, function(err, campground) {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     });

var campgrounds = [
        {name: "Salmon Creek", image: "https://farm5.staticflickr.com/4123/4943676109_b93d9c1203.jpg"},   
        {name: "Granite Hill", image: "https://farm7.staticflickr.com/6082/6142484013_74e3f473b9.jpg"},   
        {name: "Mountain Goat's Rest", image: "https://farm6.staticflickr.com/5694/21041875770_ffea6404d0.jpg"}, 
        // {name: "Salmon Creek", image: "http://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/10/main/hoodview-campground-0510.jpg?itok=B8Eb65Uf"},   
        // {name: "Granite Hill", image: "http://www.dodgeridge.com/wp-content/uploads/2013/08/Eureka_Valley_web.jpg"},   
        // {name: "Mountain Goat's Rest", image: "http://blog.koa.com/wp-content/uploads/unique-campgrounds-626x417.jpg"},
        // {name: "Salmon Creek", image: "http://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/10/main/hoodview-campground-0510.jpg?itok=B8Eb65Uf"},   
        // {name: "Granite Hill", image: "http://www.dodgeridge.com/wp-content/uploads/2013/08/Eureka_Valley_web.jpg"},   
        // {name: "Mountain Goat's Rest", image: "http://blog.koa.com/wp-content/uploads/unique-campgrounds-626x417.jpg"}
];

app.get("/", function(req, res) {
   res.render("landing"); 
});

// INDEX: SHOW ALL CAMPGROUNDS
app.get("/campgrounds", function(req, res) {
    // Get all  campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds}); 
        }
    });
});

// CREATE: ADD NEW CAMPGROUND TO DB
app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //   Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

// NEW: SHOW FORM TO CREATE NEW CAMPGROUND
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

// SHOW: SHOWS MORE INFO ABOUT ONE CAMPGROUND
app.get("/campgrounds/:id", function(req, res) {
    // find the campground with provided id
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
           // render show template with that campground
           res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("The YelpCamp server has started!");
});