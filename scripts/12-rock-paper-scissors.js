// =======================
// SCORE SETUP (STORAGE)
// =======================

// Get score from localStorage OR create new score object
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

// Show score when page loads
updateScoreElement();


// =======================
// MAIN GAME FUNCTION
// =======================
let isAutoplaying = false;
let intervalId;
function autoPlay(){

  if(!isAutoplaying){
    intervalId=setInterval(function(){
    const playerMove=pickComputerMove();
    playGame(playerMove);
  },1000);
  isAutoplaying=true;
}else{
  clearInterval(intervalId);
  isAutoplaying=false;
}
  


  }
  
document.body.addEventListener('keydown', (event) => 
  {
  if (event.key === 'r'){
    playGame('Rock');
  } else if(event.key === 'p'){
    playGame('Paper');
  }else if(event.key === 's'){
    playGame('Scissors');
  }
});

function playGame(playerMove) {

  // Computer randomly picks a move
  const computerMove = pickComputerMove();

  // Store game result
  let result = '';

  // -------- GAME LOGIC --------
  if (playerMove === 'Rock') {

    if (computerMove === 'Rock') {
      result = 'Tie.';
    } else if (computerMove === 'Paper') {
      result = 'You lose.';
    } else {
      result = 'You Win.';
    }

  } else if (playerMove === 'Paper') {

    if (computerMove === 'Rock') {
      result = 'You Win.';
    } else if (computerMove === 'Paper') {
      result = 'Tie.';
    } else {
      result = 'You lose.';
    }

  } else if (playerMove === 'Scissors') {

    if (computerMove === 'Rock') {
      result = 'You lose.';
    } else if (computerMove === 'Paper') {
      result = 'You Win.';
    } else {
      result = 'Tie.';
    }
  }


  // -------- UPDATE SCORE --------
  if (result === 'You Win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else {
    score.ties += 1;
  }

  // Save score to localStorage
  localStorage.setItem('score', JSON.stringify(score));


  // -------- UPDATE UI --------

  // Update score text
  updateScoreElement();

  // Result text element
  const resultElement = document.querySelector('.js-result');
  resultElement.innerHTML = result;

  // 🎨 Change result color
  if (result === 'You Win.') {
    resultElement.style.color = '#4CAF50'; // Green
  } else if (result === 'You lose.') {
    resultElement.style.color = '#f44336'; // Red
  } else {
    resultElement.style.color = '#FFC107'; // Yellow
  }

  // Show moves with icons
  document.querySelector('.js-moves').innerHTML = `
    You
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer
  `;
}


// =======================
// SCORE DISPLAY FUNCTION
// =======================

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML =
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}


// =======================
// COMPUTER MOVE FUNCTION
// =======================

function pickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber < 1 / 3) {
    return 'Rock';
  } else if (randomNumber < 2 / 3) {
    return 'Paper';
  } else {
    return 'Scissors';
  }
}
