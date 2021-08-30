//imports
const express = require("express");
const app = express();
const cors = require('cors')
require("dotenv").config();
const connectDB = require("./DB/db")
const errorHandler = require("./middleware/errorHandler");

//import Routes
const authRoute = require("./routes/auth")
const postsRoute = require("./routes/posts");

//connect to DB
connectDB()

//middleware
app.use(cors())
app.use(express.json())

//middleware Routes
app.use('/api/auth', authRoute)
app.use('/posts', postsRoute)

//Error Handler - last middleware
app.use(errorHandler)

//listen to port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port: ${port}`))

process.on("unhandledRejection", (err, promise) => {
    console.log(`logged Error: ${err}`);
    app.close(()=>process.exit(1))
})