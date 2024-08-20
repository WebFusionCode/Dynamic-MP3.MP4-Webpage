// Require Libraries 
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const port = 80;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wenfusioncontact');
}

// Middleware
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public')); // Assuming your HTML files are in the 'public' directory

// Mongoose Schema
const fusionSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
});

const Fusion = mongoose.model('Fusion', fusionSchema);

// Routes
app.get('/HomeIndex.html', (req, res) => {
    res.status(200).send(path.join(__dirname, 'public', 'HomeIndex.html'));
});

app.get('/abus', (req, res) => {
    res.status(200).send(path.join(__dirname, 'public', 'abus.html'));
});

app.get('/notes', (req, res) => {
    res.status(200).send(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/project', (req, res) => {
    res.status(200).send(path.join(__dirname, 'public', 'project.html'));
});

app.get('/buy', (req, res) => {
    res.status(200).send('buy.html');
});

app.get('/contactus', (req, res) => {
    res.status(200).send('contactus.html');
});

app.post('/contactus', (req, res) => {
    var myData = new Fusion(req.body);
    myData.save().then(() => {
        res.status(200).send('Submitted Successfully');
    }).catch(() => {
        res.status(400).send('Error');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
