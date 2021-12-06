const express = require('express');
const app = express();
const _port = 1936;
const mysql = require('mysql');
const bodyParser = require("body-parser");
const cors = require("cors");
const { create_user } = require('./routes/index');
const { json } = require('body-parser');
const houndRoutes = express.Router();
const version = 'v1';
require('./routes/index.js');

app.use(cors());
app.use(bodyParser.json());
app.use("/", houndRoutes);
// require("env").config();

const db = mysql.createConnection({
    user:'tatenda',
    host:'127.0.0.1',
    // password: '',
    password:'Tatenda2021.',
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
    const first_name = user_data.first_name;
    const last_name = user_data.last_name;
    const birthday = user_data.birthday;
    const gender = user_data.gender;
    const phone = user_data.phone_number;
    const role = user_data.role;

 
    db.query('INSERT INTO users (username, password,role,first_name,last_name,birthday,gender,phone_number) VALUES ("'+username+'", "'+password+'","'+role+'", "'+first_name+'","'+last_name+'","'+birthday+'","'+gender+'","'+phone+'")', (err,result)=>{
        if(err){
        res.json(err);
        }
        // console.log(err);
        // console.log(json);
        res.send(result);
    })
})

// 2.API to login user
houndRoutes.route("/v1/users/login").get((req,res)=>{
    const user_data = req.query;
    const username = user_data.username;
    const password = user_data.password;
    db.query("SELECT * FROM users c && password = '"+password+"';", (err,result)=>{
        if(err){
        res.json(err);
        }
        if(result.length>0){
            res.json(result);
        }else{
            res.json(false);
        }
    })
})

// 3.API to edit user
houndRoutes.route("/v1/users/edit").post((req,res)=>{
    const user_data = req.query;
    const username = user_data.username;
    const password = user_data.password;
    const role = user_data.role;
    const first_name = user_data.first_name;
    const last_name = user_data.last_name;
    const birthday = user_data.birthday;
    const gender = user_data.gender;
    const phone = user_data.phone_number;

    db.query('UPDATE users (username, password,role,first_name,last_name,birthday,gender,phone_number) VALUES ("'+username+'", "'+password+'","'+role+'", "'+first_name+'","'+last_name+'","'+birthday+'","'+gender+'","'+phone+'") WHERE username = "'+username+'"', (err,result)=>{
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

    db.query("SELECT * FROM users WHERE username = '"+username+"'", (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 5.API to list all user
houndRoutes.route("/v1/users/list").get((req,res)=>{
    const user_data = req.query;

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

    db.query("DELETE FROM users WHERE username = '"+username+"';",(err,result)=>{
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
    db.query("UPDATE users  SET password = '"+password+"' WHERE username = '"+username+"'", (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 8.API to google login


// 9.API to facebook login

// eventhounds vendor login
// forgot password link and endpoint

// 11. event guest registrations
// 13.API to create a new user vendor user
//houndRoutes.route("/v1/users/create").post((req,res)=>{
    houndRoutes.route('/venue/create').post((req,res)=>{
        const ud = req.query;
        const venue_name = ud.venue_name;
        const corporate_name = ud.corporate_name;
        const business_number = ud.business_number;
        const address = ud.address;
        const venue_phone = ud.publi_phone_venue;
        const contact_person = ud.contact_person;
        const contact_phone = ud.contact_phone;
        const email = ud.email_address;
        const password = ud.password;
        const advance_notice = ud.advance_notice;
        const booking_style = ud.booking_style;
        const hoursDayA = ud.hoursDayA;
        const hoursDayB = ud.hoursDayB;
        const hoursNightA = ud.hoursNightA;
        const hoursNightB = ud.hoursNightB;
        const hoursAllDayA = ud.hoursAllDayA;
        const hoursAllDayB = ud.hoursAllDayB;
        const bridal_shower = ud.bridal_showerImage;
        const baby_shower = ud.baby_showerImage;
        const deluxBar= ud.deluxBar;
        const premiumBar= ud.premiumBar;
        const threecourseDineer= ud.threeCourseDinner;
        const fourcourseDinner= ud.threeCourseDinner;
        const threecourseLunch= ud.threecourseLunch;
        const fourcourseLunch= ud.fourcourseLunch;
        const latenight= ud.latenight;
        const seafood= ud.seafood;
        const antipasto= ud.antipasto;
        const moreA= ud.moreA;
        const moreb= ud.moreB;
        const moreC= ud.moreC;
        const moreD= ud.moreD;
        const moreE= ud.moreE;
        const moreF= ud.moreF;
        const moreG= ud.moreG;
        const moreH= ud.moreH;
        const moreI= ud.moreI;
        const contractText= ud.contractText;
        const contractImage= ud.contractImage;
        const depositsPec= ud.depositPec;
        const paymentStruc= ud.paymentStruc;
        const securityDeposit= ud.securityDeposit;
        const specialInstr= ud.specialInstr;
        const transitNumber= ud.transitNumber;
        const institutionNumber= ud.institutionNumber;
        const accountNumber= ud.accountNumber;
        const paymentThroughCheque= ud.paymentThroughCheque;
        const venueRoomName= ud.venueRoomName;
        const roomCapacity= ud.roomCapacity;
        const roomphoto= ud.photo;
        const roomVideo= ud.video;


        
        db.query('INSERT INTO users (username,) VALUES ("'+username+'")', (err,result)=>{
            if(err){
            res.json(err);
            }
            // console.log(err);
            // console.log(json);
            res.send(result);
        })
    })


 
app.listen(_port,()=>{
    console.log("app running on port " + _port)
})

