// Socket Communication

var input = document.getElementById("input")
input.addEventListener("keypress", function(e) {
    var str = String(input.value).trim()
    if (e.key == "Enter") {
        if (str != "") {
            toLog(input)
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
    if (usrMsgL >= 18) {
        if (first) {
            first = false
        } else {
            var lm = textQueue.shift()
            ol.removeChild(lm)
        }
    } 
    li.appendChild(document.createTextNode("you: " + String(text.value).trim()))
    ol.appendChild(li)
    textQueue.push(li)
    usrMsgL+=1
}

io.on('respond_with_message', function(message) {
    if (message != null) {
      logMsg(message.txt)
    }
  })
  
  var requestMessageConstantly = setInterval(function() {
    io.emit('request_message', 'Sender')
  }, 1000);
