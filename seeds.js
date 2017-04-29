var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm8.staticflickr.com/7457/9586944536_9c61259490.jpg",
        description: "blah blah blah"
    }, 
    {
        name: "Desert Mesa",
        image: "https://farm6.staticflickr.com/5059/5518252117_d232831997.jpg",
        description: "blah blah blah"
    }, 
    {
        name: "Canyon Floor",
        image: "https://farm6.staticflickr.com/5046/5330257235_072c983c0d.jpg",
        description: "blah blah blah"
    }    
]

function seedDB() {
    // remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        // add a few campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish it had internet",
                            author: "Homer"
                        }, function(err, comment) {
                            if(err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created a new comment");
                            }
                        });
                }
            }); 
        });
    });
}

module.exports = seedDB;