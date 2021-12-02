const express = require('express');
const app = express();
const _port = 1936;
const mysql = require('mysql');
const bodyParser = require("body-parser");
const cors = require("cors");
const { create_user } = require('./routes/index');
const houndRoutes = express.Router();
const version = 'v1';
require('./routes/index.js');

app.use(cors());
app.use(bodyParser.json());
app.use("/", houndRoutes);
// require("env").config();

const db = mysql.createConnection({
    user:'root',
    host:'127.0.0.1',
    password: '',
    //password:'Tatenda2021.',
    database:'eventhound',
})

// db.then(()=>{
//     console.log("connection created successfully")
// })

// 0.default access endpoint
houndRoutes.route("/").get((req, res) => {
    res.json("Welcome to the eventhound server, contact admin for access");   // /v1/users/create
    console.log(version+create_user);
});

// 1.API to create a new user
//houndRoutes.route("/v1/users/create").post((req,res)=>{
houndRoutes.route(create_user).post((req,res)=>{
    const user_data = req.query;
    const username = user_data.username;
    const password = user_data.password;
    const role = user_data.role;

    db.query('INSERT INTO users (username, password, role) VALUES ("'+username+'", "'+password+'", "'+role+'")', (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 2.API to login user
houndRoutes.route("/v1/users/login").get((req,res)=>{
    const user_data = req.query;
    const username = user_data.username;
    const password = user_data.password;
    const role = user_data.role;
    db.query("SELECT * FROM users WHERE username = '"+username+"' && password = '"+password+"';", (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 3.API to edit user
houndRoutes.route("/v1/users/edit").post((req,res)=>{
    const user_data = req.query;
    const username = user_data.username;
    const password = user_data.password;
    const role = user_data.role;
    db.query("UPDATE users SET username = '"+username+"', password = '"+password+"', role = '"+role+"'", (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 4.API to view a single new user
houndRoutes.route("/v1/users/single").get((req,res)=>{
    const user_data = req.query;
    const username = user_data.username;
    const password = user_data.password;
    const role = user_data.role;

    db.query("SELECT * FROM users WHERE username = '"+username+"' && password = '"+password+"';", (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 5.API to list all user
houndRoutes.route("/v1/users/list").get((req,res)=>{
    const user_data = req.query;
    const username = user_data.username;
    const password = user_data.password;
    const role = user_data.role;

    db.query('SELECT * FROM users',(err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 6.API to delete a user
houndRoutes.route("/v1/users/delete").post((req,res)=>{
    const user_data = req.query;
    const username = user_data.username;
    const password = user_data.password;
    const role = user_data.role;

    db.query("DELETE FROM users WHERE username = '"+username+"' && role = '"+role+"';",(err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 7.API to reset password
houndRoutes.route("/v1/users/password-forgot").post((req,res)=>{
    const user_data = req.query;
    const username = user_data.username;
    db.query("UPDATE users SET password = '"+password+"'", (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 8.API to google login


// 9.API to facebook login

 
app.listen(_port,()=>{
    console.log("app running on port " + _port)
})

