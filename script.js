// Global Variables
var player1Name = localStorage.getItem('player1Name');
var player2Name = localStorage.getItem('player2Name');
var questionsContainer = document.getElementById('questionsContainer');
var playerTurn = document.getElementById('playerTurn');
var alphabetContainer = document.getElementById('alphabetContainer');
var stopButton = document.getElementById('stopButton');
var pickedLetterDisplay = document.getElementById('pickedLetterDisplay');
var rushButton = document.getElementById('rushButton');
var chosenAlphabet = localStorage.getItem('player1Name');

// Function to register players
function registerPlayers() {
  var playerName1 = document.getElementById('playerName1').value;
  var playerName2 = document.getElementById('playerName2').value;

  // Validate player names
  if (playerName1 && playerName2) {
    // Save player names in localStorage
    localStorage.setItem('player1Name', playerName1);
    localStorage.setItem('player2Name', playerName2);

    // Logic to navigate to the random alphabet screen
    window.location.href = 'randomAlphabetScreen.html';
  } else {
    alert('Please enter both player names.');
  }
}

// Function to start random alphabet animation
function startRandomAlphabetAnimation() {
  var alphabetContainer = document.getElementById('alphabetContainer');

  var alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var currentIndex = 0;

  // Clear the container before starting animation
  alphabetContainer.innerHTML = '';

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

    
    // Get the picked letter
    var pickedLetter = pickedLetterDisplay.innerText.replace('Picked Letter: ', '');

    // Iterate through each question
    var questions = document.querySelectorAll('.question');
    questions.forEach(function(question) {
      // Create a new paragraph element to display the question with the chosen letter
      var questionElement = document.createElement('p');
      questionElement.textContent = question.innerText + ' Chosen Letter: ' + pickedLetter;

      // Append the question element to the questions container
      questionsContainer.appendChild(questionElement);
    });

    // Move to the next screen
    moveToNextScreen();
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
