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

    var form = format(text)
    var printable = ""
    var style = 0

    // markdown logic
    if (form != "") {
        console.log("form is: " + form)
        if (form[0] == '@') {
            if (form.substring(1, form.length) == "everyone") {
                var sound = document.createElement("audio")
                sound.src = "/res/ateveryone.wav"
                sound.setAttribute("preload", "auto")
                document.body.appendChild(sound)
                sound.play()
            } else {
                var sound = document.createElement("audio")
                sound.src = "/res/ping.wav"
                sound.setAttribute("preload", "auto")
                document.body.appendChild(sound)
                sound.play()
            }
            printable = form.substring(0, form.length)
            li.style.animation = "none"
            li.style.backgroundColor = "#a8a8a8"
        } else if (form[form.length-2] == '*' && form[form.length-1] == '*') { 
            printable = form.substring(0, form.length-2)
            li.style.fontWeight = "bold"
        } else if (form[form.length-1] == '*') {
            printable = form.substring(0, form.length-1)
            li.style.fontStyle = "italic"
        } else if (form[form.length-1] == '~') {
            printable = form.substring(0, form.length-1)
            li.style.textDecoration = "line-through"
        } else if (form[form.length-1] == '_') {
            printable = form.substring(0, form.length-1)
            li.style.textDecoration = "underline"
        } else {
            printable = form
        }
    }
    // appends to message to the created list element
    li.appendChild(document.createTextNode("(" + 
        user + "@" + socketId.slice(0, 5) + ") " + printable))
    li.style.color = "#" + color
    // appends list element to log element
    ol.appendChild(li)
    // pushes message onto the queue
    textQueue.push(li)
    usrMsgL+=1
}

function format(text) {
    var prev
    var rule = true
    var n = ""
    var formatted = false
    var italStart = false
    var bold = false
    var firstA = false
    var firstLT = false 
    var firstUL = false
    for (var i = 0; i < text.length; i++) {
        var c = text.charAt(i)
        // checks pings
        if (c == '@') {
            if (prev == ' ' || rule) {
                var k = i
                while (text.charAt(k) != ' ' && k < text.length) {
                    n += text.charAt(k)
                    k++
                }
                rule = false
            }
            formatted = true
        // checks italic and bold
        } else if (c == '*' && !italStart && !bold) {
            if (c == '*' && text.charAt(i+1) == '*') {
                bold = true
            } else {
                italStart = true
            }
            var k = i + 1
            if (bold) {
                k++
                while (firstA != true && text.charAt(k) != '*') {
                    if (k == text.length) {
                        n = ""
                        break
                    } else if (text.charAt(k) == '*') {
                        firstA = true
                    }
                    n += text.charAt(k)
                    k++
                }
            } else {
                while (text.charAt(k) != '*') {
                    if (k == text.length) {
                        n = ""
                        break
                    }
                    n += text.charAt(k)
                    k++
                }
            }
            if (bold) {
                n += '**'
            } else {
                n += '*'
            }
            formatted = true
        // checks line through
        } else if (c == '~' && !firstLT) {
            var k = i + 2
            while (firstLT != true || text.charAt(k) != '~') {
                if (k == text.length) {
                    n = ""
                    break
                } else if (text.charAt(k) == '~') {
                    firstLT = true
                }
                n += text.charAt(k)
                k++
            }
            formatted = true
        // checks underline
        } else if (c == '_' && !firstUL) {
            var k = i + 2
            while (firstUL != true || text.charAt(k) != '_') {
                if (k == text.length) {
                    n = ""
                    break
                } else if (text.charAt(k) == '_') {
                    firstUL = true
                }
                n += text.charAt(k)
                k++
            }
            formatted = true
        // default text
        } else if (!formatted) {
            n += c
        }
        prev = c
    }
    return n

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
})

io.on('user_list', function (userList) {
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
