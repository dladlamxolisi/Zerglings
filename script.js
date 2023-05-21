// Global Variables
var questionsContainer = document.getElementById('questionsContainer');
var playerTurn = document.getElementById('playerTurn');
var alphabetContainer = document.getElementById('alphabetContainer');
var stopButton = document.getElementById('stopButton');
var pickedLetterDisplay = document.getElementById('pickedLetterDisplay');
var rushButton = document.getElementById('rushButton');
var chosenAlphabet = localStorage.getItem('player1Name');

// Function for Player 1 registration
function registerPlayer1() {
  var playerName1 = document.getElementById('playerName1').value;

  // Validate player name
  if (playerName1) {
    // Save player name in local storage
    localStorage.setItem('player1Name', playerName1);
    localStorage.setItem('currentPlayer', 'player1');

    // Hide Player 1 registration screen
    player1RegistrationScreen.style.display = 'none';

    // Show Player 2 registration screen
    player2RegistrationScreen.style.display = 'block';
  } else {
    alert('Please enter Player 1 name.');
  }
}


// Function for Player 2 registration
function registerPlayer2() {
  var playerName2 = document.getElementById('playerName2').value;

  // Validate player name
  if (playerName2) {
    // Save player name in local storage
    localStorage.setItem('player2Name', playerName2);

    // Navigate to the random alphabet screen or any other desired screen
    window.location.href = 'randomAlphabetScreen.html';
  } else {
    alert('Please enter Player 2 name.');
  }
}


// Function to start random alphabet animation
function startRandomAlphabetAnimation() {
  var alphabetContainer = document.getElementById('alphabetContainer');
  var turnDisplay = document.getElementById('turnDisplay');

  var alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var currentIndex = 0;

  // Clear the container before starting animation
  alphabetContainer.innerHTML = '';

  var currentPlayer = localStorage.getItem('currentPlayer');
  var player1Name = localStorage.getItem('player1Name');
  var player2Name = localStorage.getItem('player2Name');

  turnDisplay.textContent = currentPlayer === 'player1' ? player1Name + "'s Turn" : player2Name + "'s Turn";

  alphabetAnimationInterval = setInterval(function() {
    var randomColor = getRandomColor();
    var alphabet = document.createElement('span');
    alphabet.textContent = alphabets[currentIndex];
    alphabet.style.backgroundColor = 'transparent'; // Transparent circle background
    alphabet.style.color = randomColor; // Random color on the letter
    alphabetContainer.innerHTML = '';
    alphabetContainer.appendChild(alphabet);

    currentIndex = (currentIndex + 1) % alphabets.length;
  }, 100);
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to stop random alphabet animation
function stopRandomAlphabetAnimation() {
  clearInterval(alphabetAnimationInterval);
}

// Function to pick a random letter
function pickRandomLetter() {
  startRandomAlphabetAnimation();

  // Show stop button and hide pick letter button
  document.getElementById('pickLetterButton').style.display = 'none';
  document.getElementById('stopButton').style.display = 'block';
}

// Function to stop random alphabet animation and choose a letter
function stopRandomAlphabet() {
  stopRandomAlphabetAnimation();

  // Hide stop button and show rush button
  document.getElementById('stopButton').style.display = 'none';
  document.getElementById('rushButton').style.display = 'block';

  // Get the picked letter
  pickedLetter = document.getElementById('alphabetContainer').innerText;
  document.getElementById('pickedLetterDisplay').innerText = 'Picked Letter: ' + pickedLetter;
}

// Function to move to the question screen
function moveToQuestionScreen() {
  // Logic to navigate to the question screen
  // Replace the following line with the appropriate navigation code
  window.location.href = 'questionScreen.html';
}

// Function to generate random color
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to start the stopwatch
function startStopwatch() {
  var timerElement = document.getElementById('timer');
  var seconds = 0;
  var timerInterval = setInterval(function() {
    seconds++;
    timerElement.textContent = 'Time: ' + seconds + 's';
  }, 1000);

  return timerInterval;
}

// Function to handle submitting the answers
function submitAnswers() {
  var answerInputs = document.querySelectorAll('.answer-input');
  var answers = Array.from(answerInputs).map(function(input) {
    return input.value.trim();
  });

  // Validate if all answers are provided
  if (answers.every(function(answer) {
    return answer !== '';
  })) {
    // Logic to process the answers
    // Replace this with your custom logic

    // Clear the input fields
    answerInputs.forEach(function(input) {
      input.value = '';
    });

    // Save current player and navigate to random letter screen for the next player's turn
    var currentPlayer = localStorage.getItem('currentPlayer');
    if (currentPlayer === 'player1') {
      localStorage.setItem('currentPlayer', 'player2');
      window.location.href = 'randomAlphabetScreen.html';
    } else {
      // Both players have played, navigate to the results screen or any other desired screen
      window.location.href = 'resultsScreen.html';
    }
  } else {
    alert('Please answer all the questions.');
  }
}

// Function to move to the next screen
function moveToNextScreen() {
  // Logic to navigate to the next screen
  // Replace the following line with the appropriate navigation code
  window.location.href = 'nextScreen.html';
}

// Start the random alphabet animation on page load
window.onload = startRandomAlphabetAnimation;

// Get player names from player registration screen
var player1Name = localStorage.getItem('player1Name');
var player2Name = localStorage.getItem('player2Name');

// Get the current player from localStorage
var currentPlayer = localStorage.getItem('currentPlayer');

// Set the player's turn at the top of the random letter screen
var turnDisplay = document.getElementById('turnDisplay');
turnDisplay.textContent = currentPlayer === 'player1' ? player1Name + "'s Turn" : player2Name + "'s Turn";

// Function to navigate to the questions screen for the next player's turn
function goToNextPlayerTurn() {
  if (currentPlayer === 'player1') {
    localStorage.setItem('currentPlayer', 'player2');
  } else {
    localStorage.setItem('currentPlayer', 'player1');
  }
  
  window.location.href = 'questionScreen.html';
}

// Bind the goToNextPlayerTurn function to the rush button click event
var rushButton = document.getElementById('rushButton');
rushButton.addEventListener('click', goToNextPlayerTurn);

