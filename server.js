const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs')

const PORT = process.env.PORT || 3000;

const connectDB = require('./config/db')
connectDB();

app.use(express.static('public'));
app.use(express.json());
// Template engine
app.set('views',path.join(__dirname,'/views'))
app.set('view engine','ejs')

// Routes
app.get("/", (req, res)=>{
    res.sendFile(__dirname + 'public/index.html');
    // console.log(__dirname); 
    // res.status(200).send("This is homepage of my first express app with Uday");
});
app.use('/api/files',require('./routes/files'));
app.use('/files',require('./routes/show'));
app.use('/files/download',require('./routes/download'));

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});