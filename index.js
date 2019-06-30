var express = require("express");
var socket = require("socket.io");
var ss = require('socket.io-stream');

//App setup
var app = express();
var server = app.listen(8000, function() {
  console.log("Listening to request on port 8000");
});

app.use(express.static("public"));
var videoData=[];

//Socket Setup
var io = socket(server);

io.on("connection", function(socket) {
  console.log("Connection Established with:-" + " " + socket.id);
  console.log(socket.disconnected);

  socket.broadcast.emit("connect", {
    userId: socket.id,
    status: socket.disconnected
  });

  socket.on("audio", function(data) {
    io.sockets.emit("audio", data);
  });
  
  socket.on("video", function(data) {
    // videoData=[...videoData,data];
    // console.log(videoData);
    // videoData=new Int8Array(videoData);
    io.sockets.emit("video", data);
    //videoData=[videoData.subarray(10,videoData.length)]

  });
  socket.on("chat", function(data) {
    io.sockets.emit("chat", data);
  });

  socket.on("writing", function(data) {
    socket.broadcast.emit("writing", data);
  });
});
