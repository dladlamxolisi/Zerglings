const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected.');

  // Broadcast code changes to all connected clients
  socket.on('code-change', (code) => {
    socket.broadcast.emit('code-change', code);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
