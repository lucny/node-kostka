// https://codeforgeek.com/render-html-file-expressjs/
// https://fedingo.com/how-to-convert-csv-to-json-in-nodejs/
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const csv = require('csvtojson');

const app = express();
const port = 3000;

const urlencodedParser = bodyParser.urlencoded({
    extended: false
})

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.get("/results", (req, res) => {
    csv().fromFile('./data/results.csv')
    .then(data => {
        // users is a JSON array
        // log the JSON array
        console.log(data);
        //data = JSON.parse(data);
        res.render('index', {players: data});
    }).catch(err => {
        // log error if any
        console.log(err);
    });    
});


app.post('/save', urlencodedParser, (req, res) => {
    console.log('Got body:', req.body);
    let player = req.body.player.length > 0 ? req.body.player : 'anonym';
    let points = req.body.points;
    let date = new Date();
    let str = `${date.toLocaleDateString()},${date.toLocaleTimeString()},${player},${points}\n`;
    fs.appendFile('./data/results.csv', str, function (err) {
        if (err) {
            console.error(err);
            return res.status(400).json({
                success: false,
                message: "An error occurred"
            });
        }
    });
    res.redirect(301, '/');
});

app.listen(port, () => {
    console.log(`Server naslouchá na portu ${port}`);
});