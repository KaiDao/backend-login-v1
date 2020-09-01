const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport")
const users = require("./routes/api/users");
const app = express();

app.use(bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });

const db = require("./config/keys").mongoUri;

mongoose
    .connect(db,{
            useNewUrlParser :true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log("database connected"))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);



app.listen(port, () => console.log('Server runnning on port ' + port + ' !'));