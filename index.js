//acuiqring modules
require('dotenv').config()
const bodyParser = require('body-parser');
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userRoute  = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute  = require("./routes/order");

//swagger acquiring
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express'); 

const app  = express();
app.use(bodyParser.urlencoded({extended: true}));

//extended(https://swagger.io/specification/)
const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title: "Customer API",
            description: "API for E-commerce operations",
            contact:{
                name: "nanda21"
            },
            servers: ["https://localhost:5000"]
        }
    },
    // ['/routes/*.js]
    apis: [".routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


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
app.use("/api/auth",authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts",cartRoute);
app.use("/api/orders",orderRoute);


//server running
app.listen(process.env.PORT || 5000, () => {
    console.log("Backend Server is running");
})