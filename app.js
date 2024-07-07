const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use('/static', express.static(path.join(process.cwd(), "public")));

io.on("connection", function (socket) {
    socket.on("send-location",function(data){
        io.emit("receive-location",{id:socket.id,...data});
    })
    console.log("connected");
});

app.get("/", function (req, res) {
    res.render("index.ejs");
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
