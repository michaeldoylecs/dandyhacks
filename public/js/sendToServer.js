// Socket Communication

// socket io import
var io = io()

// username value
var usernameVal = document.getElementById("username")
var name = "anonymous"

// checks for username

// event listener for any keypress on username value
usernameVal.addEventListener("keypress", function(e) {

    // trimmed username
    var formatted = String(usernameVal.value).trim()
    // conditional for submission
    if (e.key == "Enter") {

        // if the usernae is not blank
        if (formatted != "") {
            // sets variables
            var inputField
            var userHead;
            var userTextNode;

            // variable assignment
            name = formatted
            setUser(name)
            inputField = usernameVal.parentElement
            userTextNode = document.createTextNode(name)
            userHead = document.createElement("h2")
            document.getElementById("input").placeholder += (", " + name + "...")

            // adding text and removing input
            userHead.appendChild(userTextNode)
            inputField.appendChild(userHead)
            inputField.removeChild(usernameVal)
        }
    }
})

// user input variable
var input = document.getElementById("input")

// event listener for message submission
input.addEventListener("keypress", function(e) {
    // trimmed message
    var str = String(input.value).trim()

    // conditional for submission
    if (e.key == "Enter") {
        // if the message is not blank
        if (str != "") {
            // sends message to server
            io.emit('send_message', str, "Sender", "Recipient")
            // resets input field value
            input.value = ""
        }
    }
})

// sets up vars for max length, first, and the message queue
var usrMsgL = 0;
var first = true;
var textQueue = []

// sends message from server to the log
function toLog(text) {

    // element for single log 
    var ol = document.getElementById("log_e")
    // creates a list element
    var li = document.createElement("li")

    // max number of stored messages on queue
    if (usrMsgL >= 200) {
        // gets first element from queue and removes it
        var lm = textQueue.shift()
        ol.removeChild(lm)
    } 

    // appends to message to the created list element
    li.appendChild(document.createTextNode("(" + name + ") " + text))
    // appends list element to log element
    ol.appendChild(li)
    // pushes message onto the queue
    textQueue.push(li)
    usrMsgL+=1
}

function setUser(name) {
    document.cookie = name
}

function getUser(name) {
    var uname = name + "="
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split(';')
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(uname) == 0) {
            return c.substring(uname.length, c.length)
        }
    }
    return ""
}

// sends message from server to log
io.on('respond_with_message', function(message) {
    if (message != null) {
      toLog(message.text)
    }
  })
  
  var requestMessageConstantly = setInterval(function() {
    io.emit('request_message', 'Sender')
  }, 1000);
