let express = require('express');
let app = express();
const path = require('path');

// Serve static files from the /public path
app.use('/public', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res)=>{
    const filePath = __dirname + '/views/index.html';
    res.sendFile(filePath);    
});

app.get('/json', (req, res) => {
    res.json({
        message: "Hello json"
    });
});

 module.exports = app;
