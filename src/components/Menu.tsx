import React, { useState } from "react";
import { css, cva } from "../../styled-system/css";
import { vstack } from "../../styled-system/patterns";
import Game from "./Game";
import Settings from "./Settings";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";
import { motion } from "framer-motion";

export const menuButton = cva({
  base: {
    w: '200px',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'semibold',
    p: '4px',
    m: '6px',
    borderRadius: 'lg',
    shadow: '0 4px 2px -2px gray',
    _hover: {
      cursor: 'pointer',
    }
  },
  variants: {
    variant: {
      primary: {
        bgColor: 'red.500',
      },
      dark: {
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        _hover: {
          filter: 'brightness(0.9)',
        }
      },
    }
  }
})

const div = vstack({
  p: '22px 0',
})

export const icon = css({
  w: '20px',
  h: '20px',
  color: 'white',
  marginLeft: '8px',
  transition: '0.6ms',
  _hover: {
    filter: 'brightness(0.9)',
  }
});

const Menu: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [roundsToWin, setRoundsToWin] = useState<number>(3);
  
  return(
    <>
      {!isGameStarted ? (
        <div className={div}>
          <motion.button
            onClick={() => setIsGameStarted(true)}
            className={menuButton({ variant: 'primary'})}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            Start Game
          </motion.button>
          <motion.button
            className={menuButton({ variant: 'primary'})}
            whileHover={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', delay: 0.2 }}
          >
            Past Games
          </motion.button>
          <Settings
            roundsToWin={roundsToWin}
            setRoundsToWin={setRoundsToWin}
          />
          <motion.a
            href="https://github.com/Mzettor/zettor-shifumi"
            className={menuButton({ variant: 'dark'})}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', delay: 0.6 }}
            target="_blank"
            
          >
              Source Code
              <span>
                <ArrowTopRightOnSquareIcon className={icon} />
              </span>
          </motion.a>
          
        </div>
      ) : (
        <Game
          isGameStarted={isGameStarted}
          setIsGameStarted={setIsGameStarted}
          roundsToWin={roundsToWin}
          setRoundsToWin={setRoundsToWin}
        />
      )}
    </>
  );
}

export default Menu;