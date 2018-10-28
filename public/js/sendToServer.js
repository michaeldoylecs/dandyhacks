// Socket Communication

// socket io import
var io = io()

// username value
var usernameVal = document.getElementById("username")

// checks for username
if (getUser() != "") {
    displayName(getUser())
}
if (getHeader()) {
    getHeader().onclick = function() {

        // sets variables
        var inputField
        var userHead;
        var userTextNode;

        // variable assignment
        inputField = getHeader().parentElement
        userHead = document.createElement("input")
        userHead.id = "username"
        userHead.placeholder = "change name"

        // adding text and removing input
        inputField.appendChild(userHead)
        inputField.removeChild(getHeader())

        userHead.addEventListener("keypress", function(e) {

            // trimmed username
            var formatted = String(userHead.value).trim()
            // conditional for submission
            if (e.key == "Enter") {
        
                // if the usernae is not blank
                if (formatted != "") {
                    setUser(formatted)
                    // sets variables
                    var iF
                    var uH;
                    var uTN;

                    // variable assignment
                    iF = userHead.parentElement
                    uTN = document.createTextNode(formatted)
                    uH = document.createElement("h2")
                    uH.id = "header"
                    document.getElementById("input").placeholder = ("say something, " + getUser() + "...")

                    // adding text and removing input
                    uH.appendChild(uTN)
                    iF.appendChild(uH)
                    iF.removeChild(userHead)
                    io.emit('add_user', formatted)
                    location.reload();
                }
            }
        })
    }
}

function displayName(user) {
    // sets variables
    var inputField
    var userHead;
    var userTextNode;

    // variable assignment
    inputField = usernameVal.parentElement
    userTextNode = document.createTextNode(user)
    userHead = document.createElement("h2")
    userHead.id = "header"
    document.getElementById("input").placeholder += (", " + getUser() + "...")

    // adding text and removing input
    userHead.appendChild(userTextNode)
    inputField.appendChild(userHead)
    inputField.removeChild(usernameVal)
    io.emit('add_user', name)
}

function getHeader() {
    return document.getElementById("header");
}

// event listener for any keypress on username value
usernameVal.addEventListener("keypress", function(e) {

    // trimmed username
    var formatted = String(usernameVal.value).trim()
    // conditional for submission
    if (e.key == "Enter") {

        // if the usernae is not blank
        if (formatted != "") {
            setUser(formatted)
            displayName(formatted)
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
            io.emit('send_group_message', str, getUser())
            input.value = ""
        }
    }
})

// sets up vars for max length, first, and the message queue
var usrMsgL = 0;
var first = true;
var textQueue = []

function toLog(user, text) {
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
    li.appendChild(document.createTextNode("(" + user + ") " + text))
    // appends list element to log element
    ol.appendChild(li)
    // pushes message onto the queue
    textQueue.push(li)
    usrMsgL+=1
}

io.on('new_group_message', (message) => {
  if (message != null) {
    toLog(message.sender, message.text)
  }
})
 
function setUser(name) {
    document.cookie = name
}

function getUser() {
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split(';')
    return ca[0] != undefined ? ca[0] : "anonymous"
}
