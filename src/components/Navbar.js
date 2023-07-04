import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import {CoinbaseWalletSDK} from "@coinbase/wallet-sdk";
import { LoginButton } from './LoginButton';

const providerOptions = {
    coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
            appName: "NFProperty"
        }
    }

}

function Navbar() {

    async function connectWallet() {
        try {
          let web3Modal = new Web3Modal({
            cacheProvider: false,
            providerOptions,
          });
          const web3ModalInstance = await web3Modal.connect();
          const web3ModalProvider = new ethers.getDefaultProvider(web3ModalInstance);
          console.log(web3ModalProvider);
        } catch(error) {
          console.log(error);
        }
      }

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            NFProperty
            <i class='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <div className='connect-btn'>
            <button onClick={connectWallet}>
                connect wallet
            </button>
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/listing'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                listing
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/about'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
          {button && <LoginButton buttonStyle='btn--outline'>Login</LoginButton>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
