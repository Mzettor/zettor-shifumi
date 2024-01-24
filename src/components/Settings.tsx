import React from 'react';
import { css } from '../../styled-system/css';
import { hstack, vstack } from '../../styled-system/patterns';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { motion } from 'framer-motion';
import { menuButton } from './Menu';

export const AlertDialogContent = css({
  bgColor: 'dark',
  color: 'white',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  w: '90vw',
  maxWidth: '600px',
  maxHeight: '90vh',
  padding: '25px',
  borderRadius: 'md',
  animation: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
  _focus: {
    outline: 'none'
}})

export const AlertDialogAction = css({
  bgColor: 'primary',
  p: '4px 14px',
  my: '12px',
  borderRadius: 'sm',
  transition: '0.6s', 
  _hover: {
    filter: 'brightness(0.8)'
  }
});

export const AlertDialogOverlay = css({
  position: 'fixed',
  inset: '0',
  animation: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)"
});

const AlertDialogTitle = css({
  fontSize: '20px',
  fontWeight: 'bold',
  flexGrow: '1'
});

const AlertDialogToggle = vstack({
  w: 'full',
  alignItems: 'flex-start',
  py: '18px',
  my: '12px'
});

const AltTitle = 
  css({
    fontSize: '16px',
    py: '10px'
});

export const ToggleItem = css({
  w: '46px',
  h: '46px',
  p: '4px 10px',
  fontSize: '16px',
  borderWidth: '2px',
  borderRadius: 'sm',
  borderColor: 'transparent',
  transition: '0.6s', 
  '&[data-state=on]': {
    bgColor: 'primary'
  }
});

export const headerDiv = hstack({
  w: 'full',
  alignItems: 'center'
});

export const defaultRoundsToWin = 3;

export interface ISettingsProps {
  roundsToWin: number;
  setRoundsToWin: (rounds: number) => void;
}

const Settings: React.FC<ISettingsProps> = ({ roundsToWin, setRoundsToWin }) => {
  return (
    <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <motion.button
            className={menuButton({ variant: 'primary'})}
            whileHover={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', delay: 0.2 }}
          >
            Settings
          </motion.button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className={AlertDialogOverlay} />
          <AlertDialog.Content className={AlertDialogContent}>
            <div className={headerDiv}>
            <AlertDialog.Title
              className={AlertDialogTitle}
            >
              Settings
            </AlertDialog.Title>
             <AlertDialog.Cancel>
              <button className={css({ color: 'primary'})}>x</button>
             </AlertDialog.Cancel>
            </div>
            <AlertDialog.Title
              className={AltTitle}
            >
              Edit Rounds to Win
            </AlertDialog.Title>

              <AlertDialog.Description className={AlertDialogToggle}>
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
                  <ToggleGroup.Item className={ToggleItem} value='10' aria-label='10'>
                    <span>10</span>
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </AlertDialog.Description>
              <AlertDialog.Action className={AlertDialogAction}>
                <button>
                  Save
                </button>
              </AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
  );
}

export default Settings;