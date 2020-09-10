const mongoose = require('mongoose');

// To import The secrect crediantialls like URL we need to import it
require('dotenv').config();


function connectDB(){
    //Database connection

    //The URL is secret so we will get it from environment file
    mongoose.connect(process.env.MONGO_CONNECTION_URL,{useNewUrlParser: true, useCreatIndex:true, useUnifiedTopology:true, useFindAndModify : true });
    const connection = mongoose.connection;

    // The Once method is just like a Event Listener where the event is open
    // Once its open the it will run the fuction , If there is any error it will execute catch block
    connection.once('open',()=>{
        console.log("Database Connected")
    }).catch(err => {
        console.log('Connection Failed')
    })
}

module.exports = connectDB;