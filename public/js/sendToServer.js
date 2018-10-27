//const io = require('socket.io')
var io = io()
io.on('connection', onconnect(socket))

function onconnect(socket) {
    console.log("a user connected")
}

var input = document.getElementById("input")
input.addEventListener("keypress", function(e) {
    if (e.key == "Enter") {
        console.log(input.value)
    }
})