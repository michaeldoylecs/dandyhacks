// Socket Communication

var io = io()

function logMsg(input) {
    sendToLog(input)
}

var input = document.getElementById('input')
input.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    io.emit('send_message', input.value, 'Sender', 'Recipient')
    input.value = ''
  }
})

io.on('respond_with_message', function(message) {
  if (message != null) {
    logMsg(message.txt)
  }
})

var requestMessageConstantly = setInterval(function() {
  io.emit('request_message', 'Sender')
}, 1000);
