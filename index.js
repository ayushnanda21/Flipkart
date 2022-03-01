//acuiqring modules
require('dotenv').config()
const bodyParser = require('body-parser');
const express = require("express");
const mongoose = require("mongoose");
const userRoute  = require("./routes/user");

const app  = express();

app.use(bodyParser.urlencoded({extended: true}));


//connecting database
//connecting mongodb database
mongoose.connect(process.env.MONGO_URL, {UseNewUrlParser: true},function(err){
    if(err){
        console.log(err);
    } else{
        console.log("Connecting............")
        console.log("Database is Connected Successfully!");
    }
});

// api routes /endpoints
app.use(express.json());
app.use("/api/users",userRoute);




//server running
app.listen(process.env.PORT || 5000, () => {
    console.log("Backend Server is running");
})