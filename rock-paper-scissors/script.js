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
 * 
 * @param {string} playerSelection 
 * @param {string} computerSelection 
 */
function playRound(playerSelection, computerSelection) {
  let p1 = playerSelection;
  let p2 = computerSelection;
  let result = compareHands(p1, p2);

  if (result === 0) return `You lose, ${p2} beats ${p1}.`;
  else if (result === 1) return `You win, ${p1} beats ${p2}.`;
  else return `Tie! Both are ${p1}.`;
}

/**
 * Play the game in multiple rounds.
 * 
 * @param {number} rounds 
 */
function game(rounds=5) {
  const hands = ["rock", "paper", "scissors"];

  for (let i = 0; i < rounds; i++) {
    let computerSelection = computerPlay(hands);

    let playerSelection;
    while (true) {
      let playerHand = prompt("What hand do you play?").toLowerCase();
    
      if (hands.includes(playerHand)) {
        playerSelection = playerHand;
        break;
      }
      else continue;
    }
    alert(playRound(playerSelection, computerSelection));
  }
}

game();
