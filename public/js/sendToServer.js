var io = io()

var input = document.getElementById("input")
input.addEventListener("keypress", function(e) {
    var str = String(input.value).trim()
    if (e.key == "Enter") {
        if (str != "") {
            toLog(str)
            io.emit('send_message', str, "Sender", "Recipient")
            input.value = ""
        }
    }
})

var length = 0;
function toLog(text) {
    var ol = document.getElementById("log_e")
    var li = document.createElement("li")
    if (length < 22) {
        console.log("log set")
        li.appendChild(document.createTextNode("you: " + text))
        ol.appendChild(li)
        length+=1
    } else {
        console.log(length)
    }
}