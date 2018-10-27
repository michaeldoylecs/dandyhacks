var io = io('localhost:3005')
io.on('connection', function(io) {
    console.log('a user connected')
})

var input = document.getElementById("input")
input.addEventListener("keypress", function(e) {
    if (e.key == "Enter") {
        console.log(input.value)
    }
})