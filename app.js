require('dotenv').config()

var express = require('express');
var app = express();
var db = require('./db');
var user = require('./controllers/usercontroller');
var card = require('./controllers/cardcontroller');
var comment = require('./controllers/commentcontroller');
var bodyParser = require('body-parser');

app.use(require("./middleware/headers"));

db.sync();
app.use(bodyParser.json());
app.listen(process.env.PORT, function(){
    console.log(`App is listening on ${process.env.PORT}`);
app.use('/auth', user);
app.use(require('./middleware/validate-session'))
app.use('/card', card);
app.use('/comment', comment);

})
