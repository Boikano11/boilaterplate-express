let express = require('express');
let app = express();
require('dotenv').config();
const path = require('path');

// Serve static files from the /public path
app.use('/public', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res)=>{
    const filePath = __dirname + '/views/index.html';
    res.sendFile(filePath);    
});

app.get('/json', (req, res) => {
    let response = "Hello json";
    if(process.env.MESSAGE_STYLE === "uppercase"){
        response = response.toUpperCase();
    }else{
        response;
    }

    res.json({
        message: response
    }); 
       
});

 module.exports = app;
