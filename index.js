const express = require('express');
const app = express();
const _port = 1939;
const mysql = require('mysql');
const bodyParser = require("body-parser");
const cors = require("cors");

const { create_user } = require('./routes/index.js');
const { login_user } = require('./routes/index.js');
const { edit_user } = require('./routes/index.js');
const { list_users } = require('./routes/index.js');
const { delete_account } = require('./routes/index.js');
const { single_user } = require('./routes/index.js');
const { search_venue } = require('./routes/index.js');
const { delete_venue } = require('./routes/index.js');
const { list_single_venue } = require('./routes/index.js');
const { book_venue } = require('./routes/index.js');

const { forgot_password } = require('./routes/index.js');

const houndRoutes = express.Router();
const version = 'v1';
require('./routes/index.js');

app.use(cors());
app.use(bodyParser.json());
app.use("/", houndRoutes);
app.use(express.static("public"));
// require("env").config();

const db = mysql.createConnection({
    user:'root',
    host:'127.0.0.1',
    password: '',
    database:'eventhound',
})

// db.then(()=>{
//     console.log("connection created successfully")
// })

/*/ 0.default access endpoint
houndRoutes.route("/").get((req, res) => {
    res.json("Welcome to the eventhound server, contact admin for access");
    console.log(create_user);
});*/

// 1.API to create a new user
houndRoutes.route(create_user).post((req,res)=>{
    const user_data = req.query;
    const username = user_data.username;
    const password = user_data.password;
    const role = user_data.role;

    db.query('INSERT INTO users (username, password, role) VALUES ("'+username+'", "'+password+'", "'+role+'");', (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 2.API to login user
houndRoutes.route(login_user).get((req,res)=>{
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
houndRoutes.route(edit_user).post((req,res)=>{
    const user_data = req.query;
    const username = user_data.username;
    const password = user_data.password;
    const role = user_data.role;
    db.query("UPDATE users SET username = '"+username+"', password = '"+password+"', role = '"+role+"';", (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 4.API to view a single new user
houndRoutes.route(single_user).get((req,res)=>{
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
houndRoutes.route(list_users).get((req,res)=>{
    const user_data = req.query;
    const username = user_data.username;
    const password = user_data.password;
    const role = user_data.role;

    db.query('SELECT * FROM users;',(err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 6.API to delete a user
houndRoutes.route(delete_account).post((req,res)=>{
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
houndRoutes.route(forgot_password).post((req,res)=>{
    const user_data = req.query;
    const username = user_data.username;
    db.query("UPDATE users SET password = '"+password+"';", (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 8.API to google login


// 9.API to facebook login

// 10.API to search for a venue
houndRoutes.route(search_venue).get((req,res)=>{
    const venue_data = req.query;

    const location = venue_data.location;
    const type = venue_data.type;
    const time = venue_data.time;
    const date = venue_data.date;
    const count = venue_data.count;
    const minprice = venue_data.minprice;
    const maxprice = venue_data.maxprice;

    db.query("SELECT * FROM venbook WHERE location = '"+location+"' OR type = '"+type+"' OR time = '"+time+"' OR date = '"+date+"' OR count = '"+count+"' OR minprice = '"+minprice+"' OR maxprice = '"+maxprice+"';", (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 11.API to delete a venue
houndRoutes.route(delete_venue).get((req,res)=>{
    const venue_data = req.query;
    const location = venue_data.location;
    const type = venue_data.type;
    const time = venue_data.time;
    const date = venue_data.date;
    const count = venue_data.count;
    const minprice = venue_data.minprice;
    const maxprice = venue_data.maxprice;

    db.query("DELETE * FROM venbook WHERE location = '"+location+"' OR type = '"+type+"' OR time = '"+time+"' OR date = '"+date+"' OR count = '"+count+"' OR minprice = '"+minprice+"' OR maxprice = '"+maxprice+"';", (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 12.API to view a single venue
houndRoutes.route(list_single_venue).get((req,res)=>{
    const venue_data = req.query;
    const location = venue_data.location;
    const type = venue_data.type;
    const time = venue_data.time;
    const date = venue_data.date;
    const count = venue_data.count;
    const minprice = venue_data.minprice;
    const maxprice = venue_data.maxprice;

    db.query("SELECT * FROM venbook WHERE location = '"+location+"' OR type = '"+type+"' OR time = '"+time+"' OR date = '"+date+"' OR count = '"+count+"' OR minprice = '"+minprice+"' OR maxprice = '"+maxprice+"';", (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 13.API to book a venue
houndRoutes.route(book_venue).get((req,res)=>{
    const venue_data = req.query;
    const location = venue_data.location;
    const type = venue_data.type;
    const time = venue_data.time;
    const date = venue_data.date;
    const count = venue_data.count;
    const minprice = venue_data.minprice;
    const maxprice = venue_data.maxprice;
    
    db.query("INSERT INTO venbook (location, type, time, date, count, minprice, maxprice) VALUES ('"+location+"', '"+type+"', '"+time+"', '"+date+"', '"+count+"', '"+minprice+"', '"+maxprice+"');", (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})
  
app.listen(_port,()=>{
    console.log("app running on port " + _port)
})

