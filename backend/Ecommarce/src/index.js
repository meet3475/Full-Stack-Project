const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser')
const routes = require("./routes/api/v1/index");
const connectDB = require("./db/mongodb");
const FacebookProvider = require("./utils/Provider");
const passport = require("passport");
// const googleProvider = require("./utils/Provider");

const app = express();
app.use(cookieParser()) 
app.use(cors())
app.use(express.json())
app.use(require("express-session")({ secret: 'shjhj567',  resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

connectDB();
// googleProvider();
FacebookProvider();

//localhost:3000/api/v1
app.use("/api/v1", routes);

app.listen(8000, () => {
    console.log("Server Starte at port 8000.");
})