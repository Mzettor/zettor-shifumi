import React, { useEffect, useRef, useState } from 'react';
import { css, cva } from '../../styled-system/css';
import { hstack, vstack } from '../../styled-system/patterns';
import { motion, useAnimationControls } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { determineRoundWinner, determineGameWinner, TMove, generateComputerMove } from '../helpers/helpers';
import GameOver from './GameOver';
import Images from '../images/Images'

const gameSection = hstack({
  h: '400px',
  justifyContent: 'center'
});

const gameCard = cva({
  base: {
    color: 'white',
    borderRadius: 'md'
  },
  variants: {
    header: {
      primary: {
        h: 'auto',
        bgColor: 'cardHead',
        fontSize: '24px',
        display: 'flex',
        justifyContent: 'center',
        borderBottomRadius: 'unset'
      },
    },
    main: {
      primary: {
        bgColor: 'primary',
        shadow: '0 4px 2px -2px gray'
      },
    }
  }
});

const roundChoice = vstack({
  w: '300px',
  h: '300px',
  justifyContent: 'center',
  alignItems: 'center'
});

const scores = cva({
  base: {
    fontWeight: 'bold'
  },
  variants: {
    size: {
      lg: { fontSize: '30px'},
      md: { fontSize: '24px'},
      sm: { fontSize: '18px', fontWeight: 'initial'}
    },
    events: {
      matchPoint: { color: 'red', fontWeight: 'bold'}
    }
  },
});

const scoresDiv = vstack({
  px: '12px',
  w: '200px'
});

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
        w: '70px',
        h: '70px',
      },
    },
    filter: {
      invert: { filter: 'invert(100%)'}
    }
  },
});

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

const Game: React.FC<TGameProps> = ({ isGameStarted, roundsToWin, setRoundsToWin }) => {
  const [playerMove, setPlayerMove] = useState<TMove | null>(null);
  const [computerMove, setComputerMove] = useState<TMove | null>(null);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [computerScore, setComputerScore] = useState<number>(0);
  const [roundsPlayed, setRoundsPlayed] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [results, setResults] = useState<TResultsState>({
    playerScore: 0,
    computerScore: 0,
    gameWinner: null,
  });
    
  // check game winner when scores change
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      const gameWinner = determineGameWinner(playerScore, computerScore, roundsToWin);
      
      if (gameWinner) {
        resetScores();
        stopGame(playerScore, computerScore, gameWinner);
        toast.success(`Game Over! Winner: ${gameWinner}`, { icon: '🥇', style: { color: gameWinner === 'Player' ? 'green' : 'red'}})
      }
    } else {
      isMounted.current = true;
    }
  }, [computerScore, playerScore]);

  const animControls = useAnimationControls();

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

    const roundWinner = determineRoundWinner(move, computerMove);

    // Update scores based on the round winner
    if (roundWinner === 'Player') {
      setPlayerScore(playerScore + 1);
    } else if (roundWinner === 'Computer') {
      setComputerScore(computerScore + 1);
    }
    setRoundsPlayed(roundsPlayed + 1);
    
    animControls.set({ scale: 0.5, rotate: 90 });
    await animControls.start({ opacity: 1, scale: 1, rotate: 0 });
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
                transition={{ type: 'spring'}}
              />
            ) : (
              <motion.img
                src={Images.rcp}
                alt={`${playerMove} Icon`}
                className={controlsIcon({ size: 'md', filter: 'invert'})}
                animate={animControls}
                transition={{ type: 'spring'}}
              />
            )}
          </div>
        </div>

        <div className={scoresDiv}>
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
                transition={{ type: 'spring'}}
              />
            ): (
              <motion.img
                src={Images.rcp}
                alt={`${playerMove} Icon`}
                className={controlsIcon({ size: 'md', filter: 'invert'})}
                animate={animControls}
                transition={{ type: 'spring'}}
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
            <img
                className={controlsIcon({ size: 'sm'})}
                src={Images.Rock}
                alt="Rock Icon"
              />
          </motion.button>
          <motion.button
            onClick={() => handlePlayerChoice('Paper')}
            className={controlsButton}
            whileHover={{ scale: 1.1}}
          >
            <img
              className={controlsIcon({ size: 'sm'})}
              src={Images.Paper}
              alt="Paper Icon"
            />
          </motion.button>
          <motion.button
            onClick={() => handlePlayerChoice('Scissors')}
            className={controlsButton}
            whileHover={{ scale: 1.1}}
          >
            <img
              className={controlsIcon({ size: 'sm'})}
              src={Images.Scissors}
              alt="Scissors Icon"
            />
          </motion.button>
        </section>
      )}
    </>
  );
}

export default Game;