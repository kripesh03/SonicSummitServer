const express = require("express")
const connectDb = require('./config/db')
const app = express();

connectDb()

const port = 3000;


app.listen(port,() =>{
    console.log(`Server Running at http://localhost:${port}`)
    })
