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
            io.emit('add_user', name)
        }
    }
})

var input = document.getElementById("input")
input.addEventListener("keypress", function(e) {
    var str = String(input.value).trim()
    if (e.key == "Enter") {
        if (str != "") {
            io.emit('send_group_message', str, name)
            input.value = ""
        }
    }
})

var usrMsgL = 0;
var first = true;
var textQueue = []
function toLog(user, text) {
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
    li.appendChild(document.createTextNode(user + ": " + text))
    ol.appendChild(li)
    textQueue.push(li)
    usrMsgL+=1
}

io.on('confirm_group_message', function(message) {
    if (message != null) {
      toLog("You", message.text)
    }
})

io.on('confirm_sent_message', function(message) {
    if (message != null) {
      toLog("You", message.text)
    }
})

var requestGroupMessageConstantly = setInterval(function() {
  io.emit('request_group_message', name)
}, 1000);

io.on('respond_with_group_message', (message) => {
  if (message != null) {
    toLog(message.sender, message.text)
  }
})
 
var requestMessageConstantly = setInterval(function() {
  io.emit('request_message', name)
}, 1000);

io.on('respond_with_message', (message) => {
  if (message != null) {
    toLog(message.sender, message.text)
  }
})
