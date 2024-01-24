import React from 'react';
import { css } from '../../styled-system/css';
import { hstack, vstack } from '../../styled-system/patterns';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { ISettingsProps, defaultRoundsToWin,  ToggleItem, AlertDialogContent, AlertDialogAction } from './Settings';
import { TResultsState } from './Game';

interface IGameOverProps extends ISettingsProps {
  isModalOpen: boolean;
  setIsModalOpen: (status: boolean) => void;
  results: TResultsState;
}

const GameOver: React.FC<IGameOverProps> = ({ roundsToWin, setRoundsToWin, isModalOpen, setIsModalOpen, results}) => {
  const {playerScore, computerScore, gameWinner} = results;

  const resultsDiv= vstack({
    w: 'full',
    color: gameWinner === 'Player' ? 'green.400' : 'primary',
    fontSize: '18px',
    fontWeight: 'bold'
  })
  
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
            className={css({
              position: 'fixed',
              inset: '0',
              animation: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)"
            })}
        />
          <AlertDialog.Content className={AlertDialogContent}>
            <div className={hstack({
              w: 'full',
              alignItems: 'center'
            })}>
             <AlertDialog.Title className={resultsDiv}>
              {(gameWinner === "Player") ? <h3>You Won!</h3> : <h3>You Lost.</h3>}
              <p>Score:</p>
              <p>{playerScore} - {computerScore}</p>
             </AlertDialog.Title>
            </div>

              <AlertDialog.Description className={vstack({
                w: 'full',
                py: '12px'
              })}>
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
              <div className={vstack({
                  w: 'full',
                  py: '12px'
                })}
              >
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