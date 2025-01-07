const express = require("express")
const connectDb = require('./config/db')
const UserRouter = require('./routes/userRoute')
const app = express();

connectDb()
app.use(express.json());
app.use("/api/user", UserRouter );

const port = 3000;


app.listen(port,() =>{
    console.log(`Server Running at http://localhost:${port}`)
    })
