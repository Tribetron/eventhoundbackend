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
const { list_venues } = require('./routes/index.js');
const { delete_venue } = require('./routes/index.js');
const { list_single_venue } = require('./routes/index.js');


// Venues
const { book_venue, create_venue, create_venue_step_one, create_venue_step_two, create_venue_step_three, create_venue_step_four,
    create_venue_step_five, create_venue_step_six, create_venue_step_seven, create_venue_step_eight, create_venue_step_nine } = require('./routes/index.js');

// Menus
const {list_venue_menus, list_venue_contracts } = require('./routes/index.js');


// Venue Details
const {list_venue_details, get_featured_places, get_last_minute_deals_places} = require('./routes/index.js');




// Rooms

const {get_room_details, get_room_pricing, update_room_pricing, add_favourite_place} = require('./routes/index.js');






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


// 14. API to create a new venue

houndRoutes.route(create_venue).post((req,res)=>{

    const { user_id, event_type, isFeatured, hasLastMinuteDeals, 
        lastMinuteDealsDiscount,photoUrl, placeName, corporateName, 
        inCorporateNumber, address, state, city, noticeRequired, autoConfirm, 
        availableTiming, advanceDeposit, paymentStructure, guestDeposit, specialInstruction, 
        accountNumber, transitNumber,InstitutionNumber, chequeName, chequeAddress, 
        lat, lng, placeStatus, placeFeaturedStatus, placeSponsoredStatus, 
        placeContract, placeContractPdf, dateCreated } = req.body
    
    let qr = "INSERT INTO event_places (user_id, event_type, isFeatured, hasLastMinuteDeals, lastMinuteDealsDiscount,photoUrl, placeName, corporateName, inCorporateNumber, address, state, city, noticeRequired, autoConfirm, availableTiming, advanceDeposit, paymentStructure, guestDeposit, special_instruction, accountNumber, transitNumber,InstitutionNumber, chequeName, chequeAddress, lat, lng, placeStatus, placeFeaturedStatus, placeSponsoredStatus, placeContract, placeContractPdf, dateCreated) VALUES ('"+user_id+"', '"+event_type+"', '"+isFeatured+"', '"+hasLastMinuteDeals+"', '"+lastMinuteDealsDiscount+"','"+photoUrl+"', '"+placeName+"', '"+corporateName+"', '"+inCorporateNumber+"', '"+address+"', '"+state+"', '"+city+"', '"+noticeRequired+"', '"+autoConfirm+"', '"+availableTiming+"', '"+advanceDeposit+"', '"+paymentStructure+"', '"+guestDeposit+"', '"+specialInstruction+"', '"+accountNumber+"', '"+transitNumber+"','"+InstitutionNumber+"', '"+chequeName+"', '"+chequeAddress+"', '"+lat+"', '"+lng+"', '"+placeStatus+"', '"+placeFeaturedStatus+"', '"+placeSponsoredStatus+"', '"+placeContract+"', '"+placeContractPdf+"', '"+dateCreated+"');"
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})


// 14. API to step by step update venue
houndRoutes.route(create_venue_step_one).post((req,res)=>{

    const { email, contact_person, contact_number, corporate_name, in_corporate_number,mail_frequency, place_name, address, city, state, status, token, user_id, autoconfirm, notice_required, open_time, close_time } = req.body
    
    let qr = "INSERT INTO venue (email, contact_person, contact_number, corporate_name, in_corporate_number,mail_frequency, place_name, address, city, state, status, token, user_id, autoconfirm, notice_required, open_time, close_time) VALUES ('"+email+"', '"+contact_person+"', '"+contact_number+"', '"+corporate_name+"', '"+in_corporate_number+"','"+mail_frequency+"', '"+place_name+"', '"+address+"', '"+city+"', '"+state+"', '"+status+"', '"+token+"', '"+user_id+"', '"+autoconfirm+"', '"+notice_required+"', '"+open_time+"', '"+close_time+"');"
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 15. API create venue step two
houndRoutes.route(create_venue_step_two).put((req,res)=>{

    const { autoConfirm, noticeRequired, place_id } = req.body
    
    let qr = "UPDATE venue SET autoconfirm = '"+autoConfirm+"', notice_required = '"+noticeRequired+"' WHERE venue_id = '"+place_id+"';"
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})


// 16. API create venue step three
houndRoutes.route(create_venue_step_three).post((req,res)=>{

    const { openTime, closeTime, place_id } = req.body
    
    let qr = "INSERT INTO venue_hours (open_time, close_time, place_id) VALUES ('"+openTime+"','"+closeTime+"','"+place_id+"');"
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 17. API create venue step four // TODO - iterate through multiple files and upload
houndRoutes.route(create_venue_step_four).post((req,res)=>{
    let files = []

    if (typeof req.body.files === "string") {
        files.push(req.body.files);
    } else {
        files = req.body.files;
    }

    const { token, place_id, menu_name } = req.body
    
    let qr = "INSERT INTO venue_menus (token, place_id, menu_name) VALUES ('"+token+"','"+place_id+"','"+menu_name+"');"
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})


// 18. API create venue step five
houndRoutes.route(create_venue_step_five).post((req,res)=>{

    const { advanceDeposit, guestDeposit, place_id, special_instruction, transitNumber, institutionNumber, accountNumber, chequeName, chequeAddress } = req.body
    
    let qr = "INSERT INTO venue_deposits (advance_deposit, guest_deposit, place_id,special_instruction, transit_number, institution_number, account_number, cheque_name, cheque_address) VALUES ('"+advanceDeposit+"','"+guestDeposit+"','"+place_id+"','"+special_instruction+"','"+transitNumber+"','"+institutionNumber+"','"+accountNumber+"','"+chequeName+"','"+chequeAddress+"');"
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})


// 19. API create venue step six --- CREATE ROOM
houndRoutes.route(create_venue_step_six).post((req,res)=>{

    const { room_name, maximum_guests, maximum_guests_seated, maximum_guests_seated_with_dance_floor, room_description, place_id } = req.body
    
    let qr = "INSERT INTO rooms (room_name, maximum_guests, maximum_guests_seated, maximum_guests_seated_with_dance_floor, room_description, place_id) VALUES ('"+room_name+"','"+maximum_guests+"','"+maximum_guests_seated+"','"+maximum_guests_seated_with_dance_floor+"','"+room_description+"','"+place_id+"');"
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 20. API create venue step seven
houndRoutes.route(create_venue_step_seven).post((req,res)=>{

    const { } = req.body
    
    let qr = ""
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 21. API create venue step eight - PRICING
houndRoutes.route(create_venue_step_eight).post((req,res)=>{

    const { startDate, endDate, room_id, dayPrice, nightPrice, fullDayPrice,minSpendDay,minSpendNight, minSpendFullDay} = req.body
    
    let qr = "INSERT INTO room_pricing (startDate, endDate, room_id, dayPrice, nightPrice, fullDayPrice,minSpendDay,minSpendNight, minSpendFullDay) VALUES ('"+startDate+"','"+endDate+"','"+room_id+"','"+dayPrice+"','"+nightPrice+"','"+fullDayPrice+"','"+minSpendDay+"','"+minSpendNight+"','"+minSpendFullDay+"');"
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})




// 22.API to list all venues
houndRoutes.route(list_venues).get((req,res)=>{
    const venue_data = req.query;
    const place_id = venue_data.place_id;
    const place_name = venue_data.placeName;
    const corporate_name = venue_data.corporateName;

    db.query('SELECT * FROM event_places;',(err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})


// 23. API get list of menus for a venue
// Route : /auth/getMenuList'
houndRoutes.route(list_venue_menus).get((req,res)=>{

    const { place_id } = req.query
    
    let qr = "SELECT * FROM venue_menus WHERE place_id = '"+place_id+"'";
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})


// 24. API get contracts for a venue
// Route : /auth/getContractList'
houndRoutes.route(list_venue_contracts).get((req,res)=>{

    const { place_id } = req.query
    
    let qr = "SELECT * FROM venue_contracts WHERE place_id = '"+place_id+"'";
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})


// 25. API get venue details
// Route : /auth/getVenueDetail
houndRoutes.route(list_venue_details).get((req,res)=>{

    const { place_id } = req.query


    console.log(place_id)
    
    let qr = "SELECT * FROM venue WHERE venue_id = '"+place_id+"'";
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})


// 26. API get featured places
// Route : /api/getFeaturePlaces
houndRoutes.route(get_featured_places).get((req,res)=>{

        
    let qr = "SELECT * FROM venue INNER JOIN featured_venues ON venue.venue_id = featured_venues.place_id WHERE featured_venues.featured = 1";
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 26. API get last minute deals
// Route : /api/getLastMinuteDealPlaces
houndRoutes.route(get_last_minute_deals_places).get((req,res)=>{

        
    let qr = "SELECT * FROM last_minute_deals INNER JOIN venue ON venue.venue_id = last_minute_deals.place_id";
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})


// 27. API get room details
// Route : /api/getRoomDetails
houndRoutes.route(get_room_details).get((req,res)=>{

    const room_id = req.query.room_id
        
    let qr = "SELECT * FROM rooms where room_id = '"+room_id+"'";
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})

// 28. API get room pricing
// Route : /auth/getRoomPricing
houndRoutes.route(get_room_pricing).get((req,res)=>{

    const room_id = req.query.room_id
        
    let qr = "SELECT * FROM room_pricing where room_id = '"+room_id+"'";
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})


// 29. API add favourite place
// Route : /auth/addFavourite
houndRoutes.route(add_favourite_place).post((req,res)=>{

    const {room_id, user_id} = req.body
        
    let qr = "INSERT INTO favourite_places (user_id, room_id) VALUES ('"+user_id+"','"+room_id+"')";
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})






  
app.listen(_port,()=>{
    console.log("app running on port " + _port)
})

