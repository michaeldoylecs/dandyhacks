var io = io()

var input = document.getElementById("input")
input.addEventListener("keypress", function(e) {
    if (e.key == "Enter") {
        logMsg(input.value)
        io.emit('send_message', input.value, "Sender", "Recipient")
        input.value = ""
    }
})

function logMsg(input) {
    sendToLog(input)
}