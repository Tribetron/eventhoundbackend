const express = require('express');
const app = express();
const _port = 1936;
const mysql = require('mysql');
const bodyParser = require("body-parser");
const cors = require("cors");
const { create_user } = require('./routes/index');
const houndRoutes = express.Router();
const version = 'v1';
require('./routes/index');

app.use(cors());
app.use(bodyParser.json());
app.use("/", houndRoutes);

const db = mysql.createConnection({
    user:'tatenda',
    host:'127.0.0.1',
    password:'Tatenda2021.',
    database:'eventhound',
})



// default access endpoint
houndRoutes.route("/").get((req, res) => {
    res.json("Welcome to the eventhound server, contact admin for access");
    console.log(version+create_user);
   });

// API to create a new user
houndRoutes.route("/v1/users/create").post((req,res)=>{
    const user_data = req.query;
    const username = user_data.username;
    const password = user_data.password;
    const role = user_data.role;

    db.query('INSERT INTO users (username,password,role) VALUES ("'+username+'","'+password+'","'+role+'")',(err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})


 
app.listen(_port,()=>{
    console.log("app running on port " + _port)
})









