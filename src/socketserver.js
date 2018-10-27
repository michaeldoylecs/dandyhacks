const net = require('net')

const server = net.createServer((socket) => {
  socket.write('Test\n');
  socket.on('data', (data) => {
    socket.write("Data received!\n");
  })
});

server.listen(3005, 'localhost');

module.exports = server;
