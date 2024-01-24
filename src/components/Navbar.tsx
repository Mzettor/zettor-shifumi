import React from "react";
import { hstack } from "../../styled-system/patterns";
import { css } from "../../styled-system/css";
import { HomeIcon } from "@heroicons/react/16/solid";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const icon = css({
  w: '24px',
  h: '24px',
  transition: '0.6ms',
  _hover: {
    filter: 'brightness(0.9)',
  }
});

const Navbar: React.FC = () => {
  return (
    <nav
      className={hstack({
        color: 'white',
        bgColor: 'dark',
        p: '10px',
        justifyContent: 'space-between',
        alignItems: 'center'
      })}
    >
        <span>
          <a href="/">
            <HomeIcon className={icon} />
          </a>
        </span>
        <h1
          className={css({
            fontSize: '30px',
            fontWeight: 'bold',
          })}
        >
          Shifumi Game
        </h1>
        <a href="https://github.com/Mzettor/zettor-shifumi" target="_blank">
          <GitHubLogoIcon className={icon} />
        </a>
    </nav>
  );
}

export default Navbar;