const express = require("express")
require("dotenv").config()
const {errorHandler} =  require("./middleware/errorHandler")


const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("server is running ")
})

//membership route
const membershipRoute = require("./routes/membershipRoute")
app.use("/membership", membershipRoute)


//matrimony route
const matrimonyRoute = require("./routes/matrimonyRoute")
app.use("/matrimony",matrimonyRoute)

// shoksandesh route
const shoksandeshRoute = require("./routes/shoksandeshRoute")
app.use("/shoksandesh",shoksandeshRoute)



//error handler
app.use(errorHandler);

//database connection
const dbConnection = require("./DB_connection/db_config")
dbConnection();

//server 
app.listen(PORT, () => {
    console.log(`port is running on ${PORT} `)
})
