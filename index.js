const express = require("express")
const http = require("http")
const app = express()
const port  = process.env.port || 5000
const server = http.createServer(app)
const io = require("socket.io")(server)

app.use(express.json())
var clients ={}

io.on("connection", (socket)=>{
    console.log("connected")
    console.log(socket.id, "joined")
    socket.on("signin",(id)=> {
        console.log(id)
        clients[id] = socket
        console.log(clients)
    })
    socket.on("message",(msg)=> {
        console.log(msg)
        let targetId = msg.targetId
        if (clients[targetId]) {
            clients[targetId].emit("message", msg)
        }
    })
})
app.route("/check").get((req,res)=>{
    return res.json("Your App is working fine")
})

server.listen(port, "0.0.0.0", ()=>{
    console.log("server started")
})