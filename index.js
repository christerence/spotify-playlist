const express = require("express");
const http = require('http');
const cookie = require("cookie-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require('./config/keys')
const mongoose = require('mongoose');
const cors = require('cors')
require("./models/user");
require("./services/passport");

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();
// app.use(cors()) 
app.use(bodyParser.json());
app.use(
  cookie({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/auth")(app);
require("./routes/spotify")(app);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT);
