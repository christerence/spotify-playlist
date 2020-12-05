const express = require("express");
const http = require("http");
const cookie = require("cookie-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

require("./models/user");
require("./services/passport");

const app = express();
// app.use(cors());
app.use(bodyParser.json());
app.use(
  cookie({
    maxAge: 3600000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/auth")(app);
require("./routes/spotify")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("front/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "front", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT);
