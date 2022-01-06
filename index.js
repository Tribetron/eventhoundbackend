const express = require('express');
const app = express();
const path = require("path")
const _port = 1939;
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer")
const multerS3 = require("multer-s3")
const aws = require("aws-sdk")
const dotenv = require("dotenv")

dotenv.config()

aws.config.update({
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID,
    region: 'us-west-2'
})

const s3 = new aws.S3();

const s3Upload = multer({
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: 'eventhoundmenus',
        key: function(req, file, cb){
            req.file = Date.now() + file.originalname,
            cb(null, Date.now() + file.originalname)
        }
    })
})

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'Uploads')
    },

    filename: (req, file, cb) =>{
        console.log(file)
        cb(null, Date.now()+ path.extname(file.originalname))
    }
    
})

const rooms_storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/rooms')
    },

    filename: (req, file, cb) =>{
        console.log(file)
        cb(null, Date.now()+ path.extname(file.originalname))
    }
    
})

const contracts_storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/contracts')
    },

    filename: (req, file, cb) =>{
        console.log(file)
        cb(null, Date.now()+ path.extname(file.originalname))
    }
    
})

const upload = multer({storage: storage})
const roomsUpload = multer({storage: rooms_storage})
const contractsUpload = multer({storage: contracts_storage})


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
    create_venue_step_five, create_venue_step_six,get_venue_features, create_venue_update_step_six, create_venue_step_seven, create_venue_step_eight, create_venue_step_nine } = require('./routes/index.js');

// Menus
const {list_venue_menus, list_venue_contracts, create_venue_contract } = require('./routes/index.js');


// Venue Details
const {list_venue_details, get_featured_places, get_last_minute_deals_places, 
    search_for_venue, update_venue_status} = require('./routes/index.js');




// Rooms

const {get_room_details, get_room_pricing, update_room_pricing, add_favourite_place, get_rooms_by_venue_id} = require('./routes/index.js');






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
    host:'localhost',
    password: '',
    database:'events',
})

db.connect((err)=>{
    if(err) throw err;
    console.log("database connection successful");
})

// 1.API to create a new user
houndRoutes.route(create_user).post((req,res)=>{
    const user_data = req.body;
    const email = user_data.email;
    const password = user_data.password;
    const first_name =  user_data.first_name;
    const last_name = user_data.last_name;
    const contact_number = user_data.contact_number;
    const status = 1;
    const referralCouponUsed = user_data.referralCouponUsed ;
    const subscribedToMailingList = 1;
    const userType = 1;
    // const gender = '';
    // const ipAddress = '';
    // const isInitialDiscountUsed = true;
    const mail_frequency = 0;
    // const phone1 = '';
    // const phone2 = '';
    const photoUrl = '';
    // const referralCouponCode = '';
    // const referralCredit = 0

    db.query('INSERT INTO users (email, password, first_name,last_name,contact_number,status,subscribedToMailingList,userType,mail_frequency,photoUrl,referralCouponUsed ) VALUES ("'
    +email+'", "'+password+'", "'+first_name +
    '", "'+last_name+'", "'+contact_number +'", "'+status+
    '", "'+subscribedToMailingList+'", "'+userType+
    '", "'+mail_frequency+'", "'+photoUrl+'", "'+referralCouponUsed+'");', 
    (err,result)=>{
        if(err){
        res.json(err);
        }
        res.json({
            status:true,
            data:result
        });
    })
})

// 2.API to login user
houndRoutes.route(login_user).post((req,res)=>{
    const user_data = req.body;
    const username = user_data.email;
    const password = user_data.password;
    // const role = user_data.role;

    db.query("SELECT * FROM users WHERE email = '"+username+"' && password = '"+password+"';", (err,result)=>{
        if(err){
        res.json(err);
        }
        if(result.length >0){
            res.json({
                status:true,
                data:result[0]
            });
        }else{ 
            res.json({
            status:false,
        });

        }
        console.log(result);
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

    const { email, contactPerson, contact_number, corporateName, inCorporateNumber,mail_frequency, placeName,
         address, city, state, status, token, user_id} = req.body
    
    let qr = "INSERT INTO venue (email, contact_person, contact_number, corporate_name, in_corporate_number,mail_frequency, place_name, address, city, state, status, token, user_id) VALUES ('"+email+"', '"+contactPerson+"', '"+contact_number+"', '"+corporateName+"', '"+inCorporateNumber+"','"+mail_frequency+"', '"+placeName+"', '"+address+"', '"+city+"', '"+state+"', '"+status+"', '"+token+"', '"+user_id+"');"
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        // console.log(err);

        }else{
            res.json({
                status:true,
                data:{
                    ...req.body,
                    place_id:result.insertId
                }
            });
        }
    })
})

// 15. API create venue step two
houndRoutes.route(create_venue_step_two).post((req,res)=>{

    const { autoConfirm, noticeRequired, place_id } = req.body
    console.log(req.body);
    
    let qr = "UPDATE venue SET autoconfirm = '"+autoConfirm+"', notice_required = '"+noticeRequired+"' WHERE venue_id = '"+place_id+"';"
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        }
        res.json({
            status:true,
            data:result
        });
    })
})


// 16. API create venue step three
houndRoutes.route(create_venue_step_three).post((req,res)=>{

    // const { openTime, closeTime, place_id } = req.body
    const day_open_time = req.body[0].openTime;
    const day_close_time = req.body[0].closeTime;
    const night_open_time = req.body[1].openTime;
    const night_close_time = req.body[1].closeTime;
    const fullday_open_time = req.body[2].openTime;
    const fullday_close_time = req.body[2].closeTime;
    const place_id = req.body[0].place_id;

    // console.log(req.body);
    let qr = "INSERT INTO venue_hours (day_open_time , day_close_time , night_open_time,night_close_time,fullday_open_time,fullday_close_time,place_id) VALUES ('"+
        day_open_time+"','"+day_close_time+
        "','"+night_open_time+"','"+night_close_time+
        "','"+fullday_open_time +"','"+fullday_close_time+"','"+place_id+"');"
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        }else{
        res.json({
            status:true,
        });
        }
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
    console.log(JSON.stringify(req.body));
    let qr = "INSERT INTO venue_menus (token, place_id, menu_name) VALUES ('"+token+"','"+place_id+"','"+menu_name+"');"
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        }
        res.send(result);
    })
})


// 17.1 step five insert into venue contracts 
// Route: /auth/placeContract
houndRoutes.route(create_venue_contract).post( contractsUpload.single('pdf'), (req,res)=>{

    const { place_id,contractDetails} = req.body;
    // let contract_file = 'uploads/contracts/'+req.file.filename;
    console.log(req.body);
    let contract_file = 'uploads/contracts/';

    let qr = "INSERT INTO venue_contracts (venue_contract_text, contract_file, place_id) VALUES ('"+contractDetails+"','"+contract_file+"','"+place_id+"');"
    
    db.query(qr, (err,result)=>{
        if(err){
        res.json(err);
        }
        res.json({
            status:true,
            data:result
        });
    })
})



// 18. API create venue step five
houndRoutes.route(create_venue_step_five).post((req,res)=>{

    const { advanceDeposit, guestDeposit, paymentStructure,place_id, 
        special_Instruction, transitNumber, institutionNumber, 
        accountNumber, chequeName, chequeAddress } = req.body
    
    let qr = "INSERT INTO venue_deposits (advance_deposit, guest_deposit,payment_structure, place_id,special_instruction, transit_number, institution_number, account_number, cheque_name, cheque_address) VALUES ('"+advanceDeposit+"','"+guestDeposit+"','"+paymentStructure+"','"+place_id+"','"+special_Instruction+"','"+transitNumber+"','"+institutionNumber+"','"+accountNumber+"','"+chequeName+"','"+chequeAddress+"');"
    
    db.query(qr, (err,result)=>{
        if(err){
            res.json(err);
            }
            res.json({
                status:true,
                data:result
            });
    })
})


// // 19. API create venue step six --- CREATE ROOM
// houndRoutes.route(create_venue_step_six).post((req,res)=>{
// })

// 19. API create venue step seven
// Room Images
// Route: //auth/updateSixthStep
houndRoutes.route(create_venue_step_six).post((req,res)=>{
         console.log(req.body);
        // const { room_id } = req.body
        // roomsUpload.fields([{name:'roomimages',maxCount:30},{name:'roomvideos',maxCount: 1}]);
        const { room_id, roomname, maximum_guests, maximum_guests_seated, maximum_guests_seated_with_dance_floor, roomDescription, place_id } = req.body
        
        let qr = "INSERT INTO rooms (room_name, maximum_guests, maximum_guests_seated, maximum_guests_seated_with_dance_floor, room_description, place_id) VALUES ('"+roomname+"','"+maximum_guests+"','"+maximum_guests_seated+"','"+maximum_guests_seated_with_dance_floor+"','"+roomDescription+"','"+place_id+"');"
        
        db.query(qr, (err,result)=>{
            if(err){
            res.json(err);
            }
            res.send({
                status:true,
                data:result
            });
        })

        // if (req.files.roomimages) {
        //     let image_url = 'uploads/rooms/'+req.files.room_images[0].filename
        //     let qr = "INSERT INTO room_images (room_id, image_url) VALUES ('"+room_id+"','"+image_url+"');"
        //     db.query(qr, (err,result)=>{
        //             if(err){
        //             res.json(err);
        //             }
        //         })
        // }

        // if (req.files.roomvideos) {
        //     let video_url = 'uploads/rooms/'+req.files.room_videos[0].filename
        //     let qr = "INSERT INTO room_videos (room_id, video_url) VALUES ('"+room_id+"','"+video_url+"');"
        //     db.query(qr, (err,result)=>{
        //             if(err){
        //             res.json(err);
        //             }
        //         })
        // }
    })

// 19.1 get FEATURE LIST AND SEND 
houndRoutes.route(get_venue_features).get((req,res)=>{

    db.query('SELECT * FROM available_features LIMIT 1;',(err,result)=>{
        if(err){
        res.json(err);
        }
        res.json({
            status:true,
            data:result
        });
    })

})

// 20. API create venue step seven
houndRoutes.route(create_venue_step_seven).post((req,res)=>{
    
    const {feature_id,room_id, isAvailable,flatRate,perGuest,capacity,inBasePrice} = req.body[0];
    console.log(req.body);
        
    let qr = "INSERT into place_feature (feature_id, room_id, isAvailable, inBasePrice,flatRate,perGuest,capacity) VALUES ('"+
    feature_id+"','"+room_id+"','"+isAvailable+"','"+inBasePrice+"','"+flatRate+"','"+perGuest+"','"+capacity+"')";
    
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

