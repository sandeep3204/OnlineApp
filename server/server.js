const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.emit("yourId", socket.id);

    socket.on("offer", ({ to, offer }) => {
        io.to(to).emit("receiveOffer", { from: socket.id, offer });
    });

    socket.on("answer", ({ to, answer }) => {
        io.to(to).emit("receiveAnswer", { from: socket.id, answer });
    });
});

http.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
