let express = require('express');
let app = express();
require('dotenv').config();  // Ensure dotenv is loaded before anything else
const path = require('path');

// Add middleware for logging
app.use(function middleware(req, res, next) {
    var stringVal = req.method + " " + req.path + " - " + req.ip;
    console.log(stringVal);  // Logs the method, path, and IP
    next();  // Proceed to the next middleware or route
});

// Serve static files from the /public path
app.use('/public', express.static(path.join(__dirname, 'public')));

// Serve the index.html file for the root route
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(filePath);    
});

// Route to handle /json with conditional message style
app.get('/json', (req, res) => {
    let response = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") {
        response = response.toUpperCase();
    }

    res.json({
        message: response  // Sends the response as JSON
    });

});

app.get('/now', function(req, res, next){
    req.time = new Date().toString();
    next();
}, function(req, res){
    res.send({time: req.time});
});

app.get('/:word/echo', (req, res)=>{
    const { word } = req.params;
  
    res.json({
        echo: word
    });

});

app.get('/name', (req, res)=>{
    var firstname = req.query.first;
    var lastname = req.query.last;

    var {first: firstname, last: lastname} = req.query;
    res.json({
        name: `${firstname} ${lastname}`
    });
});

// Export the app module
module.exports = app;
