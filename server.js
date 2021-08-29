const express =require("express");
const app = express();
const bodyParser = require("body-parser")
const cors=require('cors')
require("dotenv").config();

//import connect to DB
const connectDB = require("./config/db")
//import Routes
const authRoute=require("./routes/auth")
const postsRoute = require("./routes/posts");
//middleware
app.use(cors())
app.use(bodyParser.json())
app.use('/api/user',authRoute)
app.use('/posts',postsRoute)


//connect to DB
connectDB()

app.get('/', (req, res) =>
{
  res.send("API is running")
})

//listen to port
const port = process.env.PORT || 5000;
app.listen(port,()=> console.log(`Server is running on port: ${port}`))