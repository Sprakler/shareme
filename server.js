const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs')

// Connect To PORT of available in ENV or set it to default to 3000
const PORT = process.env.PORT || 3000;

const connectDB = require('./config/db')
connectDB();
const File = require('./models/file');
var cron = require('node-cron');

// Get all records older than 24 hours 
async function fetchData() {
    const files = await File.find({ createdAt : { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000)} })
    if(files.length) {
        for (const file of files) {
            try {
                fs.unlinkSync(file.path);
                await file.remove();
                console.log(`successfully deleted ${file.filename}`);
            } catch(err) {
                console.log(`error while deleting file ${err} `);
            }
        }
    }
    console.log('Job done!');
}

// This function calls cron module which is up to this
cron.schedule('59 * * * *', () => {
    fetchData()
});


app.use(express.static('public'));
app.use(express.json());
// Template engine
app.set('views',path.join(__dirname,'/views'))
app.set('view engine','ejs')

// Routes of Web App
app.get("/", (req, res)=>{
    res.sendFile(__dirname + 'public/index.html');
});
app.use('/api/files',require('./routes/files'));
app.use('/files',require('./routes/show'));
app.use('/files/download',require('./routes/download'));

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});