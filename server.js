//imports
const express = require("express");
const cors = require('cors')
const connectDB = require("./DB/db")
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http)

//connect to DB
connectDB()

//middleware
// app.use(compression());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//import Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const receiverRoute = require("./routes/receivers")
const deliveryRoute = require("./routes/deliveries")
const divisonsRoute = require("./routes/divisons")

//middleware Routes
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/posts', postsRoute)
app.use('/api/receiver', receiverRoute) 
app.use('api/divison',divisonsRoute)

//socket
let users = [];
const addUser = (username,socketId) =>{
  if(!users.includes(username)){
    users.push(username);
  }
};

io.on('connection', socket => {
    socket.on('message', ({ name, receiverRoute, message }) => {
      
  io.emit('message', { name, message })
  })
  socket.on('AddUser', (name) => {
    addUser(name, socket.id);
    console.log(users);
  })
})


//Error Handler - last middleware
app.use(errorHandler)

//listen to port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port: ${port}`))

process.on("unhandledRejection", (err, promise) => {
    console.log(`logged Error: ${err}`);
})