import React from 'react';
import { vstack } from '../../styled-system/patterns';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { ISettingsProps, defaultRoundsToWin,  ToggleItem, AlertDialogContent, AlertDialogAction, AlertDialogOverlay, headerDiv } from './Settings';
import { TResultsState } from './Game';

const AlertDialogToggle = vstack({
  w: 'full',
  py: '12px'
});

const actionDiv = vstack({
  w: 'full',
  py: '12px'
});

interface IGameOverProps extends ISettingsProps {
  isModalOpen: boolean;
  setIsModalOpen: (status: boolean) => void;
  results: TResultsState;
}

const GameOver: React.FC<IGameOverProps> = ({ roundsToWin, setRoundsToWin, isModalOpen, setIsModalOpen, results: { playerScore, computerScore, gameWinner}}) => {

  const resultsDiv= vstack({
    w: 'full',
    color: gameWinner === 'Player' ? 'green.400' : 'primary',
    fontSize: '18px',
    fontWeight: 'bold'
  });
  
  const playAgain = (): void => {
    setIsModalOpen(false);
  }
  
  return (
    <AlertDialog.Root
      defaultOpen={isModalOpen}
      open={isModalOpen}
    >
        <AlertDialog.Portal>
          <AlertDialog.Overlay
            className={AlertDialogOverlay}
        />
          <AlertDialog.Content className={AlertDialogContent}>
            <div className={headerDiv}>
             <AlertDialog.Title className={resultsDiv}>
              {(gameWinner === "Player") ? <h3>You Won!</h3> : <h3>You Lost.</h3>}
              <p>Score:</p>
              <p>{playerScore} - {computerScore}</p>
             </AlertDialog.Title>
            </div>

              <AlertDialog.Description className={AlertDialogToggle}>
                <AlertDialog.Action className={AlertDialogAction}>
                  <button onClick={playAgain}>Play Again</button>
                </AlertDialog.Action>
                <AlertDialog.Title>Edit Rounds to Win</AlertDialog.Title>
                <ToggleGroup.Root
                  type='single'
                  defaultValue={roundsToWin.toString()}
                  aria-label='Rounds to Win'
                  onValueChange={(val) => val ? setRoundsToWin(Number(val)) : setRoundsToWin(defaultRoundsToWin)}
                >
                  <ToggleGroup.Item className={ToggleItem} value='3' aria-label='3'>
                    <span>3</span>
                  </ToggleGroup.Item>
                  <ToggleGroup.Item className={ToggleItem} value='5' aria-label='5'>
                    <span>5</span>
                  </ToggleGroup.Item>
                  <ToggleGroup.Item className={ToggleItem} value='8' aria-label='8'>
                    <span>8</span>
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </AlertDialog.Description>
                <div className={actionDiv}>
                <AlertDialog.Action className={AlertDialogAction}>
                  <a href='/'>Leave</a>
                </AlertDialog.Action>
              </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
  );
}

export default GameOver;