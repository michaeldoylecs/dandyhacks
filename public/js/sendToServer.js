// Socket Communication

// socket io import
var io = io()
var mySocketId = null

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
    io.emit('add_user', user)
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

function toLog(user, text, color, socketId) {
    var ol = document.getElementById("log_e")
    // creates a list element
    var li = document.createElement("li")

    // max number of stored messages on queue
    if (usrMsgL >= 200) {
        // gets first element from queue and removes it
        var lm = textQueue.shift()
        ol.removeChild(lm)
    } 

    // checks if user was pinged
    var prev
    var rule = true
    var match = false
    var n = ""
    for (var i = 0; i < text.length; i++) {
        var c = text.charAt(i)
        if (c == '@') {
            if (prev == ' ' || rule) {
                var k = i + 1
                while (text.charAt(k) != ' ' && k < text.length) {
                    n += text.charAt(k)
                    k++
                }
                if (n == getUser()) {
                    match = true
                }
                rule = false
            }
        }
        prev = c
    }
    // appends to message to the created list element
    li.appendChild(document.createTextNode("(" + 
        user + "@" + socketId.slice(0, 5) + ") " + text))
    li.style.color = "#" + color
    // appends list element to log element
    ol.appendChild(li)
    // highlights text if pinged
    if (match) {
        li.style.animation = "none"
        li.style.backgroundColor = "#a8a8a8"
    }
    // pushes message onto the queue
    textQueue.push(li)
    usrMsgL+=1
}

function updateOnlineUsers(users) {
  var onlineUsersString = ''
  var i
  for (i = 0; i < users.length; i++) {
    onlineUsersString = "" + onlineUsersString + users[i] + ", "
  }
  console.log(onlineUsersString)
  document.getElementById('online-users').textContent = onlineUsersString.substring(0, onlineUsersString.length - 2)
}

io.on('socket_id', function (socketId) {
  mySocketId = socketId;
  console.log("mySocketId: " + mySocketId)
})

io.on('user_list', function (userList) {
  console.log(`playerList: ${userList}`)
  updateOnlineUsers(userList)
})

io.on('new_group_message', function (message, color) {
  if (message != null) {
    toLog(message.sender, message.text, color, message.socketId)
  }
})

io.on('new_user_joined', function (user, socketId) {
  var color = "f70000"
  var text = "user \"" + user + "\" joined!"
  toLog("", text, color, "")
})

io.on('user_left', function (user) {
  var color = "f70000"
  var text = "user \"" + user + "\" left!"
  toLog("", text, color, "")
})

function setUser(name) {
    document.cookie = name
}

function getUser() {
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split(';')
    return ca[0] != undefined ? ca[0] : "anonymous"
}
