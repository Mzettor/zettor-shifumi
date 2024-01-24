import React, { useEffect, useRef, useState } from 'react';
import { css, cva } from '../../styled-system/css';
import { toast } from 'react-hot-toast';
import { hstack, vstack } from '../../styled-system/patterns';
import Images from '../images/Images'
import GameOver from './GameOver';
import { motion, useAnimationControls } from 'framer-motion';

const gameSection = hstack({
  h: '400px',
  justifyContent: 'center'
});


const gameCard = cva({
  base: {
    color: 'white',
    borderRadius: 'md',

  },
  variants: {
    header: {
      primary: {
        h: 'auto',
        bgColor: 'cardHead',
        fontSize: '24px',
        display: 'flex',
        justifyContent: 'center',
        borderBottomRadius: 'unset',
      },
    },
    main: {
    primary: { bgColor: 'primary', shadow: '0 4px 2px -2px gray'},
      win: { backgroundColor: 'green.500' },
      loss: { backgroundColor: 'red.600' },
    }
  }
});

const roundChoice = vstack({
  // w: 'full',
  w: '300px',
  h: '300px',
  justifyContent: 'center',
  alignItems: 'center'
});

const scores = cva({
  base: {
    fontWeight: 'bold',
  },
  variants: {
    size: {
      lg: { fontSize: '30px'},
      md: { fontSize: '24px'},
      sm: { fontSize: '18px', fontWeight: 'initial'},
    },
    events: {
      matchPoint: { color: 'red', fontWeight: 'bold'},
    }
  },
})

const controlsSection = hstack({
  h: '238px',
  bgColor: 'dark',
  p: '20px',
  justifyContent: 'center',
  alignItems: 'center',
});

const controlsButton = css({
  bgColor: 'red.600',
  p: '12px',
  mx: '10px',
  borderRadius: 'md',
  cursor: 'pointer'
});

const controlsIcon = cva({
  base: { display: 'flex' },
  variants: {
    size: {
      md: {
        w: '120px',
        h: '120px',
      },
      sm: {
        w: '50px',
        h: '50px',
      },
    },
    filter: {
      invert: { filter: 'invert(100%)'}
    }
  },
})

type TMove = "Rock" | "Paper" | "Scissors";
type TWinConditions = { [key in TMove]: TMove };
type TGameProps = {
  isGameStarted: boolean;
  setIsGameStarted: (status: boolean) => void;
  roundsToWin: number;
  setRoundsToWin: (rounds: number) => void;
}

export type TResultsState = {
  playerScore: number;
  computerScore: number;
  gameWinner: "Player" | "Computer" | null; // Assuming gameWinner can be a string or null
} 

//move to helpers along with generateComputerMove
const moves: TMove[] = ["Rock", "Paper", "Scissors"];

const Game: React.FC<TGameProps> = ({ isGameStarted, setIsGameStarted, roundsToWin, setRoundsToWin }) => {
  
  const [playerMove, setPlayerMove] = useState<string | null>(null);
  const [computerMove, setComputerMove] = useState<string | null>(null);

  const [roundsPlayed, setRoundsPlayed] = useState<number>(0);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [computerScore, setComputerScore] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [results, setResults] = useState<TResultsState>({
    playerScore: 0,
    computerScore: 0,
    gameWinner: null,
  });
  
  const animControls = useAnimationControls();
  // check game winner when scores change
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      const gameWinner = determineGameWinner(playerScore, computerScore, roundsToWin);
      if (gameWinner) {
        stopGame(playerScore, computerScore, gameWinner);
        toast.success(`Game Over! Winner: ${gameWinner}`, { icon: '🥇', style: { color: gameWinner === 'Player' ? 'green' : 'red'}})
      }
    } else {
      isMounted.current = true;
    }
  }, [computerScore, playerScore]);

  const resetScores = (): void => {
    setPlayerScore(0);
    setComputerScore(0);
    setRoundsPlayed(0);
    setPlayerMove(null);
    setComputerMove(null);
  }

  const stopGame = (playerScore: number, computerScore: number, gameWinner: "Player" | "Computer"): void => {
    setIsModalOpen(true);
    
    const gameResults: TResultsState = {
      playerScore: playerScore,
      computerScore: computerScore,
      gameWinner: gameWinner
    }
    
    setResults(gameResults);
    resetScores();
  }


  const handlePlayerChoice = async (move: TMove) => {
    if (!isGameStarted) return;

    const computerMove = generateComputerMove();
    setPlayerMove(move);
    setComputerMove(computerMove);

    // fix this not triggering on first call
    animControls.set({ scale: 0.5, rotate: 90 });
    await animControls.start({ opacity: 1, scale: 1, rotate: 0 });

    const roundWinner = determineRoundWinner(move, computerMove);

    // Update scores based on the round winner
    if (roundWinner === 'Player') {
      // setPlayerScore(prevPlayerScore => prevPlayerScore + 1);
      setPlayerScore(playerScore + 1);
    } else if (roundWinner === 'Computer') {
      setComputerScore(computerScore + 1);
    }
    setRoundsPlayed(roundsPlayed + 1);
  }

  const generateComputerMove = () => {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  return (
    <>
      <section className={gameSection}>
        <div className={gameCard({ main: 'primary'})}>
          <div className={gameCard({ header: 'primary'})}>
            <h3>Player</h3>
          </div>
          <div className={roundChoice}>
            {playerMove ? (
              <motion.img
                src={Images[playerMove]}
                alt={`${playerMove} Icon`}
                className={controlsIcon({ size: 'md'})}
                animate={animControls}
                transition={{ duration: 0.5, type: 'spring'}}
              />
            ) : (
              <motion.img
                src={Images.rcp}
                alt={`${playerMove} Icon`}
                className={controlsIcon({ size: 'md', filter: 'invert'})}
                animate={animControls}
                transition={{ duration: 0.5, type: 'spring'}}
              />
            )}
          </div>
        </div>

        <div className={vstack({ px: '12px', w: '200px'})}>
          <h3 className={scores({ size: 'md'})}>Round {roundsPlayed}</h3>
          <h4 className={scores({ size: 'lg'})}>{playerScore} - {computerScore}</h4>
          {(playerScore === roundsToWin - 1 || computerScore === roundsToWin - 1) ? (
            <p className={scores({ size: 'sm', events: 'matchPoint'})}>Match Point!</p>
          ) : (
            <p className={scores({ size: 'sm'})}>(Rounds To Win: {roundsToWin})</p>
          )}
        </div>
        
        <div className={gameCard({ main: 'primary'})}>
          <div className={gameCard({ header: 'primary'})}>
            <h3>Computer</h3>
          </div>
          <div className={roundChoice}>
            {computerMove ? (
              <motion.img
                src={Images[computerMove]}
                alt={`${computerMove} Icon`}
                className={controlsIcon({ size: 'md'})}
                animate={animControls}
                transition={{ duration: 0.5, type: 'spring'}}
              />
            ): (
              <motion.img
                src={Images.rcp}
                alt={`${playerMove} Icon`}
                className={controlsIcon({ size: 'md', filter: 'invert'})}
                animate={animControls}
                transition={{ duration: 0.5, type: 'spring'}}
              />
            )}
          </div>
        </div>
        <GameOver
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          roundsToWin={roundsToWin}
          setRoundsToWin={setRoundsToWin}
          results={results}

        />
      </section>

      {isGameStarted && (
        <section className={controlsSection}>
          <motion.button
            onClick={() => handlePlayerChoice('Rock')}
            className={controlsButton}
            whileHover={{ scale: 1.1}}
          >
            <img className={controlsIcon({ size: 'sm'})} src={Images.Rock} alt="Rock Icon" />
          </motion.button>
          <motion.button
            onClick={() => handlePlayerChoice('Paper')}
            className={controlsButton}
            whileHover={{ scale: 1.1}}
          >
            <img className={controlsIcon({ size: 'sm'})} src={Images.Paper} alt="Paper Icon" />
          </motion.button>
          <motion.button
            onClick={() => handlePlayerChoice('Scissors')}
            className={controlsButton}
            whileHover={{ scale: 1.1}}
          >
            <img className={controlsIcon({ size: 'sm'})} src={Images.Scissors} alt="Scissors Icon" />
          </motion.button>
        </section>
      )}
    </>
  );
}

// helper functions - put inside helpers folder
const determineRoundWinner = (playerMove: TMove, computerMove: TMove): 'Player' | 'Computer' | 'Draw' => {
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

const determineGameWinner = (playerScore: number, computerScore: number, roundsToWin: number): 'Player' | 'Computer' | null => {
  if (playerScore >= roundsToWin) {
    return 'Player';
  } else if (computerScore >= roundsToWin) {
    return 'Computer';
  } else {
    return null;
  }
};

export default Game;