// Socket Communication

var io = io()

var usernameVal = document.getElementById("username")
var name = "anonymous"

usernameVal.addEventListener("keypress", function(e) {
    var formatted = String(usernameVal.value).trim()
    if (e.key == "Enter") {
        if (formatted != "") {
            var box = usernameVal.parentElement
            name = formatted
            document.getElementById("input").placeholder += ", " + name + "..."
            var userHead = document.createElement("h2")
            var userTextNode = document.createTextNode(name)
            userHead.appendChild(userTextNode)
            box.appendChild(userHead)
            box.removeChild(usernameVal)
        }
    }
})

var input = document.getElementById("input")
input.addEventListener("keypress", function(e) {
    var str = String(input.value).trim()
    if (e.key == "Enter") {
        if (str != "") {
            io.emit('send_message', str, "Sender", "Recipient")
            input.value = ""
        }
    }
})

var usrMsgL = 0;
var first = true;
var textQueue = []
function toLog(text) {
    var ol = document.getElementById("log_e")
    var li = document.createElement("li")
    if (usrMsgL >= 200) {
        if (first) {
            first = false
        } else {
            var lm = textQueue.shift()
            ol.removeChild(lm)
        }
    } 
    li.appendChild(document.createTextNode("you: " + text))
    ol.appendChild(li)
    textQueue.push(li)
    usrMsgL+=1
}



io.on('respond_with_message', function(message) {
    if (message != null) {
      toLog(message.text)
    }
  })
  
  var requestMessageConstantly = setInterval(function() {
    io.emit('request_message', 'Sender')
  }, 1000);
