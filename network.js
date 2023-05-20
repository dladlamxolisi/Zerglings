var socket = new WebSocket("ws://localhost:8080");

socket.onopen = function() {
  // Send the current game state to the server.
  socket.send(JSON.stringify(gameState));
};

socket.onmessage = function(event) {
  // Update the game state for all players.
  gameState = JSON.parse(event.data);
};

function makeMove(player, piece, position) {
  // Send the move to the server.
  socket.send(JSON.stringify({
    player: player,
    piece: piece,
    position: position
  }));
}

function onGameOver(winner) {
  // Display a message indicating the winner.
  document.getElementById("winner").innerHTML = winner;
}