import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { PropertyButton } from './PropertyButton';

function HeroSection() {
  return (
    <div className='hero-container'>
      <h1>Tokenized Properties</h1>
      <p>List your property now!</p>
      <div className='hero-btns'>
        {/* change button */}
        <PropertyButton
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          List your property
        </PropertyButton>
      </div>
    </div>
  );
}

export default HeroSection;