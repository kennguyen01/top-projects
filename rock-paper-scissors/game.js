/**
 * Generate random hand for computer.
 * 
 * @return {string}
 */
function computerPlay(hands) {
  let choice = Math.floor(Math.random() * hands.length);
  return hands[choice];
}

/**
 * Compare hands and returns 1 for win, 0 for loss,
 * and undefined for tie.
 * 
 * @param {string} p1 Player's hand.
 * @param {string} p2 Computer's hand.
 * @return {number|undefined}
 */
function compareHands(p1, p2) {
  if (p1 == p2) return;
  else if (p1 == "rock" && p2 == "scissors") return 1;
  else if (p1 == "paper" && p2 == "rock") return 1;
  else if (p1 == "scissors" && p2 == "paper") return 1;
  else return 0;
}

/**
 * Play one round and update score
 * 
 * @param {string} playerSelection 
 * @param {string} computerSelection 
 */
function playRound(playerSelection, computerSelection) {
  let p1 = playerSelection;
  let p2 = computerSelection;
  let result = compareHands(p1, p2);

  if (result === 1) {
    let playerScore = document.querySelector('.player-score');
    updateScore(playerScore);
  } else {
    let computerScore = document.querySelector('.computer-score');
    updateScore(computerScore);
  }
  let playerHands = document.querySelector('.player-hands');
  let computerHands = document.querySelector('.computer-hands');

  updateHands(playerHands, p1);
  updateHands(computerHands, p2);

  return result;
}

/**
 * Increment and update score
 * 
 * @param {HTMLElement} currentScore 
 */
function updateScore(score) {
  let current = score.textContent;
  let update = parseInt(current) + 1;
  score.textContent = current.replace(current, update.toString());
}

/**
 * Append current hand to <ul>
 * 
 * @param {HTMLElement} allHands
 * @param {string} currentHand
 */
function updateHands(allHands, currentHand) {
  let li = document.createElement('li');
  console.log(currentHand);
  currentHand = currentHand.charAt(0).toUpperCase() + currentHand.slice(1);
  li.appendChild(document.createTextNode(currentHand));
  allHands.appendChild(li);
}

const hands = ["rock", "paper", "scissors"];

let count = 0;
const buttons = document.querySelectorAll('button');
buttons.forEach((btn) => {
  btn.addEventListener('click', function(e) {
    let computer = computerPlay(hands);
    let player = btn.classList[0];

    playRound(player, computer);

    count++;
    if (count == 5) {
      let pScore = parseInt(document.querySelector('.player-score').textContent);
      let cScore = parseInt(document.querySelector('.computer-score').textContent);
      let winner = document.querySelector('.winner');

      winner.textContent = (pScore > cScore) ? 'You won!' : 'You lost!';
      window.setTimeout(() => {
        location.reload();
      }, 2000);
    }
  });
});