export type TMove = "Rock" | "Paper" | "Scissors";
export type TWinConditions = { [key in TMove]: TMove };

const moves: TMove[] = ["Rock", "Paper", "Scissors"];

export const generateComputerMove = () => {
  return moves[Math.floor(Math.random() * moves.length)];
}

export const determineRoundWinner = (playerMove: TMove, computerMove: TMove): 'Player' | 'Computer' | 'Draw' => {
  const winConditions: TWinConditions = {
    Rock: 'Scissors',
    Paper: 'Rock',
    Scissors: 'Paper',
  };

  if (playerMove === computerMove) {
    return 'Draw';
  } else if (winConditions[playerMove] === computerMove) {
    return 'Player';
  } else {
    return 'Computer';
  }
  
};

export const determineGameWinner = (playerScore: number, computerScore: number, roundsToWin: number): 'Player' | 'Computer' | null => {
  if (playerScore >= roundsToWin) {
    return 'Player';
  } else if (computerScore >= roundsToWin) {
    return 'Computer';
  } else {
    return null;
  }
};