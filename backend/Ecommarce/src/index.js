const express = require("express");
const cors = require('cors')

const routes = require("./routes/api/v1/index");
const connectDB = require("./db/mongodb");

const app = express();
 
app.use(cors())
app.use(express.json())

connectDB();


//localhost:3000/api/v1
app.use("/api/v1", routes);

app.listen(8000, () => {
    console.log("Server Starte at port 8000.");
})