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

function buildListItem(tokens) {
  var token
  var i
  var s_i
  var mode = 'normal'
  var li_string = ''
  var span
  var liElement = document.createElement("li")
  // Each token
  for (i = 0; i < tokens.length; i++) {
    li_string += ' '
    token = tokens[i]

    // Check for @everyone
    if (token == '@everyone') {
      var span = document.createElement('span')
      span.textContent = li_string
      liElement.appendChild(span)
      var span = document.createElement('span')
      span.textContent = token
      liElement.appendChild(span)
      li_string = ''
      continue
    }

    // Check for @ping
    if (token[0] == '@') {
      var span = document.createElement('span')
      span.textContent = li_string
      liElement.appendChild(span)
      var span = document.createElement('span')
      span.textContent = token
      liElement.appendChild(span)
      li_string = ''
      continue
    }

    // Each character in a token
    var prevC = null
    for (s_i = 0; s_i < token.length; s_i++) {
      var c = token.charAt(s_i)
      if (mode == 'normal' && c === '*') {
        if (token.charAt(s_i + 1) == '*') {
          if (token.charAt(s_i + 2) == '*') {
            mode = 'bolditalic'
            s_i += 2
            var span = document.createElement('span')
            span.textContent = li_string
            liElement.appendChild(span)
            li_string = ''
            continue
          } else {
            mode = 'bold'
            s_i += 1
            var span = document.createElement('span')
            span.textContent = li_string
            liElement.appendChild(span)
            li_string = ''
            continue
          }
        } else {
          var span = document.createElement('span')
          span.textContent = li_string
          liElement.appendChild(span)
          li_string = ''
          mode = 'italic'
          continue
        }
      }
      if (mode == 'bolditalic') {
        if (c == '*') {
          if (token.substring(s_i, s_i + 3) == '***') {
            var span = document.createElement('span')
            span.style.fontWeight = 'bold'
            span.style.fontStyle = 'italic'
            span.textContent = li_string
            liElement.appendChild(span)
            s_i += 2
            li_string= ""
            mode = 'normal'
            continue
          } else if (token.substring(s_i, s_i + 2) == '**') {
            var span = document.createElement('span')
            span.textContent = '*'
            liElement.appendChild(span)
            var span = document.createElement('span')
            span.style.fontWeight = 'bold'
            span.textContent = li_string
            liElement.appendChild(span)
            s_i += 2
            li_string= ""
            mode = 'normal'
            continue
          } else {
            var span = document.createElement('span')
            span.textContent = '**'
            liElement.appendChild(span)
            var span = document.createElement('span')
            span.style.fontStyle = 'italic'
            span.textContent = li_string
            liElement.appendChild(span)
            li_string= ""
            mode = 'normal'
            continue
          }
        }
      }
      if (mode == 'bold') {
        if (c == '*') {
          if (token.substring(s_i, s_i + 2) == '**') {
            var span = document.createElement('span')
            span.style.fontWeight = 'bold'
            span.textContent = li_string
            liElement.appendChild(span)
            s_i += 1
            li_string= ""
            mode = 'normal'
            continue
          } else {
            var span = document.createElement('span')
            span.textContent = '**'
            liElement.appendChild(span)
            var span = document.createElement('span')
            span.style.fontStyle = 'italic'
            span.textContent = li_string
            liElement.appendChild(span)
            li_string= ""
            mode = 'normal'
            continue
          }
        }
      }
      if (mode == 'italic') {
        if (c == '*') {
          var span = document.createElement('span')
          span.style.fontStyle = 'italic'
          span.textContent = li_string
          liElement.appendChild(span)
          li_string= ""
          mode = 'normal'
          continue
        } else {
          li_string += c
          continue
        }
      }
      li_string += c
      prevC = c
    }
  }
  var span = document.createElement('span')
  if (mode == 'bolditalic') {
    li_string = '***' + li_string
  } else if (mode == 'bold') {
    li_string = '**' + li_string
  } else if (mode == 'italic') {
    li_string = '*' + li_string
  }
  span.textContent = li_string
  liElement.appendChild(span)
  return liElement
}

// sets up vars for max length, first, and the message queue
var usrMsgL = 0;
var first = true;
var textQueue = []

function toLog(user, text, color, socketId) {
    var ol = document.getElementById("log_e")

    // max number of stored messages on queue
    if (usrMsgL >= 200) {
        // gets first element from queue and removes it
        var lm = textQueue.shift()
        ol.removeChild(lm)
    } 

    var tokens = text.split(' ')
    var li = buildListItem(tokens)

    // Check pings
    var i
    for (i = 0; i < li.childNodes.length; i++) {
      console.log(li.childNodes[i].textContent)
      if (li.childNodes[i].textContent == '@everyone') {
        console.log('Found @everyone!')
        var sound = document.createElement('audio')
        sound.src = '/res/ateveryone.wav'
        sound.preload = 'auto'
        document.body.appendChild(sound)
        sound.play()
        li.style.animation = 'none'
        li.style.backgroundColor = '#fff766'
      }
      if (li.childNodes[i].textContent == '@' + getUser()) {
        console.log('Found @ping!')
        var sound = document.createElement('audio')
        sound.src = '/res/ping.wav'
        sound.preload = 'auto'
        document.body.appendChild(sound)
        sound.play()
        li.style.animation = 'none'
        li.style.backgroundColor = '#fff766'
      }
    }

    // appends to message to the created list element
    li.insertBefore(document.createTextNode("(" + user + "@" + socketId.slice(0, 5) + ") "), li.childNodes[0])
    li.style.color = "#" + color
    // appends list element to log element
    ol.appendChild(li)
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
