var io = io()

var input = document.getElementById("input")
input.addEventListener("keypress", function(e) {
    if (e.key == "Enter") {
        console.log(input.value)
        io.emit('send_message', input.value, "Sender", "Recipient")
    }
})
